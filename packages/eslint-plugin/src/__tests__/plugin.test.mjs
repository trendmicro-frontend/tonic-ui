import { Linter } from 'eslint';
import plugin from '../index.mjs';

const lint = (code, ...configs) => {
  const linter = new Linter();

  return linter.verify(code, [
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    ...configs,
  ]);
};

describe('plugin', () => {
  it('exposes the styling rules', () => {
    expect(Object.keys(plugin.rules).sort()).toEqual([
      'multiline-sx-array',
      'no-flat-style-props',
      'no-inline-style',
      'no-raw-html-elements',
      'no-responsive-style-arrays',
      'no-spread-compose-sx',
    ]);
  });

  it('names itself for ESLint diagnostics', () => {
    expect(plugin.meta.name).toBe('@tonic-ui/eslint-plugin');
  });

  it('documents every rule', () => {
    for (const rule of Object.values(plugin.rules)) {
      expect(rule.meta.docs.description).toEqual(expect.any(String));
      expect(Object.keys(rule.meta.messages).length).toBeGreaterThan(0);
      expect(rule.meta.schema).toEqual([]);
    }
  });

  describe('configs.recommended', () => {
    it('registers the plugin under the @tonic-ui namespace', () => {
      expect(plugin.configs.recommended.plugins['@tonic-ui']).toBe(plugin);
    });

    const recommended = plugin.configs.recommended;

    it('reports styling migration and runtime mistakes as errors', () => {
      const code = `
        import { Box } from '@tonic-ui/react';
        import { composeSx } from '@tonic-ui/utils/internal';
        <Box p="4x" />;
        <Box sx={{ width: [100, 200] }} />;
        <Box {...composeSx(base, override)} />;
      `;
      expect(lint(code, recommended).map(({ ruleId, severity }) => [ruleId, severity])).toEqual([
        ['@tonic-ui/no-flat-style-props', 2],
        ['@tonic-ui/no-responsive-style-arrays', 2],
        ['@tonic-ui/no-spread-compose-sx', 2],
      ]);
    });

    it('accepts Tonic UI component props and flat breakpoint maps', () => {
      expect(lint(`
        import { Grid, Scrollbar } from '@tonic-ui/react';
        <Grid gap={{ sm: '4x' }} sx={[base, override]} />;
        <Scrollbar width={100} overflow="auto" />;
      `, recommended)).toEqual([]);
    });

    it('keeps inline styles and native elements independently opt-in', () => {
      const code = '<div style={{ padding: 16 }} />';
      expect(lint(code, recommended)).toEqual([]);
      expect(lint(code, recommended, plugin.configs['inline-style']).map(({ ruleId }) => ruleId))
        .toEqual(['@tonic-ui/no-inline-style']);
      expect(lint(code, recommended, plugin.configs['raw-html']).map(({ ruleId }) => ruleId))
        .toEqual(['@tonic-ui/no-raw-html-elements']);
    });

    it('separates runtime validation from sx-first preference', () => {
      const code = `import { Box } from '@tonic-ui/react'; <Box p="4x" sx={{ width: [100, 200] }} />;`;
      expect(lint(code, plugin.configs['runtime-safety']).map(({ ruleId }) => ruleId))
        .toEqual(['@tonic-ui/no-responsive-style-arrays']);
    });
  });

  it('reports multiline sx formatting as a warning only with the formatting preset', () => {
    const code = `import { Box } from '@tonic-ui/react'; <Box sx={[base,
      override]} />;`;
    const runtimeSafety = plugin.configs['runtime-safety'];
    expect(lint(code, runtimeSafety)).toEqual([]);
    expect(lint(code, runtimeSafety, plugin.configs['sx-formatting']).map(({ ruleId, severity }) => [ruleId, severity]))
      .toEqual([['@tonic-ui/multiline-sx-array', 1]]);
  });
});
