#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const CLAUDE_DIR = join(homedir(), '.claude');
const SETTINGS_PATH = join(CLAUDE_DIR, 'settings.json');
const DATA_DIR = join(CLAUDE_DIR, 'digi-buddy');
const DIGI_BUDDY_MARKER = 'digi-buddy';
const purge = process.argv.includes('--purge');

function log(icon, msg) {
  console.log(`  ${icon} ${msg}`);
}

function isDigiBuddyCommand(command) {
  return command && command.includes(DIGI_BUDDY_MARKER);
}

function main() {
  console.log('\n  🐾 claude-digi-buddy uninstall\n');

  if (!existsSync(SETTINGS_PATH)) {
    log('ℹ️', 'No settings.json found — nothing to remove.');
    return;
  }

  const settings = JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'));
  let changed = false;

  // Restore previous statusLine or remove it
  if (settings.statusLine && isDigiBuddyCommand(settings.statusLine.command)) {
    if (settings._previousStatusLine) {
      settings.statusLine = settings._previousStatusLine;
      delete settings._previousStatusLine;
      log('🔄', 'Restored previous statusLine');
    } else {
      delete settings.statusLine;
      log('✅', 'Removed statusLine');
    }
    changed = true;
  }

  // Remove digi-buddy hooks
  const hookEvents = ['SessionStart', 'PostToolUse', 'Stop'];
  for (const event of hookEvents) {
    const arr = settings.hooks?.[event];
    if (!Array.isArray(arr)) continue;

    const filtered = arr.filter(
      (item) => !item.hooks?.some((h) => isDigiBuddyCommand(h.command))
    );

    if (filtered.length !== arr.length) {
      if (filtered.length === 0) {
        delete settings.hooks[event];
      } else {
        settings.hooks[event] = filtered;
      }
      log('✅', `Removed ${event} hook`);
      changed = true;
    }
  }

  // Clean up empty hooks object
  if (settings.hooks && Object.keys(settings.hooks).length === 0) {
    delete settings.hooks;
  }

  if (changed) {
    writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n');
    log('💾', 'Settings saved');
  } else {
    log('ℹ️', 'No digi-buddy config found in settings.json');
  }

  // Purge data
  if (purge && existsSync(DATA_DIR)) {
    rmSync(DATA_DIR, { recursive: true, force: true });
    log('🗑️', 'Deleted pet data (~/.claude/digi-buddy/)');
  }

  console.log('\n  Done! Digi-buddy has been removed from Claude Code.\n');
}

main();
