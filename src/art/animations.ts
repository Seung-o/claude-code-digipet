import type { AnimationState } from '../digimon/types.js';

export function advanceAnimation(state: AnimationState): void {
  state.currentFrame = (state.currentFrame + 1) % 1000;
}
