import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { DATA_DIR, CURRENT_SESSION_PATH, HISTORY_PATH } from './paths.js';
import type { DigimonSessionState, DigimonHistory } from '../digimon/types.js';

let dirEnsured = false;

export async function ensureDataDir(): Promise<void> {
  if (dirEnsured) return;
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  dirEnsured = true;
}

export async function loadSessionState(): Promise<DigimonSessionState | null> {
  try {
    const data = await readFile(CURRENT_SESSION_PATH, 'utf8');
    return JSON.parse(data) as DigimonSessionState;
  } catch {
    return null;
  }
}

export async function saveSessionState(state: DigimonSessionState): Promise<void> {
  await ensureDataDir();
  await writeFile(CURRENT_SESSION_PATH, JSON.stringify(state));
}

export function isActiveAndRecent(
  state: DigimonSessionState,
  maxAgeMs = 12 * 60 * 60 * 1000,
): boolean {
  const age = Date.now() - new Date(state.startedAt).getTime();
  if (age > maxAgeMs) return false;

  try {
    const data = readFileSync(HISTORY_PATH, 'utf8');
    const history = JSON.parse(data) as DigimonHistory;
    const lastSession = history.sessions[history.sessions.length - 1];
    if (lastSession?.sessionId === state.sessionId) return false;
  } catch {
    // No history = not archived = still active
  }

  return true;
}
