import { loadSessionState, saveSessionState } from '../storage/state.js';
import { readStdin } from '../stdin.js';

interface ToolUseHookInput {
  session_id: string;
  tool_name?: string;
  tool_input?: unknown;
  error?: string;
  [key: string]: unknown;
}

async function main() {
  const input = await readStdin<ToolUseHookInput>();

  try {
    if (!input) return;
    const state = await loadSessionState();
    if (!state) return;

    const toolName = input.tool_name ?? 'unknown';
    const isError = !!input.error;

    // Update tool metrics
    state.metrics.toolCalls++;
    if (isError) {
      state.metrics.failedToolCalls++;
      state.metrics.consecutiveSuccesses = 0;
      state.hp = Math.max(10, state.hp - 2);
    } else {
      state.metrics.successfulToolCalls++;
      state.metrics.consecutiveSuccesses++;
      state.hp = Math.min(100, state.hp + 5);

      // Streak bonus
      if (state.metrics.consecutiveSuccesses % 5 === 0) {
        state.hp = Math.min(100, state.hp + 8);
      }
    }

    // Track unique tool types
    if (!state.metrics.uniqueToolTypes.includes(toolName)) {
      state.metrics.uniqueToolTypes.push(toolName);
      state.hp = Math.min(100, state.hp + 15); // Diversity bonus
    }

    // Reset chat-only streak
    state.metrics.chatOnlyStreak = 0;

    await saveSessionState(state);
  } catch {
    // Silently fail
  }
}

main();
