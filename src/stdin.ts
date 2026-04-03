export interface StatusLineInput {
  session_id: string;
  model: {
    id: string;
    display_name?: string;
  };
  cost: {
    total_cost_usd: number;
    total_duration_ms: number;
  };
  context_window: {
    used_percentage: number;
    total_input_tokens: number;
    total_output_tokens: number;
  };
}

export async function readStdin<T = StatusLineInput>(): Promise<T | null> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data) as T);
      } catch {
        resolve(null);
      }
    });
    setTimeout(() => resolve(null), 100);
  });
}
