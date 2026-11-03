import { Box, Flex, Icon, Stack, Text, useTheme } from '@tonic-ui/react';
import { CodeIcon, DownloadIcon, LinkIcon } from '@tonic-ui/react-icons';
import { configsByProvider, isMeasured, num } from './data';
import { CubeGlyph, getComparisonTokens, providerColors } from './shared';

const BuildCard = ({ title, description, bullets, color, icon }) => (
  <Box
    sx={{
      background: 'background.high',
      border: '1px solid border.subtle',
      borderTop: `4px solid ${color}`,
      borderRadius: '3q',
      p: '4x',
      minWidth: 0,
    }}
  >
    <Flex sx={{ alignItems: 'center', columnGap: '3x', mb: '2x' }}>
      <Box
        aria-hidden="true"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 'none',
          width: '11x',
          height: '11x',
          background: 'background.highest',
          borderRadius: '3q',
          color,
        }}
      >
        {icon === CubeGlyph ? <CubeGlyph size={26} /> : <Icon as={icon} size="6x" />}
      </Box>
      <Text sx={{ fontSize: 'lg', fontWeight: 'bold' }}>{title}</Text>
    </Flex>
    <Text sx={{ fontSize: 'md', color: 'text.secondary' }}>
      {description}
    </Text>
    <Stack spacing="1x" mt="3x">
      {bullets.map((bullet) => (
        <Text key={bullet} sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
          {bullet}
        </Text>
      ))}
    </Stack>
  </Box>
);

const ConfigRow = ({ config, color }) => (
  <Flex
    sx={{
      alignItems: 'center',
      columnGap: '3x',
      py: '2x',
      borderLeft: `3px solid ${color}`,
      paddingLeft: '3x',
      minWidth: 0,
    }}
  >
    <Box sx={{ minWidth: 0 }}>
      <Text sx={{ fontSize: 'md', fontWeight: 'bold' }}>
        {config.label}
      </Text>
      <Text sx={{ fontSize: 'sm', color: 'text.secondary', mt: '1x' }}>
        {config.note}
      </Text>
    </Box>
    <Box
      sx={{
        flex: 'none',
        background: isMeasured(config) ? `color-mix(in srgb, ${color} 14%, background.highest)` : 'background.highest',
        border: isMeasured(config) ? 'none' : '1px solid border.subtle',
        borderStyle: isMeasured(config) ? 'solid' : 'dashed',
        borderRadius: '2q',
        px: '2x',
        py: '1x',
        fontSize: 'xs',
        color: isMeasured(config) ? 'text.primary' : 'text.tertiary',
        whiteSpace: 'nowrap',
      }}
    >
      {isMeasured(config)
        ? `${num(config.requests)} requests`
        : 'not measured'}
    </Box>
  </Flex>
);

export default function StrategyOverview() {
  const theme = useTheme();
  const { panel, muted, faint } = getComparisonTokens(theme);
  const provider = providerColors(theme);

  return (
    <Stack spacing="4x">
      <Box sx={panel}>
        <Text as="h2" sx={{ fontSize: '3xl', fontWeight: 'bold', mt: 0, mb: 0 }}>
          Three ways to get the JavaScript
        </Text>
        <Text sx={{ fontSize: 'md', color: muted, mt: '1x' }}>
          Pick a build strategy first. The provider only decides where the file is served from.
        </Text>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3x',
            mt: '4x',
          }}
        >
          <BuildCard
            title="A — Bundle built by the CDN"
            color={provider['esm.sh']}
            icon={LinkIcon}
            description="You import a specifier and the CDN builds the module graph for you at request time."
            bullets={[
              'No build step, no artifact to deploy.',
              'esm.sh merges the package and its dependencies; jsDelivr bundles each package separately.',
              'The bundle changes when the CDN’s resolver or peer ranges change.',
            ]}
          />
          <BuildCard
            title="B — Bundle built by Tonic UI"
            color={provider['Self-hosted']}
            icon={CubeGlyph}
            description="Tonic UI ships a single self-contained file: dist/standalone/index.min.js."
            bullets={[
              'The byte-for-byte artifact you measure is the artifact you deploy.',
              'Only the React and Emotion families stay external; the import map supplies them.',
              'Needs the published npm package (or your own origin) to serve it.',
            ]}
          />
          <BuildCard
            title="C — Bundle built by your application"
            color={provider['Self-hosted']}
            icon={CodeIcon}
            description="Your bundler installs the package from npm and folds every dependency into your own app files."
            bullets={[
              'No import map and no CDN request: the browser only ever talks to your origin.',
              'Your bundler merges React, React DOM, and Emotion, so one instance of each is guaranteed.',
              'This is the shape of the reference example’s local fallback, and its measured cost.',
            ]}
          />
        </Box>
      </Box>

      <Box sx={panel}>
        <Text as="h3" sx={{ fontSize: '2xl', fontWeight: 'bold', mt: 0, mb: 0 }}>
          The configurations that work
        </Text>
        <Text sx={{ fontSize: 'md', color: muted, mt: '1x', mb: '3x' }}>
          Each row is one entry URL plus an import map, run in Chromium with a cold cache
          (three runs, median). “Decoded” is the JavaScript the browser parses; “transferred”
          is what actually crossed the network.
        </Text>
        <Stack spacing="3x">
          {configsByProvider.map(({ provider: name, configs }) => (
            <Box key={name} sx={{ minWidth: 0 }}>
              <Flex sx={{ alignItems: 'center', columnGap: '2x', mb: '1x' }}>
                <Box
                  aria-hidden="true"
                  sx={{
                    width: '3x',
                    height: '3x',
                    borderRadius: '1x',
                    background: provider[name] ?? faint,
                  }}
                />
                <Text sx={{ fontSize: 'md', fontWeight: 'bold', color: muted }}>
                  {name}
                </Text>
                <Text sx={{ fontSize: 'xs', color: faint }}>
                  {configs.length} {configs.length === 1 ? 'configuration' : 'configurations'}
                </Text>
              </Flex>
              <Stack spacing="2x">
                {configs.map((config) => (
                  <ConfigRow key={config.id} config={config} color={provider[name] ?? faint} />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
        <Flex sx={{ alignItems: 'center', columnGap: '2x', mt: '3x', color: faint, fontSize: 'xs' }}>
          <DownloadIcon size="4x" />
          <Text sx={{ fontSize: 'xs' }}>
            Setups that do not mount are kept out of this list; they are described under
            “Setups that fail”.
          </Text>
        </Flex>
      </Box>
    </Stack>
  );
}
