const FILLED = '█';
const EMPTY = '░';

export function renderBar(value: number, max: number, width: number = 10): string {
  const ratio = Math.max(0, Math.min(1, value / max));
  const filled = Math.round(ratio * width);
  const empty = width - filled;
  return `[${FILLED.repeat(filled)}${EMPTY.repeat(empty)}]`;
}

export function renderPercentBar(percent: number, width: number = 10): string {
  return renderBar(percent, 100, width);
}

// Color a bar based on value thresholds
export function coloredBar(value: number, max: number, width: number = 10, invert: boolean = false): string {
  const ratio = value / max;
  const bar = renderBar(value, max, width);

  let color: string;
  if (invert) {
    // For hunger: low is good (green), high is bad (red)
    if (ratio < 0.4) color = '\x1b[38;5;46m';   // green
    else if (ratio < 0.7) color = '\x1b[38;5;226m'; // yellow
    else color = '\x1b[38;5;196m'; // red
  } else {
    // For HP: high is good (green), low is bad (red)
    if (ratio > 0.6) color = '\x1b[38;5;46m';   // green
    else if (ratio > 0.3) color = '\x1b[38;5;226m'; // yellow
    else color = '\x1b[38;5;196m'; // red
  }

  return `${color}${bar}\x1b[0m`;
}
