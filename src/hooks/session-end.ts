import { loadSessionState } from '../storage/state.js';
import { readFile, writeFile, unlink } from 'fs/promises';
import { HISTORY_PATH, CURRENT_SESSION_PATH } from '../storage/paths.js';
import { ensureDataDir } from '../storage/state.js';
import { readStdin } from '../stdin.js';
import type { DigimonHistory, HistoryEntry } from '../digimon/types.js';
import { DIGIMON_LINES, RESET } from '../digimon/registry.js';
import { STAGE_NAMES } from '../digimon/types.js';

const MAX_HISTORY_SESSIONS = 100;

async function loadHistory(): Promise<DigimonHistory> {
  try {
    const data = await readFile(HISTORY_PATH, 'utf8');
    return JSON.parse(data) as DigimonHistory;
  } catch {
    return { version: 1, totalSessions: 0, lifetimeExp: 0, sessions: [] };
  }
}

async function saveHistory(history: DigimonHistory): Promise<void> {
  await ensureDataDir();
  if (history.sessions.length > MAX_HISTORY_SESSIONS) {
    history.sessions = history.sessions.slice(-MAX_HISTORY_SESSIONS);
  }
  await writeFile(HISTORY_PATH, JSON.stringify(history, null, 2));
}

function printSummary(state: import('../digimon/types.js').DigimonSessionState): void {
  const line = DIGIMON_LINES[state.digimonLine];
  const stageName = STAGE_NAMES[state.stage];
  const successRate = state.metrics.toolCalls > 0
    ? Math.round((state.metrics.successfulToolCalls / state.metrics.toolCalls) * 100)
    : 0;
  const durationMin = Math.round(state.metrics.totalDurationMs / 60_000);

  const summary = [
    '',
    '\x1b[1;33m╔══════════════════════════════════════╗\x1b[0m',
    `\x1b[1;33m║\x1b[0m  ${line.icon} \x1b[1mDigi-Buddy Session Summary\x1b[0m  \x1b[1;33m║\x1b[0m`,
    '\x1b[1;33m╠══════════════════════════════════════╣\x1b[0m',
    `\x1b[1;33m║\x1b[0m  Partner: \x1b[1m${state.digimonName}\x1b[0m (${stageName})`,
    `\x1b[1;33m║\x1b[0m  EXP: ${state.totalExp.toLocaleString()} │ HP: ${state.hp} │ ${durationMin}min`,
    `\x1b[1;33m║\x1b[0m  Tools: ${state.metrics.toolCalls} (${successRate}% success)`,
    '\x1b[1;33m╚══════════════════════════════════════╝\x1b[0m',
    '',
  ];

  process.stderr.write(summary.join('\n'));
}

async function main() {
  await readStdin();

  try {
    const state = await loadSessionState();
    if (!state) return;

    // Save to history
    const history = loadHistory();
    const entry: HistoryEntry = {
      sessionId: state.sessionId,
      startedAt: state.startedAt,
      endedAt: new Date().toISOString(),
      digimonLine: state.digimonLine,
      finalStage: state.stage,
      finalName: state.digimonName,
      isRare: state.isRare,
      totalExp: state.totalExp,
      finalHp: state.hp,
      peakHp: state.hp, // Simplified — could track peak separately
      metrics: { ...state.metrics },
      evolutionLog: [...state.evolutionLog],
    };

    history.sessions.push(entry);
    history.totalSessions++;
    history.lifetimeExp += state.totalExp;
    await saveHistory(history);

    // Print summary
    printSummary(state);

    // Clean up active state so next session starts fresh
    await unlink(CURRENT_SESSION_PATH).catch(() => {});
  } catch {
    // Silently fail
  }
}

main();
