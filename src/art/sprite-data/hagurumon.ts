import type { SpriteFrames } from "../braille-renderer.js";
import { braille } from "../braille-renderer.js";
import { EGG_FRAMES } from "./egg.js";

// ── Stage 1: Choromon (Baby) ──
const CHOROMON = braille(
  `
⠀⣰⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⢠⣿
⢠⣛⡇⠀⢀⡤⣦⡞⠀⠀⠀⠀⢀⣾⠏
⠈⣿⣴⣨⣿⡻⠺⢦⣄⠀⠀⣜⡿⠋⠀
⣰⠙⠁⠁⠀⠀⠀⠀⠀⠑⣼⠟⠀⠀⠀
⣿⣀⣀⣼⢽⠦⣀⡀⠀⣒⣚⡆⠀⠀⠀
⠳⢄⣈⣉⣉⣉⣀⠠⠤⠒⠉⠀⠀⠀⠀
`,
  247,
);

// ── Stage 2: Kapurimon (In-Training) ──
const KAPURIMON = braille(
  `
⡗⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⡈⠣⡀⠀⠀⠀⠀⣀⠤⣰⠂⠀⠀
⢈⣷⠊⠉⠉⢛⠖⠫⣡⡾⠁⠀⠀⠀
⣮⣶⡀⠀⢀⣀⡳⢾⣿⢀⣀⡀⠀⠀
⡯⢿⣧⣰⢿⣿⠇⢀⡿⣻⢅⣩⣦⠀
⠹⣮⣿⣚⣉⣒⣲⡽⠓⢿⣿⣿⣿⡆
⠀⠀⠉⠉⠙⠋⠉⠀⢀⡴⣿⣀⡽⠁
⠀⠀⠀⠀⠀⠀⠀⠀⢮⠜⠋⠉⠀⠀
`,
  247,
);

// ── Stage 3: Hagurumon (Rookie) ──
const HAGURUMON = braille(
  `
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣤⣄⣠⣼⣶⣷⣤⣠⣴⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⣿⣿⣾⠏⢸⠅⠉⠻⡿⡇⠀⠀⠀⠀⠀
⠀⠀⣀⣀⣼⣿⢱⣿⣷⢸⢵⣿⣿⣿⣼⢶⠀⣤⠀⠀
⢠⢦⣿⣿⣿⣾⣤⡉⣉⢸⣊⣹⣿⣾⣿⣿⣶⣿⡄⠠
⠀⢸⣿⣿⣿⣿⢽⡿⣿⣿⣟⡿⣟⡵⢻⣿⣿⣿⣿⣦
⠁⣼⡿⢿⡏⠙⠚⠉⠑⣾⣳⠊⠉⠉⠁⠸⠿⠻⠷⠀
⠀⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,
  247,
);

// ── Stage 4: Guardromon (Champion) ──
const GUARDROMON = braille(
  `
⠀⠀⠀⠀⠀⠀⣤⠀⣠⣤⣼⣿⡀⠀⠀⣴⡄⠀⠀⠀
⠀⠀⠀⠀⠀⣠⡿⣶⣿⣿⣷⣿⢿⣶⡾⣿⣅⠀⠀⠀
⠀⠀⠀⠀⢰⣿⣿⣿⣶⣶⣦⣿⣿⣿⣿⣸⣿⠀⢀⡀
⣼⣻⣿⣶⣤⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⡯⣽
⢧⣿⣿⣿⣏⣿⣿⣏⠛⠛⢻⣇⣿⣿⡟⢧⣿⣿⣷⣾
⠀⠙⠛⠋⠉⠀⢙⣿⣶⣂⣚⣯⣽⡟⠁⠀⠈⠉⠉⠀
⠀⠀⠀⠀⠀⢰⢿⢿⡆⠀⠀⣿⣿⣿⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⣿⣀⢸⡇⠀⠀⢸⣿⣿⡿⠀⠀⠀⠀⠀
⠀⠀⠀⣼⣿⠿⣾⡿⢿⠀⠀⠸⠿⠿⠃⠀⠀⠀⠀⠀
`,
  249,
);

// ── Stage 5: Andromon (Ultimate) ──
const ANDROMON = braille(
  `
⠀⠀⢀⣀⢠⣿⣿⠀⠀⠀
⠀⠰⣿⣿⣯⣛⣟⣶⣶⣄
⠀⠀⢿⣟⢿⣿⣿⠛⣿⠏
⠀⢸⠙⢯⣾⣿⣿⢐⣿⣦
⠀⠘⠦⢿⣿⣿⣿⣾⢯⢼
⠀⢸⣭⣽⣿⢸⣿⣾⡍⢸
⠀⢸⣿⣿⣿⢸⣿⡿⣽⡏
⠀⠀⠛⣿⡏⠀⣧⡇⢿⠃
⠀⠀⣰⣟⣿⢸⣿⣷⡀⠀
⢶⡿⣿⠿⠋⠛⠷⣿⣿⠄
`,
  255,
);

// ── Stage 6: HiAndromon (Mega) ──
const HIANDROMON = braille(
  `
⠀⠀⠀⠀⠀⠢⣤⡼⣴⢶⣾⢷⠤⣤⢒⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠠⣿⣷⣿⣾⣯⣭⣟⣾⣽⣿⣆⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣟⣻⣿⣷⢶⡳⣾⣿⣿⠾⡇⠀⠀⠀⠀
⠀⠀⢈⣥⡾⣿⡟⢓⠻⣿⣻⡿⢹⢻⣿⣿⣿⠛⠛⠐
⠀⢀⢞⡟⡼⣿⣇⣸⣶⣿⣿⢷⣆⠘⣾⡧⠹⡗⠄⠀
⣠⣮⡾⣍⣿⣷⠝⡿⠛⣷⣽⡿⠛⣥⢹⣿⡽⣹⣌⡄
⣿⣝⣳⣿⠯⠃⣼⣧⣴⠯⠻⢷⣄⣼⡆⢛⣿⣵⣫⣽
⢤⣭⠿⡇⠀⢀⡚⢻⢿⠂⠀⢩⢿⡓⢻⠘⡿⣛⣏⡁
⡸⡽⡳⠠⠀⣸⡇⣾⡾⠀⠀⠀⣿⣧⣸⣦⠐⠧⣾⣿
⠀⠀⢀⠔⠀⢻⣿⣿⠇⠀⠀⠀⠘⣻⣿⡟⠀⠀⠀⠀
⠀⠀⠘⠋⠉⣿⣿⠏⠀⠀⠀⠀⠀⠰⢿⣧⠄⠀⠀⠀
⠀⠀⠀⣀⣴⣛⣻⡄⠀⠀⠀⠀⠀⠀⣿⣓⡷⡀⠀⠀
⠀⠀⢠⣞⣳⣼⣻⢧⠀⠀⠀⠀⠒⢪⣿⡷⣒⣳⣄⠀
⠀⠀⢬⡇⣐⡉⢱⡎⠀⠀⠀⠀⠀⠸⣷⡛⢻⠀⠉⠀
`,
  255,
);

// ── Export ──
export const HAGURUMON_SPRITES: Record<number, SpriteFrames> = {
  0: EGG_FRAMES,
  1: [CHOROMON, CHOROMON],
  2: [KAPURIMON, KAPURIMON],
  3: [HAGURUMON, HAGURUMON],
  4: [GUARDROMON, GUARDROMON],
  5: [ANDROMON, ANDROMON],
  6: [HIANDROMON, HIANDROMON],
};
