import type { SpriteFrames } from "../braille-renderer.js";
import { braille } from "../braille-renderer.js";
import { EGG_FRAMES } from "./egg.js";

// ── Stage 1: Pabumon (Baby) ──
const PABUMON = braille(
  `
⠀⠀⠀⠀⠀⠀⠨⠝⠀⠀⠀⠀⠀⠋⠃⠀
⠀⠀⠀⢀⣀⢀⡀⠘⠃⠀⠀⠀⢠⢒⡄⠀
⠀⠀⠀⡎⡈⡨⠷⠒⠚⠭⣆⣀⣀⠀⠀⠀
⠀⠀⠀⢸⡿⣀⡋⠀⠀⠀⠘⡇⡨⡆⠀⠀
⠀⠀⠀⣾⠁⠻⠇⠀⠀⣿⡇⠘⣶⠁⠀⠀
⠀⢀⣼⠆⠀⠀⣟⢉⣇⠀⠀⠀⠑⣧⡀⠀
⣾⠃⠀⠀⠀⠀⠈⠛⠛⠀⠀⡠⠊⠀⣉⣲
⠀⠫⠆⠀⠀⣠⣤⡄⠀⣀⠀⠴⠶⠶⠟⠁
`,
  157,
);

// ── Stage 2: Motimon (In-Training) ──
const MOTIMON = braille(
  `
⠀⠀⠀⠀⡴⠒⠉⠉⠉⠉⠑⠢⡀⠀⠀⠀
⠀⠀⢠⠋⣰⣶⣦⠀⠀⣴⣶⣆⠈⣆⠀⠀
⠀⠀⡾⠀⠘⠚⡋⠀⠀⢙⠯⠟⠀⠘⠀⠀
⠀⠀⡇⠀⠀⠀⠙⣶⢷⠋⠀⠀⠀⢀⡀⠀
⢀⡴⠁⡀⠀⠀⠀⢨⣯⠀⠀⠀⢠⠀⠳⡀
⡜⠀⣰⡇⠀⠀⠀⠀⠀⠀⠀⠀⣜⡀⠀⢰
⠙⠛⣋⠇⠀⠀⠀⠀⠀⠀⠀⠀⢈⢿⡛⠋
⠀⠘⢥⣁⡀⣀⣀⣀⣀⣀⣀⠠⣌⠹⠛⠀
`,
  183,
);

// ── Stage 3: Tentomon (Rookie) ──
const TENTOMON = braille(
  `
⠀⠀⠀⠀⠀⠀⠀⢀⡤⠒⠀⠀⠀⢠⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⠀⢪⣤⣀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⠁⢠⣼⢪⡝⢸⡇⡎⢳⡄⠀
⠀⠀⠀⠀⠀⠀⢨⡟⣻⠷⠲⣏⠣⡇⢨⡏⡜⡄
⠀⠀⠀⠀⠀⠀⣸⣐⣽⡀⢀⣼⣆⡙⠟⡡⢲⢇
⠀⠀⠀⠀⠀⠀⣯⣿⣟⣭⣻⣿⡻⢻⣷⣾⣿⠋
⠀⣀⣀⣤⣠⢼⠿⢿⢿⣽⡿⠉⢻⣿⣿⡿⡧⠀
⡱⠚⠛⠒⠒⠉⣀⢄⣲⡯⡷⠄⣞⡘⣯⣧⣀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⣼⡟⢿⢸⠿⢣
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢇⢸⠤⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠄⠀⠀⠀
`,
  196,
);

