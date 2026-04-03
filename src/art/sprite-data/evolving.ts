import type { SpriteFrames } from '../braille-renderer.js';
import { braille } from '../braille-renderer.js';

const EVOLVING = braille(`
⠀⠠⠀⠂⣠⣄⣂⠐⠄⠀⠀⠀
⠀⠀⠀⣾⣿⣿⣿⣷⠀⠀⠀⠀
⠀⠀⠀⠻⣿⣿⣿⠟⠀⠀⠀⠀
⠀⠈⠀⠂⠈⠁⠐⠈⠀⠀⠀⠀
`, 231);

export const EVOLVING_FRAMES: SpriteFrames = [EVOLVING, EVOLVING];
