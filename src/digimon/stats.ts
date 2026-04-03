import type { DigimonSessionState, SessionMetrics } from './types.js';
import type { StatusLineInput } from '../stdin.js';

export function calculateEXP(metrics: SessionMetrics): number {
  const tokenEXP = metrics.totalTokens * 0.001;
  const costEXP = metrics.totalCostUsd * 500;
  const toolEXP = metrics.toolCalls * 5;
  const diversityBonus = metrics.uniqueToolTypes.length * 10;
  const successBonus = metrics.successfulToolCalls * 2;
  return Math.floor(tokenEXP + costEXP + toolEXP + diversityBonus + successBonus);
}

// EXP thresholds per stage for progress bar display
const STAGE_EXP_RANGES: [number, number][] = [
  [0, 10],         // Egg → Baby
  [10, 50],        // Baby → In-Training
  [50, 200],       // In-Training → Rookie
  [200, 1000],     // Rookie → Champion
  [1000, 5000],    // Champion → Ultimate
  [5000, 25000],   // Ultimate → Mega
  [25000, 100000], // Mega (display only)
];

export function getStageProgress(stage: number, totalExp: number): number {
  const [min, max] = STAGE_EXP_RANGES[stage] ?? [0, 100];
  const progress = (totalExp - min) / (max - min);
  return Math.max(0, Math.min(1, progress));
}

export function updateMetricsFromStdin(state: DigimonSessionState, input: StatusLineInput): void {
  state.metrics.totalTokens = input.context_window.total_input_tokens + input.context_window.total_output_tokens;
  state.metrics.totalOutputTokens = input.context_window.total_output_tokens;
  state.metrics.totalCostUsd = input.cost.total_cost_usd;
  state.metrics.totalDurationMs = input.cost.total_duration_ms;
  state.metrics.messageCount++;

  // Update hunger
  state.hunger = Math.min(100, state.hunger + 1);
  const tokenHunger = Math.floor(state.metrics.totalTokens / 10_000) * 3;
  state.hunger = Math.min(100, 30 + state.metrics.messageCount + tokenHunger);

  // Hunger penalty on HP
  if (state.hunger >= 80) {
    state.hp = Math.max(10, state.hp - 1);
  }

  // High context usage penalty
  if (input.context_window.used_percentage > 90) {
    state.hp = Math.max(10, state.hp - 3);
  }

  // Update EXP
  state.totalExp = calculateEXP(state.metrics);
  state.exp = getStageProgress(state.stage, state.totalExp) * 100;
}

export function clampStats(state: DigimonSessionState): void {
  state.hp = Math.max(10, Math.min(100, state.hp));
  state.hunger = Math.max(0, Math.min(100, state.hunger));
  state.exp = Math.max(0, Math.min(100, state.exp));
}

export type Mood = 'happy' | 'neutral' | 'worried' | 'sad';

export function getMood(hp: number): Mood {
  if (hp >= 80) return 'happy';
  if (hp >= 50) return 'neutral';
  if (hp >= 30) return 'worried';
  return 'sad';
}
