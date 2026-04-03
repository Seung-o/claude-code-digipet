import type { AnimationState } from '../digimon/types.js';

export function advanceAnimation(state: AnimationState): void {
  state.currentFrame = (state.currentFrame + 1) % 1000;

  if (state.isEvolving) {
    state.evolveFramesRemaining--;
    if (state.evolveFramesRemaining <= 0) {
      state.isEvolving = false;
      state.previousStageName = undefined;
    }
  }
}

export function getEvolutionText(framesRemaining: number, previousName: string | undefined, newName: string): string | null {
  if (framesRemaining <= 0) return null;

  if (framesRemaining >= 4) {
    return '  ✨ EVOLUTION ✨';
  } else if (framesRemaining >= 3) {
    return `  ${previousName ?? '???'} → ???`;
  } else if (framesRemaining >= 2) {
    return '  ░░▓▓▓▓░░';
  } else {
    return `  → ${newName}!`;
  }
}
