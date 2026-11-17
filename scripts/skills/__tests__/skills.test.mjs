import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { describe } from 'node:test';
import { fileURLToPath } from 'node:url';
import { CONTRIBUTOR_SKILLS, validateSkills } from '../validate-skills.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const validator = join(repoRoot, 'scripts/skills/validate-skills.mjs');
const expectedContributors = [
  'tonic-ui-patterns',
  'tonic-ui-pr',
  'tonic-ui-slots',
  'tonic-ui-sx',
  'tonic-ui-tokens-maintenance',
  'tonic-ui-types',
  'tonic-ui-version',
];
const plugins = ['tonic-ui-dev', 'tonic-ui-tokens', 'tonic-ui-upgrade'];
const put = (root, path, data) => {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), typeof data === 'string' ? data : `${JSON.stringify(data, null, 2)}\n`);
};
const skill = (name, { frontmatter = `name: ${name}\ndescription: ${name} contributions.\n`, body = `# ${name}\n` } = {}) => `---\n${frontmatter}---\n${body}`;
const fixture = (fn) => {
  const root = mkdtempSync(join(tmpdir(), 'tonic-skills-'));
  try {
    return fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};
const repository = (root) => {
  for (const name of expectedContributors) {
    put(root, `skills/${name}/SKILL.md`, skill(name));
    for (const platform of ['.agents', '.claude']) {
      mkdirSync(join(root, platform, 'skills'), { recursive: true });
      symlinkSync(`../../skills/${name}`, join(root, platform, 'skills', name));
    }
  }
  for (const name of plugins) {
    put(root, `plugins/${name}/skills/${name}/SKILL.md`, skill(name));
  }
  return root;
};
const firstSkill = expectedContributors[0];
const firstPlugin = plugins[0];
const pluginSkill = `plugins/${firstPlugin}/skills/${firstPlugin}`;

describe('scripts/skills / Skill content', () => {
  test('repository contributor and bundled plugin skills pass standalone', () => {
    assert.deepEqual(CONTRIBUTOR_SKILLS, expectedContributors);
    const result = validateSkills(repoRoot);
    assert.equal(result.contributorSkills, 7);
    assert.equal(result.pluginSkills, 3);
    assert.equal(result.adapters, 'canonical-relative-links');
    const execution = spawnSync(process.execPath, [validator], { cwd: repoRoot, encoding: 'utf8' });
    assert.equal(execution.status, 0, execution.stderr);
    assert.deepEqual(JSON.parse(execution.stdout), result);
  });

  test('rejects missing and invalid frontmatter', () => fixture((root) => {
    repository(root);
    rmSync(join(root, `skills/${firstSkill}/SKILL.md`));
    assert.throws(() => validateSkills(root), /Missing skill entry/);
    put(root, `skills/${firstSkill}/SKILL.md`, '# no frontmatter\n');
    assert.throws(() => validateSkills(root), /Missing skill frontmatter/);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { frontmatter: `name: ${firstSkill}_wrong\ndescription: Fine.\n` }));
    assert.throws(() => validateSkills(root), /Invalid skill name/);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { frontmatter: `name: [invalid\ndescription: Fine.\n` }));
    assert.throws(() => validateSkills(root));
  }));

  test('rejects invalid descriptions, oversized bodies and custom metadata', () => fixture((root) => {
    repository(root);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { frontmatter: `name: ${firstSkill}\ndescription: ''\n` }));
    assert.throws(() => validateSkills(root), /Invalid description/);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { frontmatter: `name: ${firstSkill}\ndescription: ${'x'.repeat(1025)}\n` }));
    assert.throws(() => validateSkills(root), /Invalid description/);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { body: `${'line\n'.repeat(500)}` }));
    assert.throws(() => validateSkills(root), /Skill exceeds 500 lines/);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { frontmatter: `name: ${firstSkill}\ndescription: Fine.\nmetadata:\n  owner: 1\n` }));
    assert.throws(() => validateSkills(root), /Custom metadata must contain strings/);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { frontmatter: `name: ${firstSkill}\ndescription: Fine.\nallowed-tools: Read\n` }));
    assert.throws(() => validateSkills(root), /Host-specific skill controls/);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { frontmatter: `name: ${firstSkill}\ndescription: Fine.\ndisable-model-invocation: true\n` }));
    assert.throws(() => validateSkills(root), /Host-specific skill controls/);
  }));

  test('rejects broken resource links and symlinks in contributor or plugin skill packages', () => fixture((root) => {
    repository(root);
    put(root, `skills/${firstSkill}/SKILL.md`, skill(firstSkill, { body: 'See [reference](reference.md#details).\n' }));
    assert.throws(() => validateSkills(root), /Missing linked skill resource/);
    put(root, `skills/${firstSkill}/reference.md`, 'ok');
    validateSkills(root);
    put(root, `skills/${firstSkill}/reference.md`, 'See [nested](other.md).\n');
    assert.throws(() => validateSkills(root), /Missing linked skill resource/);
    put(root, `skills/${firstSkill}/other.md`, 'ok');
    symlinkSync('reference.md', join(root, 'skills', firstSkill, 'alias.md'));
    assert.throws(() => validateSkills(root), /Skill package contains a resource symlink/);
    rmSync(join(root, 'skills', firstSkill, 'alias.md'));
    put(root, `${pluginSkill}/SKILL.md`, skill(firstPlugin, { body: 'See [reference](missing.md).\n' }));
    assert.throws(() => validateSkills(root), /Missing linked skill resource: plugins\/tonic-ui-dev\/skills\/tonic-ui-dev\/SKILL.md/);
  }));

  test('rejects a missing bundled skill entry point', () => fixture((root) => {
    repository(root);
    rmSync(join(root, pluginSkill, 'SKILL.md'));
    assert.throws(() => validateSkills(root), /Missing skill entry/);
  }));

  test('validates the content of a symlinked bundled skill directory', () => fixture((root) => {
    repository(root);
    rmSync(join(root, pluginSkill), { recursive: true });
    put(root, `plugins/${firstPlugin}/shared/SKILL.md`, 'missing frontmatter\n');
    symlinkSync('../shared', join(root, pluginSkill));
    assert.throws(() => validateSkills(root), /Missing skill frontmatter/);
    put(root, `plugins/${firstPlugin}/shared/SKILL.md`, skill(firstPlugin));
    assert.equal(validateSkills(root).pluginSkills, 3);
  }));

  test('rejects invalid native adapters and unexpected contributor skills', () => fixture((root) => {
    repository(root);
    const adapter = join(root, '.agents/skills', firstSkill);
    rmSync(adapter);
    mkdirSync(adapter);
    assert.throws(() => validateSkills(root), /Invalid \.agents adapter/);
    rmSync(adapter, { recursive: true });
    symlinkSync(`../../skills/${firstSkill}`, adapter);
    const claudeAdapter = join(root, '.claude/skills', firstSkill);
    rmSync(claudeAdapter);
    symlinkSync('../../skills/tonic-ui-pr', claudeAdapter);
    assert.throws(() => validateSkills(root), /Invalid \.claude adapter/);
    rmSync(claudeAdapter);
    symlinkSync(`../../skills/${firstSkill}`, claudeAdapter);
    put(root, 'skills/extra-skill/SKILL.md', skill('extra-skill'));
    assert.throws(() => validateSkills(root), /Unexpected physical directories in skills/);
  }));

  test('rejects extra adapters and obsolete skill groups', () => fixture((root) => {
    repository(root);
    symlinkSync(`../../skills/${firstSkill}`, join(root, '.agents/skills', 'extra-skill'));
    assert.throws(() => validateSkills(root), /Native adapters must contain only contributor skills in \.agents/);
    rmSync(join(root, '.agents/skills', 'extra-skill'));
    mkdirSync(join(root, 'skills/internal'));
    assert.throws(() => validateSkills(root), /Obsolete skill groups remain/);
    rmSync(join(root, 'skills/internal'), { recursive: true });
    mkdirSync(join(root, 'skills/external'));
    assert.throws(() => validateSkills(root), /Obsolete skill groups remain/);
  }));
});
