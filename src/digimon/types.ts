export type DigimonLineId = 'agumon' | 'tentomon' | 'patamon' | 'palmon' | 'gomamon' | 'hagurumon';

export type EvolutionStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const STAGE_NAMES: Record<EvolutionStage, string> = {
  0: 'Egg',
  1: 'Baby',
  2: 'In-Training',
  3: 'Rookie',
  4: 'Champion',
  5: 'Ultimate',
  6: 'Mega',
};

export interface EvolutionThreshold {
  tokens: number;
  costUsd: number;
  toolCalls: number;
}

export const EVOLUTION_THRESHOLDS: Record<EvolutionStage, EvolutionThreshold> = {
  0: { tokens: 0, costUsd: 0, toolCalls: 0 },
  1: { tokens: 5_000, costUsd: 0.01, toolCalls: 3 },
  2: { tokens: 25_000, costUsd: 0.05, toolCalls: 15 },
  3: { tokens: 100_000, costUsd: 0.20, toolCalls: 50 },
  4: { tokens: 500_000, costUsd: 1.00, toolCalls: 150 },
  5: { tokens: 2_000_000, costUsd: 5.00, toolCalls: 500 },
  6: { tokens: 10_000_000, costUsd: 20.00, toolCalls: 2_000 },
};

export interface DigimonLine {
  id: DigimonLineId;
  icon: string;
  names: [string, string, string, string, string, string, string]; // Egg + 6 stages
  colors: [string, string, string, string, string, string, string]; // ANSI per stage
}

export interface SessionMetrics {
  totalTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
  toolCalls: number;
  successfulToolCalls: number;
  failedToolCalls: number;
  uniqueToolTypes: string[];
  messageCount: number;
  totalDurationMs: number;
  consecutiveSuccesses: number;
  chatOnlyStreak: number;
}

export interface EvolutionLogEntry {
  stage: EvolutionStage;
  name: string;
  at: string;
  totalExp: number;
}

export interface AnimationState {
  currentFrame: number;
}

export interface DigimonSessionState {
  sessionId: string;
  startedAt: string;
  digimonLine: DigimonLineId;
  stage: EvolutionStage;
  stageName: string;
  digimonName: string;
  isRare: boolean;
  exp: number;
  totalExp: number;
  hp: number;
  hunger: number;
  metrics: SessionMetrics;
  evolutionLog: EvolutionLogEntry[];
  animationState: AnimationState;
}

export interface HistoryEntry {
  sessionId: string;
  startedAt: string;
  endedAt: string;
  digimonLine: DigimonLineId;
  finalStage: EvolutionStage;
  finalName: string;
  isRare: boolean;
  totalExp: number;
  finalHp: number;
  peakHp: number;
  metrics: SessionMetrics;
  evolutionLog: EvolutionLogEntry[];
}

export interface DigimonHistory {
  version: 1;
  totalSessions: number;
  lifetimeExp: number;
  sessions: HistoryEntry[];
}

export interface Achievement {
  id: string;
  name: string;
  badge: string;
  unlockedAt: string;
  sessionId: string;
}

export interface AchievementsData {
  unlocked: Achievement[];
}
