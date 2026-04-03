import { join } from 'path';
import { homedir } from 'os';

export const DATA_DIR = join(homedir(), '.claude', 'digi-buddy');
export const CURRENT_SESSION_PATH = join(DATA_DIR, 'current-session.json');
export const HISTORY_PATH = join(DATA_DIR, 'history.json');
export const ACHIEVEMENTS_PATH = join(DATA_DIR, 'achievements.json');
