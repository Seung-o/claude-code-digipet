import esbuild from 'esbuild';
import { chmodSync } from 'fs';

const isWatch = process.argv.includes('--watch');

const commonOptions = {
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  banner: { js: '#!/usr/bin/env node' },
  external: [],
};

const entryPoints = [
  { in: 'src/index.ts', out: 'index' },
  { in: 'src/hooks/session-start.ts', out: 'hooks/session-start' },
  { in: 'src/hooks/post-tool-use.ts', out: 'hooks/post-tool-use' },
  { in: 'src/hooks/session-end.ts', out: 'hooks/session-end' },
];

async function build() {
  for (const entry of entryPoints) {
    const options = {
      ...commonOptions,
      entryPoints: [entry.in],
      outfile: `dist/${entry.out}.js`,
    };

    if (isWatch) {
      const ctx = await esbuild.context(options);
      await ctx.watch();
      console.log(`Watching ${entry.in}...`);
    } else {
      await esbuild.build(options);
      console.log(`Built ${entry.out}.js`);
    }
  }

  if (!isWatch) {
    for (const entry of entryPoints) {
      chmodSync(`dist/${entry.out}.js`, 0o755);
    }
    console.log('Build complete!');
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
