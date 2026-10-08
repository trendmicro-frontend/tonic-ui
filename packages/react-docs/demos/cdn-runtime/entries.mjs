export const localEntries = {
  react: {
    react: { specifier: 'react', file: 'entries/react.js' },
    'react-dom': { specifier: 'react-dom', file: 'entries/react-dom.js' },
    'react-dom-client': { specifier: 'react-dom/client', file: 'entries/react-dom-client.js' },
    'jsx-runtime': { specifier: 'react/jsx-runtime', file: 'entries/jsx-runtime.js' },
  },
  emotion: {
    'emotion-react': { specifier: '@emotion/react', file: 'entries/emotion-react.js' },
    'emotion-jsx-runtime': { specifier: '@emotion/react/jsx-runtime', file: 'entries/emotion-jsx-runtime.js' },
    'emotion-styled': { specifier: '@emotion/styled', file: 'entries/emotion-styled.js' },
    'emotion-styled-base': { specifier: '@emotion/styled/base', file: 'entries/emotion-styled-base.js' },
    'emotion-cache': { specifier: '@emotion/cache', file: 'entries/emotion-cache.js' },
    'emotion-is-prop-valid': { specifier: '@emotion/is-prop-valid', file: 'entries/emotion-is-prop-valid.js' },
  },
};

export const tonicSpecifiers = ['@tonic-ui/react'];
export const isReact = id => /^(react|react-dom)(\/|$)/.test(id);
export const isEmotion = id => id.startsWith('@emotion/');
export const isTonic = id => id.startsWith('@tonic-ui/');
