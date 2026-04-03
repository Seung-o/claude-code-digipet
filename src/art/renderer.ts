import type { DigimonSessionState } from '../digimon/types.js';
import { STAGE_NAMES } from '../digimon/types.js';
import { DIGIMON_LINES, RESET, getDigimonColor } from '../digimon/registry.js';
import { getMood, getStageProgress } from '../digimon/stats.js';
import { getSprite, MOOD_FACES } from './sprites.js';
import { renderSprite, getSpriteWidth } from './braille-renderer.js';
import type { SpriteData } from './braille-renderer.js';
import { renderPercentBar, coloredBar } from './bars.js';
import { advanceAnimation } from './animations.js';

function getSpritePad(sprite: SpriteData): string {
  return ' '.repeat(getSpriteWidth(sprite));
}

export function renderDigimon(state: DigimonSessionState): string {
  const line = DIGIMON_LINES[state.digimonLine];
  const color = getDigimonColor(state.digimonLine, state.stage);
  const mood = getMood(state.hp);
  const progress = getStageProgress(state.stage, state.totalExp);
  const percentStr = `${Math.round(progress * 100)}%`;

  // Get sprite data and render to braille
  const anim = state.animationState;
  const spriteData = getSprite(state.digimonLine, state.stage, anim.currentFrame);

  const spriteLines = renderSprite(spriteData, mood);

  // Build name line with mood face
  const rareStar = state.isRare ? '★ ' : '';
  const moodFace = MOOD_FACES[mood];
  const nameDisplay = `${line.icon} ${rareStar}${state.digimonName} ${moodFace}`;
  const statsDisplay = `♥${state.hp} 🍖${state.hunger}`;

  // Build EXP bar with theme color
  const expBar = `${color}${renderPercentBar(progress * 100)}${RESET} ${percentStr}`;

  // Next evolution hint
  let nextHint = '';
  if (state.stage < 6) {
    const nextName = line.names[state.stage + 1];
    nextHint = ` ⬆ ${nextName}`;
  }

  // Compute dynamic layout width based on sprite size
  const spriteW = getSpriteWidth(spriteData);
  const MIN_WIDTH = 38;
  const INFO_COL_WIDTH = 25;
  const totalWidth = Math.max(MIN_WIDTH, spriteW + 2 + INFO_COL_WIDTH);

  // Compose output lines
  const output: string[] = [];

  // Separator
  output.push(`\x1b[38;5;240m${'─'.repeat(totalWidth)}\x1b[0m`);

  // Name + stats line — pad dynamically so stats align to the right
  const nameVisualLen = [...nameDisplay].length;
  const statsVisualLen = [...statsDisplay].length;
  const padLen = Math.max(8, totalWidth - nameVisualLen - statsVisualLen);
  output.push(`${color}${nameDisplay}${RESET}${' '.repeat(padLen)}${statsDisplay}`);

  // Sprite + info side by side
  const infoLines = [
    `EXP ${expBar}${nextHint}`,
  ];

  for (let i = 0; i < Math.max(spriteLines.length, infoLines.length); i++) {
    const spritePart = spriteLines[i] ?? getSpritePad(spriteData);
    const infoPart = infoLines[i] ?? '';
    output.push(`${spritePart}  ${infoPart}`);
  }

  // Advance animation for next render
  advanceAnimation(state.animationState);

  return output.join('\n');
}
