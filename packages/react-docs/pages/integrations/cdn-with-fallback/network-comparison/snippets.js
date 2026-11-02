// The snippets shown on the page are generated from the measured configurations,
// so the import map a reader copies is the one that was actually run.

// Configurations offered as copy-paste setups, in the same order as the sections
// on the page: the five canonical ones plus the single-origin variant.
export const SETUP_IDS = [
  'esmsh-standalone',
  'jsdelivr-esm',
  'jsdelivr-standalone',
  'jsdelivr-standalone-jsdelivr-peers',
  'self-hosted-standalone',
  'self-hosted-runtime',
];

export const buildIndexHtml = (config) => {
  const imports = Object.entries(config.importMap)
    .map(([key, value]) => `      "${key}": "${value}"`)
    .join(',\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Tonic UI from a CDN</title>
    <script type="importmap">
      {
        "imports": {
${imports}
        }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import { createElement } from 'react';
      import { createRoot } from 'react-dom/client';
      import { Box, Button, TonicProvider, useColorMode } from '${config.entry}';

      function App() {
        const [colorMode] = useColorMode();

        return createElement(
          Box,
          { p: '4x' },
          createElement(Button, null, 'color mode: ' + colorMode)
        );
      }

      createRoot(document.getElementById('root')).render(
        createElement(TonicProvider, { colorMode: { defaultValue: 'light' } }, createElement(App))
      );
    </script>
  </body>
</html>`;
};

// A browser cannot run JSX. Transpile it first:
// `npx esbuild app.jsx --outfile=app.js --jsx=automatic`, or let Vite do it.
export const buildAppJsx = (config) => `import { createRoot } from 'react-dom/client';
import { Box, Button, TonicProvider, useColorMode } from '${config.entry}';

function App() {
  const [colorMode] = useColorMode();

  return (
    <Box p="4x">
      <Button>color mode: {colorMode}</Button>
    </Box>
  );
}

createRoot(document.getElementById('root')).render(
  <TonicProvider colorMode={{ defaultValue: 'light' }}>
    <App />
  </TonicProvider>
);`;
