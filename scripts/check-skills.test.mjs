import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  appendFileSync,
  cpSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

// Runs the check on a copy of the repo after `change` edited it.
const check = (change) => {
  const copy = mkdtempSync(join(tmpdir(), 'check skills '));

  try {
    for (const entry of ['skills', 'scripts', 'README.md', 'BASE.md']) {
      cpSync(join(root, entry), join(copy, entry), { recursive: true });
    }

    cpSync(join(root, 'AGENTS.md'), join(copy, 'AGENTS.md'));
    symlinkSync(join(root, 'node_modules'), join(copy, 'node_modules'));
    change(copy);

    const result = spawnSync('node', ['scripts/check-skills.mjs'], {
      cwd: copy,
      encoding: 'utf8',
    });

    return { status: result.status, output: result.stdout + result.stderr };
  } finally {
    rmSync(copy, { recursive: true, force: true });
  }
};

const edit = (path, from, to) => (copy) => {
  const file = join(copy, path);
  const text = readFileSync(file, 'utf8');

  assert.ok(text.includes(from), `${path} has no "${from}"`);
  writeFileSync(file, text.replace(from, to));
};

const append = (path, text) => (copy) => {
  appendFileSync(join(copy, path), text);
};

const passes = (name, change) =>
  test(`passes: ${name}`, () => {
    const result = check(change);

    assert.equal(result.status, 0, result.output);
  });

const fails = (name, change, message) =>
  test(`fails: ${name}`, () => {
    const result = check(change);

    assert.equal(result.status, 1, result.output);
    assert.match(result.output, message);
  });

passes('the repo as it is, in a path with a space', () => {});

passes(
  'a quoted name',
  edit('skills/prove-it/SKILL.md', 'name: prove-it', "name: 'prove-it'"),
);

passes('CRLF line endings', (copy) => {
  const file = join(copy, 'skills/commit/SKILL.md');

  writeFileSync(file, readFileSync(file, 'utf8').replaceAll('\n', '\r\n'));
});

passes(
  'a comment after the typed-only flag',
  edit(
    'skills/grill-me-royale/SKILL.md',
    'disable-model-invocation: true',
    'disable-model-invocation: true # manual only',
  ),
);

passes(
  'a commented-out policy',
  append(
    'skills/commit/agents/openai.yaml',
    '# allow_implicit_invocation: false\n',
  ),
);

passes(
  'a harness name',
  append('skills/prove-it/SKILL.md', 'Use Claude Code to spawn the agent.\n'),
);

fails(
  'a name that is not the folder name',
  edit('skills/commit/SKILL.md', 'name: commit', 'name: commits'),
  /commit: name is "commits"/,
);

for (const [name, value] of [
  ['an empty description', "''"],
  ['a null description', 'null'],
  ['a comment as description', '# describe the trigger here'],
  ['an empty folded description', '>-'],
]) {
  fails(
    name,
    edit(
      'skills/suggest/SKILL.md',
      /description:.*/.exec(
        readFileSync(join(root, 'skills/suggest/SKILL.md'), 'utf8'),
      )[0],
      `description: ${value}`,
    ),
    /suggest: add a description/,
  );
}

fails(
  'a missing openai.yaml',
  (copy) => rmSync(join(copy, 'skills/easy-fix/agents/openai.yaml')),
  /easy-fix: agents\/openai.yaml is missing/,
);

fails(
  'an openai.yaml that is not YAML',
  (copy) =>
    writeFileSync(
      join(copy, 'skills/commit/agents/openai.yaml'),
      'interface: [\n',
    ),
  /commit: agents\/openai.yaml is not valid YAML/,
);

fails(
  'a typed-only skill that Codex may still fire',
  edit(
    'skills/grill-me-royale/agents/openai.yaml',
    'allow_implicit_invocation: false',
    'allow_implicit_invocation: true',
  ),
  /grill-me-royale: disable-model-invocation .* disagree/,
);

fails(
  'a missing skill named before "skill"',
  append('skills/satisfy-ci/SKILL.md', 'Use the `changelog` skill.\n'),
  /satisfy-ci: names `changelog`, which is not a skill/,
);

fails(
  'a missing skill named on its own',
  edit(
    'skills/go-all-in/SKILL.md',
    'run `prove-it` again',
    'run `writing-code` again',
  ),
  /go-all-in: names `writing-code`, which is not a skill/,
);

fails(
  'a hyphenated name that is not in notSkills',
  append('skills/slopstop/SKILL.md', 'Use `aria-label` on icon buttons.\n'),
  /add it to notSkills/,
);

