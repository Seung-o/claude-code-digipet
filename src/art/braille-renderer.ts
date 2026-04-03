import type { Mood } from '../digimon/stats.js';

// ── Braille dot bit positions ──
// Each braille char is a 2-col × 4-row dot matrix:
//   Col0  Col1
//   0x01  0x08   (row 0)
//   0x02  0x10   (row 1)
//   0x04  0x20   (row 2)
//   0x40  0x80   (row 3)
const BRAILLE_BASE = 0x2800;
const DOT_BITS = [
  [0x01, 0x08],
  [0x02, 0x10],
  [0x04, 0x20],
  [0x40, 0x80],
];

// ── Types ──
export interface BrailleSpriteData {
  /** 16 rows × 24 cols. '.' = off, any other char = on (maps to palette color). */
  pattern: string[];
  /** char → ANSI 256-color index */
  palette: Record<string, number>;
}

export type BrailleSpriteFrames = [BrailleSpriteData, BrailleSpriteData];

export interface RawBrailleSpriteData {
  kind: 'raw';
  /** Pre-rendered lines of Unicode braille characters */
  lines: string[];
  /** ANSI 256-color index (default: 252) */
  color?: number;
}

export type SpriteData = BrailleSpriteData | RawBrailleSpriteData;
export type SpriteFrames = [SpriteData, SpriteData];

/** Paste braille art directly — template literal friendly */
export function braille(art: string, color?: number): RawBrailleSpriteData {
  const lines = art.split('\n');
  if (lines[0] === '') lines.shift();
  if (lines[lines.length - 1] === '') lines.pop();
  return { kind: 'raw', lines, color };
}

// ── ANSI helpers ──
const fg = (n: number) => `\x1b[38;5;${n}m`;
const RESET = '\x1b[0m';

// ── Mood tinting ──
function applyMoodTint(colorIndex: number, mood: Mood): number {
  if (mood === 'happy') return colorIndex;

  // 6×6×6 color cube (indices 16–231)
  if (colorIndex >= 16 && colorIndex <= 231) {
    const idx = colorIndex - 16;
    let r = Math.floor(idx / 36);
    let g = Math.floor((idx % 36) / 6);
    let b = idx % 6;

    if (mood === 'neutral') {
      const avg = Math.round((r + g + b) / 3);
      r = Math.round((r + avg) / 2);
      g = Math.round((g + avg) / 2);
      b = Math.round((b + avg) / 2);
    } else if (mood === 'worried') {
      const avg = Math.round((r + g + b) / 3);
      r = Math.max(0, Math.round((r + avg) / 2) - 1);
      g = Math.max(0, Math.round((g + avg) / 2) - 1);
      b = Math.max(0, Math.round((b + avg) / 2) - 1);
    } else {
      // sad — flatten toward dark gray
      const avg = Math.round((r + g + b) / 3);
      r = Math.max(0, avg - 1);
      g = Math.max(0, avg - 1);
      b = Math.max(0, avg - 1);
    }
    return 16 + 36 * r + 6 * g + b;
  }

  // Grayscale ramp (232–255)
  if (colorIndex >= 232 && colorIndex <= 255) {
    if (mood === 'neutral') return Math.max(232, colorIndex - 1);
    if (mood === 'worried') return Math.max(232, colorIndex - 3);
    return Math.max(232, colorIndex - 5);
  }

  return colorIndex;
}

// ── Raw braille renderer ──
function renderRawBrailleSprite(sprite: RawBrailleSpriteData, mood: Mood): string[] {
  const c = sprite.color ?? 252;
  const tinted = applyMoodTint(c, mood);
  return sprite.lines.map(line => line ? `${fg(tinted)}${line}${RESET}` : '');
}

function isRawSprite(sprite: SpriteData): sprite is RawBrailleSpriteData {
  return 'kind' in sprite && sprite.kind === 'raw';
}

// ── Unified dispatch ──
export function renderSprite(sprite: SpriteData, mood: Mood): string[] {
  if (isRawSprite(sprite)) return renderRawBrailleSprite(sprite, mood);
  return renderBrailleSprite(sprite, mood);
}

export function getSpriteWidth(sprite: SpriteData): number {
  if (isRawSprite(sprite)) {
    return Math.max(0, ...sprite.lines.map(l => [...l].length));
  }
  return Math.ceil(Math.max(...sprite.pattern.map(r => r.length)) / 2);
}

// ── Pattern-based renderer ──
export function renderBrailleSprite(sprite: BrailleSpriteData, mood: Mood): string[] {
  const { pattern, palette } = sprite;
  const lines: string[] = [];

  const charRows = Math.ceil(pattern.length / 4);
  const maxWidth = Math.max(...pattern.map(r => r.length));
  const charCols = Math.ceil(maxWidth / 2);

  for (let cr = 0; cr < charRows; cr++) {
    let line = '';
    let prevColor = -1;

    for (let cc = 0; cc < charCols; cc++) {
      let braille = 0;
      let cellColor = 0;

      for (let dr = 0; dr < 4; dr++) {
        const py = cr * 4 + dr;
        if (py >= pattern.length) continue;
        const row = pattern[py];

        for (let dc = 0; dc < 2; dc++) {
          const px = cc * 2 + dc;
          if (px >= row.length) continue;
          const ch = row[px];

          if (ch !== '.' && ch !== ' ') {
            braille |= DOT_BITS[dr][dc];
            if (cellColor === 0 && palette[ch] !== undefined) {
              cellColor = palette[ch];
            }
          }
        }
      }

      if (braille === 0) {
        if (prevColor !== -1) {
          line += RESET;
          prevColor = -1;
        }
        line += ' ';
      } else {
        const tinted = applyMoodTint(cellColor || 252, mood);
        if (tinted !== prevColor) {
          line += fg(tinted);
          prevColor = tinted;
        }
        line += String.fromCodePoint(BRAILLE_BASE + braille);
      }
    }

    if (prevColor !== -1) line += RESET;
    lines.push(line);
  }

  return lines;
}
