import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { describe } from 'node:test';
import report from '../test-reporter.mjs';

const reporter = fileURLToPath(new URL('../test-reporter.mjs', import.meta.url));
describe('test             / Test reporter', () => {
  test('keeps interleaved suite results under one heading per target', async () => {
    async function* events() {
      for (const name of ['skills/demo / First check', 'plugins/demo / Plugin check', 'skills/demo / Second check']) {
        yield { type: 'test:pass', data: { name, nesting: 0, file: name, details: { type: 'suite', ['duration_ms']: 1 } } };
      }
      yield { type: 'test:summary', data: {
        success: true, ['duration_ms']: 3,
        counts: { suites: 3, tests: 0, passed: 0, failed: 0, cancelled: 0, skipped: 0, todo: 0 },
      } };
    }
    let output = '';
    for await (const text of report(events())) {
      output += text;
    }
    assert.equal(output.split('\nskills/demo\n').length, 2);
    assert.ok(output.indexOf('First check') < output.indexOf('Second check'));
    assert.ok(output.indexOf('Second check') < output.indexOf('\nplugins/demo\n'));
  });
  test('animates while a real test is still running', () => {
    const root = mkdtempSync(join(tmpdir(), 'tonic-spinner-'));
    try {
      const file = join(root, 'slow.test.mjs');
      writeFileSync(file, `
        import test, { describe } from 'node:test';
        import { setTimeout } from 'node:timers/promises';
        describe('Slow suite', () => {
          test('slow case', async () => {
            await setTimeout(650);
            console.log('EXECUTION_FINISHED');
          });
        });
      `);
      const env = { ...process.env, TERM: 'xterm', NO_COLOR: '1' };
      delete env.NODE_TEST_CONTEXT;
      delete env.FORCE_COLOR;
      delete env.CI;
      const terminalReporter = join(root, 'terminal-reporter.mjs');
      writeFileSync(terminalReporter, `
        import report from ${JSON.stringify(new URL('../test-reporter.mjs', import.meta.url).href)};
        Object.defineProperty(process.stdout, 'isTTY', { value: true });
        Object.defineProperty(process.stdout, 'columns', { value: 50 });
        export default report;
      `);
      const result = spawnSync(process.execPath, ['--test', `--test-reporter=${terminalReporter}`, file], {
        encoding: 'utf8', env, timeout: 10000,
      });
      assert.equal(result.status, 0, result.stderr);
      const beforeCompletion = result.stdout.split('EXECUTION_FINISHED')[0];
      for (const frame of ['/', '-', '\\', '|']) {
        assert.ok(beforeCompletion.includes(`${frame} RUN   `), `Missing ${frame} before execution finished: ${result.stdout}`);
      }
      const plainOutput = result.stdout.replaceAll('\x1b[2K', '');
      const frames = [...plainOutput.matchAll(/(?:\r|\n)([/\\|-] RUN {3}[^\r\n]*)/g)];
      assert.ok(frames.length >= 4, result.stdout);
      for (const [, line] of frames) {
        assert.ok(line.length < 50, `Progress wrapped: ${line}`);
      }
      assert.match(plainOutput, /(?:\r|\n) {2}PASS {2}Slow suite/);
      assert.match(result.stdout, /\n {2}PASS {2}1 files completed {2}· {2}1 suites/);
      assert.match(result.stdout, /\n {8}slow\.test\.mjs\n/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
  for (const scenario of ['pass', 'fail', 'load-error']) {
    test(`reports ${scenario} without hiding runner status or diagnostics`, () => {
      const root = mkdtempSync(join(tmpdir(), 'tonic-reporter-'));
      try {
        const file = join(root, 'fixture.test.mjs');
        writeFileSync(file, scenario === 'load-error'
          ? "throw new Error('fixture load failure');"
          : `
          import { describe, it } from 'node:test';
          import assert from 'node:assert/strict';
          describe('Fixture suite', () => {
            it('successful case stays collapsed', () => { console.log('fixture diagnostic'); });
            it('skipped case', { skip: true }, () => {});
            it('assertion case', () => { assert.equal(1, ${scenario === 'fail' ? 2 : 1}, 'fixture assertion failure'); });
          });
        `);
        const env = { ...process.env, CI: 'true', NO_COLOR: '1' };
        delete env.NODE_TEST_CONTEXT;
        delete env.FORCE_COLOR;
        const result = spawnSync(process.execPath, ['--test', `--test-reporter=${reporter}`, file], {
          encoding: 'utf8', env,
        });
        assert.equal(result.status, scenario === 'pass' ? 0 : 1, result.stderr);
        assert.ok(!result.stdout.includes('\x1b['));
        if (scenario === 'load-error') {
          assert.match(result.stdout + result.stderr, /fixture load failure/);
          assert.match(result.stdout, /FAIL/);
        } else {
          assert.match(result.stdout, /Fixture suite/);
          assert.match(result.stdout, /\n {8}fixture\.test\.mjs\n/);
          assert.match(result.stdout, /1 files completed/);
          assert.match(result.stdout, /1 skipped/);
          assert.match(result.stdout, /fixture diagnostic/);
          assert.doesNotMatch(result.stdout, /successful case stays collapsed/);
          if (scenario === 'fail') {
            assert.match(result.stdout, /assertion case/);
            assert.match(result.stdout, /fixture assertion failure/);
            assert.match(result.stdout, /fixture\.test\.mjs:\d+/);
          } else {
            assert.match(result.stdout, /2\/3 tests passed/);
          }
        }
      } finally {
        rmSync(root, { recursive: true, force: true });
      }
    });
  }
});