// ── Stage 4: Kabuterimon (Champion) ──
const KABUTERIMON = braille(
  `
⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡴⢚⠝⠃⠀
⠀⠀⠀⠻⣢⡀⠀⠀⠀⠀⠀⣠⢴⣫⠞⡴⠋⠀⠀⠀
⠀⠀⣴⠀⠘⣯⠢⠀⠀⠀⠸⣿⣕⢁⠞⠀⠀⠀⠀⠀
⠀⢀⣽⢆⡙⣿⣷⣷⡦⣠⣾⡷⣳⣊⣤⠴⠒⢒⣂⠠
⠀⠈⠙⢮⣽⢾⣻⣳⢛⠟⣻⣿⣏⣬⠥⠄⠒⠁⠀⠀
⠀⡈⢽⡷⢿⣻⣾⣿⣿⣿⢽⢷⣳⣿⣯⣚⡅⠀⠀⠀
⢀⣁⣘⢁⡠⡻⢿⣿⡿⢻⣿⢿⣟⡆⠎⠺⠀⠀⠀⠀
⢹⠟⡗⠓⢿⣾⢯⠿⠿⠼⠣⣌⣬⣿⢿⣯⢆⠀⠀⠀
⠀⠉⠀⡠⠄⢬⣷⣭⣲⣾⢯⡿⡅⠀⢈⡹⡏⠀⠀⠀
⠀⠀⠘⠹⠟⠛⠋⠉⣠⡊⢿⢹⠪⣳⡌⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠘⠜⠀⠈⠃⠀⠀⠀⠀⠀
`,
  63,
);

// ── Stage 5: MegaKabuterimon (Ultimate) ──
const MEGAKABUTERIMON = braille(
  `
⠀⢰⡄⠀⣾⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⡇⡠⣸⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⣷⣿⣿⣿⣿⣤⣀⡴⣯⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀
⠀⠙⠿⠙⣿⡈⢁⣽⣿⣿⣿⣿⣿⣿⣧⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀
⠀⠀⠀⢠⣾⠟⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀
⠀⠀⣰⣿⠏⢰⣿⢿⣿⣿⣿⠿⢿⣽⣿⣿⣿⣿⣿⣇⠀
⢠⣾⣿⡃⢀⣿⣷⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣦
⣿⢋⣿⢣⣿⡟⣿⢿⣿⣌⠙⠿⠻⣿⡿⠛⣿⣿⣿⡿⠿
⠃⠈⢁⣼⣧⣤⣿⣦⣿⣿⣶⣄⣴⣿⣿⣤⣙⡓⠈⠁⠀
⠀⠀⠟⠛⢹⡿⠿⠿⠛⢻⡿⠿⠟⢻⡿⠛⠿⢿⡇⠀⠀
`,
  160,
);

// ── Stage 6: HerculesKabuterimon (Mega) ──
const HERCULESKABUTERIMON = braille(
  `
⠀⠀⠀⠀⠀⠀⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡀⢏⣗⣲⣂⣀⡔⣒⣶⣶⡦⣤⣴⢶⣦⠀
⠀⠀⡠⢖⣽⣷⢿⣽⣿⣿⣿⣌⣫⣽⡿⢿⣿⣯⣿⣻⡶
⢀⢎⣷⡿⣋⣹⡯⢇⢻⠊⣿⣿⣿⣿⣿⣿⣏⣿⣽⣿⣷
⢸⠿⠋⠁⣠⡴⣾⢫⣿⢡⢻⣿⣿⠟⠢⣵⣼⣳⡽⠄⠀
⠀⡠⣪⢙⠏⠮⢚⣴⣿⣾⡟⣷⡿⣿⣟⣿⠿⠿⣷⣄⠀
⠉⠁⠀⠀⠀⠀⡿⣿⢹⣿⡇⢹⣿⣽⣹⡈⠀⠀⠘⠃⠀
⠀⠀⠀⠀⠀⢀⢼⣿⡴⡿⠇⠋⠛⠹⠿⠽⠶⠀⠀⠀⠀
⠀⠀⠀⠀⠠⠟⠁⠀⡷⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,
  220,
);

// ── Export ──
export const TENTOMON_SPRITES: Record<number, SpriteFrames> = {
  0: EGG_FRAMES,
  1: [PABUMON, PABUMON],
  2: [MOTIMON, MOTIMON],
  3: [TENTOMON, TENTOMON],
  4: [KABUTERIMON, KABUTERIMON],
  5: [MEGAKABUTERIMON, MEGAKABUTERIMON],
  6: [HERCULESKABUTERIMON, HERCULESKABUTERIMON],
};
