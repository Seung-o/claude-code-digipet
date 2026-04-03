import type { DigimonLineId, DigimonSessionState, DigimonHistory } from './types.js';
import { ALL_LINE_IDS, getDigimonName } from './registry.js';
import { readFileSync } from 'fs';
import { HISTORY_PATH } from '../storage/paths.js';

function loadHistory(): DigimonHistory | null {
  try {
    const data = readFileSync(HISTORY_PATH, 'utf8');
    return JSON.parse(data) as DigimonHistory;
  } catch {
    return null;
  }
}

export function assignDigimon(sessionId: string): DigimonSessionState {
  const history = loadHistory();

  // Count how many times each line has been seen
  const lineCounts: Record<string, number> = {};
  for (const id of ALL_LINE_IDS) {
    lineCounts[id] = 0;
  }
  if (history) {
    for (const session of history.sessions) {
      lineCounts[session.digimonLine] = (lineCounts[session.digimonLine] ?? 0) + 1;
    }
  }

  // Weight unseen/less-seen lines higher
  const maxCount = Math.max(...Object.values(lineCounts), 1);
  const weights = ALL_LINE_IDS.map((id) => maxCount - lineCounts[id] + 1);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  // Weighted random selection
  let roll = Math.random() * totalWeight;
  let selectedLine: DigimonLineId = ALL_LINE_IDS[0];
  for (let i = 0; i < ALL_LINE_IDS.length; i++) {
    roll -= weights[i];
    if (roll <= 0) {
      selectedLine = ALL_LINE_IDS[i];
      break;
    }
  }

  // 5% chance of rare variant
  const isRare = Math.random() < 0.05;

  return {
    sessionId,
    startedAt: new Date().toISOString(),
    digimonLine: selectedLine,
    stage: 0,
    stageName: 'Egg',
    digimonName: getDigimonName(selectedLine, 0),
    isRare,
    exp: 0,
    totalExp: 0,
    hp: 70,
    hunger: 30,
    metrics: {
      totalTokens: 0,
      totalOutputTokens: 0,
      totalCostUsd: 0,
      toolCalls: 0,
      successfulToolCalls: 0,
      failedToolCalls: 0,
      uniqueToolTypes: [],
      messageCount: 0,
      totalDurationMs: 0,
      consecutiveSuccesses: 0,
      chatOnlyStreak: 0,
    },
    evolutionLog: [],
    animationState: {
      currentFrame: 0,
    },
  };
}
