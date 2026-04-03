import type { DigimonLineId } from '../digimon/types.js';
import type { Mood } from '../digimon/stats.js';
import type { SpriteData, SpriteFrames } from './braille-renderer.js';

import { EGG_FRAMES } from './sprite-data/egg.js';
import { AGUMON_SPRITES } from './sprite-data/agumon.js';
import { TENTOMON_SPRITES } from './sprite-data/tentomon.js';
import { PATAMON_SPRITES } from './sprite-data/patamon.js';
import { PALMON_SPRITES } from './sprite-data/palmon.js';
import { GOMAMON_SPRITES } from './sprite-data/gomamon.js';
import { HAGURUMON_SPRITES } from './sprite-data/hagurumon.js';

export const MOOD_FACES: Record<Mood, string> = {
  happy: '◕‿◕',
  neutral: '°_°',
  worried: '°~°',
  sad: '°︵°',
};

const ALL_SPRITES: Record<DigimonLineId, Record<number, SpriteFrames>> = {
  agumon: AGUMON_SPRITES,
  tentomon: TENTOMON_SPRITES,
  patamon: PATAMON_SPRITES,
  palmon: PALMON_SPRITES,
  gomamon: GOMAMON_SPRITES,
  hagurumon: HAGURUMON_SPRITES,
};

export function getSprite(lineId: DigimonLineId, stage: number, frame: number): SpriteData {
  const lineSprites = ALL_SPRITES[lineId];
  const frames = lineSprites?.[stage] ?? EGG_FRAMES;
  return frames[frame % 2];
}