fails(
  'a missing skill named in openai.yaml',
  append(
    'skills/commit/agents/openai.yaml',
    "  default_prompt: 'Use `writing-code` first'\n",
  ),
  /commit\/agents\/openai.yaml: names `writing-code`/,
);

for (const [name, model] of [
  ['a model name', 'Claude Fable 5.2 at high'],
  ['a model id', 'gpt-6.1-sol'],
]) {
  fails(
    `${name} in a skill`,
    append('skills/consolidate/SKILL.md', `Use ${model}.\n`),
    /consolidate: names a model, move it to BASE.md/,
  );

  fails(
    `${name} in openai.yaml`,
    append(
      'skills/consolidate/agents/openai.yaml',
      `  default_prompt: 'Use ${model}'\n`,
    ),
    /consolidate: agents\/openai.yaml names a model/,
  );
}

fails(
  'a skill without a README row',
  (copy) => {
    const file = join(copy, 'README.md');
    const rows = readFileSync(file, 'utf8')
      .split('\n')
      .filter((line) => !line.startsWith('| `prove-it`'));

    writeFileSync(file, rows.join('\n'));
  },
  /README.md: `prove-it` needs one row in a skill table, found 0/,
);

fails(
  'a skill with two README rows',
  (copy) => {
    const file = join(copy, 'README.md');
    const rows = readFileSync(file, 'utf8')
      .split('\n')
      .flatMap((line) =>
        line.startsWith('| `prove-it`') ? [line, line] : [line],
      );

    writeFileSync(file, rows.join('\n'));
  },
  /README.md: `prove-it` needs one row in a skill table, found 2/,
);

fails(
  'a README row for a skill that is gone',
  edit('README.md', '| `suggest` ', '| `writing-code` '),
  /README.md: `writing-code` is in a table but not in skills\//,
);

fails(
  'a skill reference missing from the README uses list',
  append('skills/commit/SKILL.md', 'Run the `prove-it` skill first.\n'),
  /README.md: list `prove-it` under `commit` in the skill uses list/,
);

fails(
  'a README uses entry not named in SKILL.md',
  edit(
    'README.md',
    '- `consolidate` uses `easy-fix`.',
    '- `consolidate` uses `easy-fix` and `prove-it`.',
  ),
  /README.md: `consolidate` lists `prove-it` in the skill uses list, but consolidate\/SKILL.md does not name it/,
);

fails(
  'a duplicate skill bullet in the README uses list',
  edit(
    'README.md',
    '- `slopstop` uses `prove-it`.',
    '- `slopstop` uses `prove-it`.\n- `slopstop` uses `prove-it`.',
  ),
  /README.md: `slopstop` is listed more than once in the skill uses list/,
);

fails(
  'a never-again reference missing from the README follow-up line',
  edit(
    'README.md',
    '`go-all-in`, `consolidate` and `satisfy-ci` end with',
    '`go-all-in` and `consolidate` end with',
  ),
  /README.md: list `never-again` under `satisfy-ci` in the skill uses list/,
);

fails(
  'an unknown non-hyphenated skill in the README uses list',
  edit('README.md', '- `pr-it-ty` uses `commit`', '- `pr-it-ty` uses `comit`'),
  /README.md: `comit` in the skill uses list is not a skill/,
);

fails(
  'a missing skill uses section in README',
  edit('README.md', 'Some skills call others.', 'Skill links:'),
  /README.md: missing the skill uses section/,
);

fails(
  'an unknown skill owner in the README uses list',
  edit('README.md', '- `consolidate` uses', '- `ghost` uses'),
  /README.md: `ghost` is in the skill uses list but not in skills\//,
);

passes('skill names inside code fences and frontmatter are ignored', (copy) => {
  edit(
    'skills/commit/SKILL.md',
    'description: Read when creating a commit.',
    'description: Read when creating a commit (not `slopstop`).',
  )(copy);
  append(
    'skills/commit/SKILL.md',
    '\n```md\nExample `prove-it` fence\n```\n\n~~~\nExample `satisfy-ci` fence\n~~~\n',
  )(copy);
});

test('fails: a missing SKILL.md does not add a false README uses error', () => {
  const result = check((copy) => {
    rmSync(join(copy, 'skills/consolidate/SKILL.md'));
  });

  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /consolidate: SKILL\.md is missing/);
  assert.doesNotMatch(result.output, /consolidate\/SKILL\.md does not name it/);
});

passes('a skill uses section at the end of README', (copy) => {
  const file = join(copy, 'README.md');
  const text = readFileSync(file, 'utf8');

  writeFileSync(file, `${text.slice(0, text.indexOf('\n## Base Rules'))}\n`);
});
