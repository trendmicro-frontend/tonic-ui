#!/usr/bin/env node
'use strict';

const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const scriptPath = path.join(__dirname, '..', 'post-comment.js');
const input = '@tonic-ui/react\treact\n@tonic-ui/react-base\treact-base\n';

const output = execFileSync(
  process.execPath,
  [scriptPath, 'github.com', 'trendmicro-frontend/tonic-ui-previews', 'pr-123', 'abc1234'],
  { input, encoding: 'utf8' },
);

assert.ok(/## \u{1F4E6} Preview packages/u.test(output), 'expected a heading');
assert.ok(
  output.includes(
    '"@tonic-ui/react": "git+https://github.com/trendmicro-frontend/tonic-ui-previews.git#head=pr-123&workspace=@tonic-ui/react"',
  ),
  'expected a git dependency snippet for @tonic-ui/react',
);
assert.ok(
  output.includes(
    '"@tonic-ui/react-base": "git+https://github.com/trendmicro-frontend/tonic-ui-previews.git#head=pr-123&workspace=@tonic-ui/react-base"',
  ),
  'expected a git dependency snippet for @tonic-ui/react-base',
);
assert.ok(!output.includes('\n'), 'comment body must use literal \\n, not real newlines');

console.log('PASS');
