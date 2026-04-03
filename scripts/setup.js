#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const DIST_DIR = join(PROJECT_ROOT, 'dist');
const CLAUDE_DIR = join(homedir(), '.claude');
const SETTINGS_PATH = join(CLAUDE_DIR, 'settings.json');
const DIGI_BUDDY_MARKER = 'digi-buddy';

// ── Helpers ──────────────────────────────────────────────

function log(icon, msg) {
  console.log(`  ${icon} ${msg}`);
}

function validateDist() {
  const required = [
    'index.js',
    'hooks/session-start.js',
    'hooks/post-tool-use.js',
    'hooks/session-end.js',
  ];
  const missing = required.filter((f) => !existsSync(join(DIST_DIR, f)));
  if (missing.length > 0) {
    console.error('\n  Error: dist/ not found. Run "npm run build" first.\n');
    process.exit(1);
  }
}

function loadSettings() {
  if (!existsSync(SETTINGS_PATH)) return {};
  try {
    return JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'));
  } catch {
    console.error('\n  Error: Failed to parse ~/.claude/settings.json\n');
    process.exit(1);
  }
}

function backupSettings() {
  if (!existsSync(SETTINGS_PATH)) return;
  const backupDir = join(CLAUDE_DIR, 'backups');
  mkdirSync(backupDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = join(backupDir, `settings.json.backup-${ts}`);
  copyFileSync(SETTINGS_PATH, backupPath);
  log('💾', `Backed up settings to ${backupPath}`);
}

function isDigiBuddyCommand(command) {
  return command && command.includes(DIGI_BUDDY_MARKER);
}

// ── Status Line ──────────────────────────────────────────

function setupStatusLine(settings) {
  const newCommand = `node ${join(DIST_DIR, 'index.js')}`;

  if (settings.statusLine && !isDigiBuddyCommand(settings.statusLine.command)) {
    log('⚠️', `Existing statusLine found — replacing (old: "${settings.statusLine.command}")`);
    settings._previousStatusLine = settings.statusLine;
  }

  settings.statusLine = {
    type: 'command',
    command: newCommand,
  };
  log('✅', 'Status line configured');
}

// ── Hooks ────────────────────────────────────────────────

function upsertHook(settings, eventName, hookEntry) {
  if (!settings.hooks) settings.hooks = {};
  if (!Array.isArray(settings.hooks[eventName])) settings.hooks[eventName] = [];

  const arr = settings.hooks[eventName];

  // Find existing digi-buddy entry
  const existingIdx = arr.findIndex((item) =>
    item.hooks?.some((h) => isDigiBuddyCommand(h.command))
  );

  if (existingIdx >= 0) {
    arr[existingIdx] = hookEntry;
    log('🔄', `Updated existing ${eventName} hook`);
  } else {
    arr.push(hookEntry);
    log('✅', `Added ${eventName} hook`);
  }
}

function setupHooks(settings) {
  upsertHook(settings, 'SessionStart', {
    hooks: [
      { type: 'command', command: `node ${join(DIST_DIR, 'hooks', 'session-start.js')}` },
    ],
  });

  upsertHook(settings, 'PostToolUse', {
    matcher: '.*',
    hooks: [
      { type: 'command', command: `node ${join(DIST_DIR, 'hooks', 'post-tool-use.js')}` },
    ],
  });

  upsertHook(settings, 'Stop', {
    hooks: [
      { type: 'command', command: `node ${join(DIST_DIR, 'hooks', 'session-end.js')}` },
    ],
  });
}

// ── Data Directory ───────────────────────────────────────

function ensureDataDir() {
  const dataDir = join(homedir(), '.claude', 'digi-buddy');
  mkdirSync(dataDir, { recursive: true });
  log('✅', 'Data directory ready (~/.claude/digi-buddy/)');
}

// ── Main ─────────────────────────────────────────────────

function main() {
  console.log('\n  🐾 claude-digi-buddy setup\n');

  validateDist();
  backupSettings();

  const settings = loadSettings();

  setupStatusLine(settings);
  setupHooks(settings);
  ensureDataDir();

  // Write settings
  mkdirSync(CLAUDE_DIR, { recursive: true });
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n');

  console.log('\n  Done! Start a new Claude Code session to meet your Digimon.\n');
}

main();
