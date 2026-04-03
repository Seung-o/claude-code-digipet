import { assignDigimon } from '../digimon/assignment.js';
import { loadSessionState, saveSessionState, ensureDataDir } from '../storage/state.js';
import { readStdin } from '../stdin.js';

interface HookInput {
  session_id: string;
  [key: string]: unknown;
}

async function main() {
  const input = await readStdin<HookInput>();

  try {
    if (!input) return;
    const sessionId = input.session_id ?? `session-${Date.now()}`;

    await ensureDataDir();

    const existingState = await loadSessionState();

    if (existingState) {
      // Same session_id: /clear or hook re-fire — keep existing state
      if (existingState.sessionId === sessionId) {
        return;
      }
    }

    // No existing state or stale/archived session — assign fresh digimon
    const state = assignDigimon(sessionId);
    await saveSessionState(state);
  } catch {
    // Silently fail — hooks should not block Claude Code
  }
}

main();
