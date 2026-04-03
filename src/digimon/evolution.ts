import type { DigimonSessionState, EvolutionStage } from './types.js';
import { EVOLUTION_THRESHOLDS } from './types.js';
import { getDigimonName } from './registry.js';

export function checkEvolution(state: DigimonSessionState): boolean {
  const currentStage = state.stage;
  if (currentStage >= 6) return false;

  const nextStage = (currentStage + 1) as EvolutionStage;
  const threshold = EVOLUTION_THRESHOLDS[nextStage];
  const m = state.metrics;

  // Evolve if ANY threshold is met
  return (
    m.totalTokens >= threshold.tokens ||
    m.totalCostUsd >= threshold.costUsd ||
    m.toolCalls >= threshold.toolCalls
  );
}

export function evolve(state: DigimonSessionState): void {
  if (state.stage >= 6) return;

  const previousName = state.digimonName;
  state.stage = (state.stage + 1) as EvolutionStage;
  state.digimonName = getDigimonName(state.digimonLine, state.stage);

  state.evolutionLog.push({
    stage: state.stage,
    name: state.digimonName,
    at: new Date().toISOString(),
    totalExp: state.totalExp,
  });

  // Evolution bonus
  state.hp = Math.min(100, state.hp + 10);

  // Trigger evolution animation
  state.animationState.isEvolving = true;
  state.animationState.evolveFramesRemaining = 5;
  state.animationState.previousStageName = previousName;
}

export function processEvolution(state: DigimonSessionState): boolean {
  let evolved = false;
  // Check for multiple stage jumps (e.g. if metrics jumped a lot)
  while (checkEvolution(state)) {
    evolve(state);
    evolved = true;
  }
  return evolved;
}
