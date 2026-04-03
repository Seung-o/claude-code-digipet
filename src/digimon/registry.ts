import type { DigimonLine, DigimonLineId } from './types.js';

// ANSI 256-color escape helper
const c = (n: number) => `\x1b[38;5;${n}m`;
const bold = (s: string) => `\x1b[1m${s}`;

export const DIGIMON_LINES: Record<DigimonLineId, DigimonLine> = {
  agumon: {
    id: 'agumon',
    icon: '🔥',
    names: ['DigiEgg', 'Botamon', 'Koromon', 'Agumon', 'Greymon', 'MetalGreymon', 'WarGreymon'],
    colors: [c(252), c(216), c(214), c(208), c(202), c(196), bold(c(196))],
  },
  tentomon: {
    id: 'tentomon',
    icon: '⚡',
    names: ['DigiEgg', 'Pabumon', 'Motimon', 'Tentomon', 'Kabuterimon', 'MegaKabuterimon', 'HerculesKabuterimon'],
    colors: [c(252), c(183), c(177), c(141), c(135), c(129), bold(c(129))],
  },
  patamon: {
    id: 'patamon',
    icon: '✨',
    names: ['DigiEgg', 'Poyomon', 'Tokomon', 'Patamon', 'Angemon', 'MagnaAngemon', 'Seraphimon'],
    colors: [c(252), c(230), c(229), c(228), c(227), c(226), bold(c(231))],
  },
  palmon: {
    id: 'palmon',
    icon: '🌿',
    names: ['DigiEgg', 'Yuramon', 'Tanemon', 'Palmon', 'Togemon', 'Lillymon', 'Rosemon'],
    colors: [c(252), c(157), c(120), c(77), c(71), c(46), bold(c(46))],
  },
  gomamon: {
    id: 'gomamon',
    icon: '🌊',
    names: ['DigiEgg', 'Pichimon', 'Bukamon', 'Gomamon', 'Ikkakumon', 'Zudomon', 'Vikemon'],
    colors: [c(252), c(153), c(117), c(39), c(33), c(27), bold(c(51))],
  },
  hagurumon: {
    id: 'hagurumon',
    icon: '⚙',
    names: ['DigiEgg', 'Choromon', 'Kapurimon', 'Hagurumon', 'Guardromon', 'Andromon', 'HiAndromon'],
    colors: [c(252), c(250), c(249), c(247), c(245), c(255), bold(c(255))],
  },
};

export const ALL_LINE_IDS: DigimonLineId[] = Object.keys(DIGIMON_LINES) as DigimonLineId[];

export function getDigimonName(lineId: DigimonLineId, stage: number): string {
  return DIGIMON_LINES[lineId].names[stage] ?? 'DigiEgg';
}

export function getDigimonColor(lineId: DigimonLineId, stage: number): string {
  return DIGIMON_LINES[lineId].colors[stage] ?? c(252);
}

export const RESET = '\x1b[0m';
