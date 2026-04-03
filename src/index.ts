import { readStdin } from './stdin.js';
import { runDashboard } from './compositor.js';
import { loadSessionState, saveSessionState, ensureDataDir } from './storage/state.js';
import { assignDigimon } from './digimon/assignment.js';
import { updateMetricsFromStdin, clampStats } from './digimon/stats.js';
import { processEvolution } from './digimon/evolution.js';
import { renderDigimon } from './art/renderer.js';

async function main() {
  await ensureDataDir();

  const input = await readStdin();

  // Run dashboard and load state concurrently
  const [dashboardOutput, savedState] = await Promise.all([
    input ? runDashboard(JSON.stringify(input)) : Promise.resolve(''),
    loadSessionState(),
  ]);

  // Load existing state or create new one
  let state = savedState;

  const sessionId = input?.session_id ?? `session-${Date.now()}`;

  if (!state) {
    state = assignDigimon(sessionId);
  } else if (state.sessionId !== sessionId) {
    state = assignDigimon(sessionId);
  }

  // Update metrics if we have stdin data
  if (input) {
    updateMetricsFromStdin(state, input);
    processEvolution(state);
    clampStats(state);
  }

  // Render (advances animation state internally)
  const digimonOutput = renderDigimon(state);

  // Save state after render so animation changes are persisted
  await saveSessionState(state);

  // Compose final output
  const lines: string[] = [];
  if (dashboardOutput) {
    lines.push(dashboardOutput);
  }
  lines.push(digimonOutput);

  console.log(lines.join('\n'));
}

main().catch(() => {
  process.exit(0);
});
