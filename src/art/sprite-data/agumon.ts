import type { SpriteFrames } from "../braille-renderer.js";
import { braille } from "../braille-renderer.js";
import { EGG_FRAMES } from "./egg.js";

// ── Stage 1: Botamon (Baby) ──
const BOTAMON = braille(
  `
⠀⠀⠀⣴⣿⣿⠀⠀⠀⠀⠀⢀⠀
⠀⠀⣰⣿⣿⣿⣶⣶⣶⣤⣶⣾⣶
⢀⣾⣿⣿⣿⣽⣿⣿⣿⣿⣿⣿⡟
⣾⣿⣧⣨⣿⣿⣿⣿⠛⣿⣿⣿⣷
⠹⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟
⠀⠈⠛⠿⢿⣿⣿⣿⣿⠿⠟⠋⠀
`,
  16,
);

// ── Stage 2: Koromon (In-Training) ──
const KOROMON = braille(
  `
⠀⠀⠀⠀⠀⣀⣀⣾⡿⠓⠂⠀⠀⠀⠀
⠀⠀⠀⠀⣀⢿⠛⠿⠃⣠⣤⣀⣴⣦⣄
⠀⢀⡴⠻⠿⠻⣷⣦⣴⣳⠿⠽⠋⠀⠀
⢰⢿⠀⠀⠀⢀⣙⠛⠻⣯⠀⠀⠀⠀⠀
⠘⢦⡀⠀⠺⠷⠿⠁⢀⡿⠀⠀⠀⠀⠀
⠀⠈⠛⠿⠶⠦⠴⠖⠛⠁⠀⠀⠀⠀⠀
`,
  204,
);

// ── Stage 3: Agumon (Rookie) ──
const AGUMON = braille(
  `
⠀⠀⡠⢖⡲⡶⢤⡀⠀⠀
⠀⢰⠁⢿⠿⠁⠈⢓⢤⠀
⠀⠘⣤⠘⠶⠠⢄⣌⣀⠃
⠀⡰⢣⠫⢵⡖⠒⠚⠋⠀
⡀⡗⢿⡒⠒⡧⣀⠀⠀⠀
⠙⡿⡄⣝⣶⡿⣜⣧⠀⠀
⢀⢧⣽⣿⣿⣇⣙⡿⠀⠀
⠓⠒⠾⠿⠿⠓⠙⠛⠀⠀
`,
  208,
);

// ── Stage 4: Greymon (Champion) ──
const GREYMON = braille(
  `
⡀⣤⠀⠀⣀⡀⢀⣀⡼⠀⠀⠀⠀⠀⠀
⢷⣙⣿⣿⣿⣿⣿⡏⠁⠀⠀⠀⠀⠀⠀
⠘⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⢀⣀⣀
⠀⠛⠿⠿⢿⡟⣹⣿⢧⠀⠀⢰⢿⠟⠁
⢴⣿⣶⢤⣾⣿⣏⣽⣿⣿⣤⢿⡽⠀⠀
⠉⠉⠉⢉⣿⠁⠘⢿⣿⣿⣿⣷⠇⠀⠀
⠀⠀⠀⢟⠺⡶⠄⣏⠸⣿⠋⠁⠀⠀⠀
⢀⢤⣶⠾⢒⣹⣶⣼⣦⢼⣦⡀⠀⠀⠀
⠈⠙⠉⠉⠙⢟⡯⠿⡻⠋⠉⠁⠀⠀⠀
`,
  130,
);

// ── Stage 5: MetalGreymon (Ultimate) ──
const METALGREYMON = braille(
  `
⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀
⠀⡀⠘⣷⣤⡀⠀⠀⠀⢀⠀⡄⡾⠀⠀⠀⠀⠀⠀⠀
⠀⠈⢷⡮⣿⣿⣦⡀⣆⣸⣼⣿⣃⡀⠀⣰⠀⠀⠀⠀
⠀⠀⢄⣙⣾⣿⣿⣿⣞⣿⣿⣿⣷⡹⣯⡟⠀⠀⠀⠀
⠀⣀⣤⣾⣻⣛⣻⢿⣹⣿⣿⣿⣿⢧⣍⡇⠀⠀⠀⠀
⠐⠉⠉⠉⢿⣿⢾⣿⣟⡟⣻⣻⣿⠇⠈⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠘⢻⣿⣯⡿⢿⣻⢿⠿⢮⢶⣤⡀⠀⠀⠀
⠀⠀⠀⠀⢠⣿⣟⡼⠛⠃⠙⡷⢿⡎⠯⢷⢭⣲⣀⠀
⠀⠀⠀⠀⣸⣧⢏⠀⠀⢠⣾⠿⡋⠀⠀⠀⠑⠍⠪⠃
⠀⠀⠀⠘⠊⠓⠛⠒⠀⠀⠙⠚⠵⠉⠭⠂⠀⠀⠀⠀
`,
  130,
);

// ── Stage 6: WarGreymon (Mega) ──
const WARGREYMON = braille(
  `
⠀⢠⡀⠀⠠⣀⣀⣀⡀⠀⠀⣀⠴⠀⠀
⠀⠀⠋⣶⢶⣫⣻⣿⡧⢔⣤⡞⠁⠀⠀
⢀⠀⢸⣀⣶⢿⣟⠻⣷⣤⢯⢮⡠⡀⠀
⢘⡎⢫⢎⣷⣻⣯⣿⣯⣦⠾⢟⡁⣇⠀
⠘⡰⣵⡿⡿⠿⣿⡿⣮⢷⢀⡇⣿⣿⠋
⠀⢣⣧⡟⠰⣶⡿⡑⡄⢧⢐⠵⢪⠇⠀
⠀⢸⡟⣶⢠⡿⠁⠤⢛⣆⢼⣽⡏⠀⠀
⠀⠀⢃⣭⡾⣤⡄⡦⢔⣯⣿⠟⠀⠀⠀
⠀⠀⠀⠻⣶⣿⠏⠙⣷⣿⡇⠀⠀⠀⠀
⠀⠀⠀⢤⣿⢿⠇⠀⠳⠿⠓⣀⠀⠀⠀
⠀⡚⠩⣓⡞⠫⠄⠀⠙⣚⠝⣸⢢⡀⠀
`,
  220,
);

// ── Export ──
export const AGUMON_SPRITES: Record<number, SpriteFrames> = {
  0: EGG_FRAMES,
  1: [BOTAMON, BOTAMON],
  2: [KOROMON, KOROMON],
  3: [AGUMON, AGUMON],
  4: [GREYMON, GREYMON],
  5: [METALGREYMON, METALGREYMON],
  6: [WARGREYMON, WARGREYMON],
};
