import { execFile } from 'child_process';

export function runDashboard(stdinJson: string): Promise<string> {
  const dashboardCmd = process.env.DIGI_BUDDY_DASHBOARD_CMD;
  if (!dashboardCmd) return Promise.resolve('');

  return new Promise((resolve) => {
    const parts = dashboardCmd.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    const child = execFile(cmd, args, {
      encoding: 'utf8',
      timeout: 500,
    }, (error, stdout) => {
      resolve(error ? '' : stdout.trim());
    });
    if (child.stdin) {
      child.stdin.write(stdinJson);
      child.stdin.end();
    }
  });
}
