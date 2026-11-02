import { useState } from 'react';
import { Box, Button, Flex, Stack, Text, useTheme } from '@tonic-ui/react';
import { CodeIcon } from '@tonic-ui/react-icons';
import CodeBlock from '@/components/CodeBlock';
import { configurations, kiB, num, variants } from './data';
import { buildAppJsx, buildIndexHtml, SETUP_IDS } from './snippets';
import { getComparisonTokens, providerColors, SectionHeading } from './shared';

// Every entry and import map shown here is the exact pair
// `scripts/measure-cdn-strategies.mjs` ran in Chromium.
const allConfigs = [...configurations, ...variants];

const useWhen = {
  'esmsh-standalone':
    'Prototyping, or a page with no build step: nothing to download, nothing to host, and the fewest CDN requests of the CDN-built setups. The bundle is produced by esm.sh, not by Tonic UI.',
  'jsdelivr-esm':
    'You want one CDN and per-package modules you can inspect in the Network tab. You have to maintain the alias map: it only works while it matches the URLs jsDelivr emits.',
  'jsdelivr-standalone':
    'Production, without hosting anything yourself. The bytes are the artifact `yarn build` produced and the package test checked, served straight from npm.',
  'self-hosted-standalone':
    'Production with your own origin: the entry is a path under your site root (copy dist/standalone/index.min.js there), so you control compression, caching, and versioning.',
  'jsdelivr-standalone-jsdelivr-peers':
    'Single origin for the library and every peer — one entry in your CSP allow list, and the fewest requests in this run.',
  'self-hosted-runtime':
    'No CDN at all: your bundler builds React, React DOM, Emotion, and Tonic UI into files you serve. One origin, no peer resolution to police — and this is the shape the fallback deploys when a CDN group fails.',
};

export default function SetupExplorer() {
  const theme = useTheme();
  const { panel, recess, border, muted, faint } = getComparisonTokens(theme);
  const provider = providerColors(theme);

  const setups = SETUP_IDS
    .map((id) => allConfigs.find((config) => config.id === id))
    .filter((config) => config && config.status === 'measured' && config.renders);

  const [selected, setSelected] = useState(0);
  const [file, setFile] = useState('html');
  const active = setups[selected];
  const bareEntries = Object.keys(active.importMap).filter((key) => !key.startsWith('http')).length;
  const aliasEntries = Object.keys(active.importMap).length - bareEntries;

  return (
    <Box sx={panel}>
      <SectionHeading
        icon={<CodeIcon size="8x" color={provider[active.provider] ?? faint} />}
        title="Copy a setup"
        subtitle="Select a configuration to see its entry URL and the import map it needs."
      />

      <Flex
        role="group"
        aria-label="Select a CDN setup"
        sx={{ flexWrap: 'wrap', gap: '2x', mb: '4x' }}
      >
        {setups.map((config, index) => (
          <Button
            key={config.id}
            type="button"
            variant="secondary"
            selected={selected === index}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              columnGap: '2x',
              minWidth: 0,
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                flex: 'none',
                width: '2x',
                height: '2x',
                borderRadius: '1x',
                background: provider[config.provider] ?? faint,
              }}
            />
            <Text sx={{ fontSize: 'md' }}>{config.label}</Text>
            <Text sx={{ fontSize: 'xs', color: muted }}>
              {config.provider} · {num(config.requests)} requests
            </Text>
          </Button>
        ))}
      </Flex>

      <Stack spacing="3x">
        <Flex sx={{ flexWrap: 'wrap', gap: '3x', color: muted, fontSize: 'md' }}>
          <Text>
            <strong>{num(active.requests)}</strong> requests
          </Text>
          <Text>
            <strong>{kiB(active.transferredKiB)}</strong> transferred
          </Text>
          <Text>
            <strong>{kiB(active.decodedKiB)}</strong> decoded
          </Text>
          <Text>
            <strong>{active.reactInstances}</strong> React instance{active.reactInstances === 1 ? '' : 's'}
          </Text>
          <Text>
            <strong>{bareEntries}</strong> bare specifiers
            {aliasEntries > 0 ? `, ${aliasEntries} aliases for CDN-pinned URLs` : ''}
          </Text>
        </Flex>

        <Box
          sx={{
            background: recess,
            border: `1px solid ${border}`,
            borderRadius: '3q',
            px: '3x',
            py: '2x',
          }}
        >
          <Text sx={{ fontSize: 'md', color: muted }}>Use it when</Text>
          <Text sx={{ fontSize: 'md', mt: '1x' }}>{useWhen[active.id]}</Text>
        </Box>

        <Flex sx={{ flexWrap: 'wrap', gap: '2x' }}>
          <Button
            type="button"
            variant="secondary"
            selected={file === 'html'}
            aria-pressed={file === 'html'}
            onClick={() => setFile('html')}
          >
            index.html
          </Button>
          <Button
            type="button"
            variant="secondary"
            selected={file === 'jsx'}
            aria-pressed={file === 'jsx'}
            onClick={() => setFile('jsx')}
          >
            app.jsx
          </Button>
        </Flex>

        {file === 'html' ? (
          <>
            <CodeBlock code={buildIndexHtml(active)} language="html" />
            <Text sx={{ fontSize: 'sm', color: faint }}>
              Save this as index.html and open it: no bundler, no build step. This is the file the
              measurement ran.
            </Text>
          </>
        ) : (
          <>
            <CodeBlock code={buildAppJsx(active)} language="jsx" />
            <Text sx={{ fontSize: 'sm', color: faint }}>
              A browser cannot run JSX. Save it as app.jsx, transpile with
              `npx esbuild app.jsx --outfile=app.js --jsx=automatic` (or let Vite do it), and load the
              output from index.html with a module script pointing at ./app.js. The request counts
              above are for the inline index.html version; the separate app.js adds one request.
            </Text>
          </>
        )}

        <Text sx={{ fontSize: 'sm', color: faint }}>
          The reference example (examples/cdn-with-local-fallback) uses the same entry and import map, and
          adds same-origin fallback files so the page still mounts when a CDN request fails.
        </Text>
      </Stack>
    </Box>
  );
}
