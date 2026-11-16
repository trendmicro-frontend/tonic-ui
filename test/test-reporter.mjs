import { basename, relative } from 'node:path';
import { inspect } from 'node:util';

// Keep rendering separate from execution: node:test owns scheduling and exit status.
export default async function* report(source) {
  const interactive = Boolean(process.stdout.isTTY) && !process.env.CI && process.env.TERM !== 'dumb';
  const color = interactive && process.env.NO_COLOR === undefined;
  const paint = (code, text) => color ? `\x1b[${code}m${text}\x1b[0m` : text;
  const duration = (ms) => ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(2)} s`;
  const files = new Map();
  const groups = new Map();
  const completedFiles = new Set();
  let progress = false;
  let completed = 0;
  const frames = ['/', '-', '\\', '|'];
  let frame = 0;
  let currentName = '';
  const clear = () => {
    if (!progress) {
      return '';
    }
    progress = false;
    return '\r\x1b[2K';
  };
  const statusLine = (text) => {
    // Leave a spare column to prevent auto-wrap from breaking carriage-return updates.
    const width = Math.max(1, (process.stdout.columns || 80) - 1);
    return text.length > width ? `${text.slice(0, Math.max(0, width - 1))}…` : text;
  };
  const renderProgress = () => statusLine(`${frames[frame++ % frames.length]} RUN   ${currentName}  ·  ${completed} tests complete`);
  const iterator = source[Symbol.asyncIterator]();
  let pending = iterator.next();
  let timer;
  yield '\nSkills & plugins  /  tooling tests\n\n';
  try {
    while (true) {
      const result = interactive && currentName
        ? await Promise.race([
            pending,
            new Promise((resolve) => {
              timer = setTimeout(() => resolve(null), 100);
            }),
          ])
        : await pending;
      clearTimeout(timer);
      if (result === null) {
        const text = clear() + renderProgress();
        progress = true;
        yield text;
        continue;
      }
      if (result.done) {
        break;
      }
      pending = iterator.next();
      const { type, data } = result.value;
      if (type === 'test:stdout' || type === 'test:stderr') {
        yield clear() + data.message;
        continue;
      }
      // start events are ordered for reporting and can arrive after execution ends.
      if (type === 'test:dequeue' && interactive) {
        currentName = data.name;
        const text = clear() + renderProgress();
        progress = true;
        yield text;
        continue;
      }
      if (type === 'test:pass' || type === 'test:fail') {
        const file = data.file;
        const counts = files.get(file) ?? { passed: 0, failed: 0, skipped: 0, todo: 0 };
        files.set(file, counts);
        const suite = data.details?.type === 'suite';
        const failed = type === 'test:fail' && !data.todo && !data.skip;
        if (!suite) {
          completed += 1;
          if (data.skip) {
            counts.skipped += 1;
          } else if (data.todo) {
            counts.todo += 1;
          } else if (failed) {
            counts.failed += 1;
          } else {
            counts.passed += 1;
          }
        }
        if (suite && data.nesting === 0) {
          const label = failed ? 'FAIL' : data.skip ? 'SKIP' : data.todo ? 'TODO' : 'PASS';
          const totals = `${counts.passed} passed, ${counts.failed} failed` +
            (counts.skipped ? `, ${counts.skipped} skipped` : '') +
            (counts.todo ? `, ${counts.todo} todo` : '');
          const separator = data.name.indexOf(' / ');
          const scope = separator === -1 ? 'Other tests' : data.name.slice(0, separator).trim();
          const name = separator === -1 ? data.name : data.name.slice(separator + 3);
          const rows = groups.get(scope) ?? [];
          rows.push(`  ${paint(failed ? 31 : 32, label)}  ${name}  ·  ${totals}  ·  ${duration(data.details.duration_ms)}\n` +
            `        ${basename(file ?? 'unknown file')}\n`);
          groups.set(scope, rows);
          files.delete(file);
        }
        if (failed && data.details?.error?.failureType !== 'subtestsFailed') {
          const location = file ? `${relative(process.cwd(), file)}:${data.line ?? 1}:${data.column ?? 1}` : '';
          const error = data.details?.error?.cause ?? data.details?.error;
          yield clear() + `\n  ${paint(31, 'FAIL')}  ${data.name}\n  ${location}\n` +
            `${inspect(error, { colors: color, depth: 6 }).split('\n').map((line) => `    ${line}`).join('\n')}\n\n`;
        }
      }
      if (type === 'test:summary' && data.file !== undefined) {
        completedFiles.add(data.file);
      }
      if (type === 'test:summary' && data.file === undefined) {
        currentName = '';
        const counts = data.counts;
        yield clear();
        for (const [scope, rows] of groups) {
          yield `${scope}\n${rows.join('')}\n`;
        }
        groups.clear();
        yield clear() + `\n  ${paint(data.success ? 32 : 31, data.success ? 'PASS' : 'FAIL')}  ` +
          `${completedFiles.size} files completed  ·  ${counts.suites} suites  ·  ${counts.passed}/${counts.tests} tests passed  ·  ${duration(data.duration_ms)}\n` +
          `        ${counts.failed} failed  ·  ${counts.cancelled} cancelled  ·  ${counts.skipped} skipped  ·  ${counts.todo} todo\n`;
      }
    }
  } finally {
    clearTimeout(timer);
    yield clear();
  }
}
