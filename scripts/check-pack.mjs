// Packs the library, installs the tarball into a scratch project and loads it
// with plain Node (ESM import and CommonJS require), the way a consumer
// without a bundler would.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const pkg = '@internetarchive/field-parsers';
const expected = [
  'BooleanParser',
  'ByteParser',
  'DateParser',
  'DurationParser',
  'ListParser',
  'MediaTypeParser',
  'NumberParser',
  'PageProgressionParser',
  'StringParser'
];

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: 'pipe' });

const dir = mkdtempSync(join(tmpdir(), 'field-parsers-pack-'));
try {
  run('npm', ['pack', '--pack-destination', dir, '--silent']);
  const tarball = readdirSync(dir).find(f => f.endsWith('.tgz'));
  if (!tarball) throw new Error('npm pack produced no tarball');

  const project = join(dir, 'consumer');
  mkdirSync(project);
  writeFileSync(join(project, 'package.json'), '{"private":true}\n');
  run(
    'npm',
    ['install', '--no-audit', '--no-fund', '--silent', join(dir, tarball)],
    project
  );

  const check = `
    const missing = ${JSON.stringify(expected)}.filter(
      n => typeof m[n] !== 'function'
    );
    if (missing.length) {
      console.error('missing exports: ' + missing.join(', '));
      process.exit(1);
    }
    if (new m.BooleanParser().parseValue('false') !== false) {
      console.error('BooleanParser did not parse "false"');
      process.exit(1);
    }
  `;
  const loaders = {
    import: `import('${pkg}').then(m => { ${check} })`,
    require: `const m = require('${pkg}'); ${check}`
  };
  for (const [name, code] of Object.entries(loaders)) {
    run('node', ['-e', code], project);
    console.log(`${pkg}: ${name} ok`);
  }
} catch (err) {
  console.error(err.stderr || err.message);
  process.exitCode = 1;
} finally {
  rmSync(dir, { recursive: true, force: true });
}
