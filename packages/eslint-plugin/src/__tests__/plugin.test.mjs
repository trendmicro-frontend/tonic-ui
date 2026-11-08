import { Linter } from 'eslint';
import plugin from '../index.mjs';

const lint = code => {
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
    plugin.configs.recommended,
  ]);
};

describe('plugin', () => {
  it('exposes the three styling rules', () => {
    expect(Object.keys(plugin.rules).sort()).toEqual([
      'no-flat-style-props',
      'no-inline-style',
      'no-raw-html-elements',
    ]);
  });

  it('names itself for ESLint diagnostics', () => {
    expect(plugin.meta.name).toBe('@tonic-ui/eslint-plugin');
  });

  it('documents every rule', () => {
    for (const rule of Object.values(plugin.rules)) {
      expect(rule.meta.type).toBe('suggestion');
      expect(rule.meta.docs.description).toEqual(expect.any(String));
      expect(Object.keys(rule.meta.messages).length).toBeGreaterThan(0);
      expect(rule.meta.schema).toEqual([]);
    }
  });

  describe('configs.recommended', () => {
    it('registers the plugin under the @tonic-ui namespace', () => {
      expect(plugin.configs.recommended.plugins['@tonic-ui']).toBe(plugin);
    });

    it('enables every rule as an error', () => {
      expect(plugin.configs.recommended.rules).toEqual({
        '@tonic-ui/no-flat-style-props': 'error',
        '@tonic-ui/no-inline-style': 'error',
        '@tonic-ui/no-raw-html-elements': 'error',
      });
    });

    // The rule ids in the config must resolve through the registered namespace.
    it('reports through ESLint with the recommended config', () => {
      expect(lint('<Box p="4x" />').map(message => message.ruleId)).toEqual([
        '@tonic-ui/no-flat-style-props',
      ]);

      expect(lint('<div />').map(message => message.ruleId)).toEqual([
        '@tonic-ui/no-raw-html-elements',
      ]);

      expect(lint('<Box style={{ padding: 16 }} />').map(message => message.ruleId)).toEqual([
        '@tonic-ui/no-inline-style',
      ]);
    });

    it('accepts the documented props of a real component', () => {
      expect(lint('<Scrollbar width={100} overflow="auto" />')).toEqual([]);
    });

    it('accepts sx-first code', () => {
      expect(lint('<Box sx={{ p: "4x" }} />')).toEqual([]);
    });
  });
});
