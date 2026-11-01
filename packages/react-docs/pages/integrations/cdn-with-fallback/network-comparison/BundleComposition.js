import { Box, Flex, Stack, Text, useTheme } from '@tonic-ui/react';
import { InfoOIcon } from '@tonic-ui/react-icons';
import { configurations, isMeasured, kiB, num } from './data';
import { getComparisonTokens, providerColors, SectionHeading } from './shared';

const legendItems = [
  {
    key: 'Tonic UI bundle (merged dependencies)',
    label: 'Tonic UI bundle',
    detail: '(one merged file)',
  },
  {
    key: 'Tonic UI packages',
    label: 'Tonic UI packages',
    detail: '(one bundle per package)',
  },
  { key: 'React / React DOM', label: 'React / React DOM' },
  { key: 'Emotion', label: 'Emotion' },
  { key: 'Other dependencies', label: 'Other dependencies' },
];

const formatPercent = (value) => `${Number(value).toFixed(1)}%`;

export default function BundleComposition() {
  const theme = useTheme();
  const {
    family,
    surface,
    recess,
    border,
    ink,
    muted,
    faint,
    panel,
  } = getComparisonTokens(theme);
  const provider = providerColors(theme);
  const measured = configurations.filter(isMeasured);
  const maxDecoded = Math.max(...measured.map((config) => config.decodedKiB));
  // A rounded scale keeps the axis labels inside the panel instead of hanging
  // the largest value off the right edge.
  const scaleMax = Math.ceil(maxDecoded / 200) * 200;
  const tickStep = scaleMax > 1000 ? 200 : 100;
  const ticks = Array.from({ length: scaleMax / tickStep + 1 }, (_, index) => index * tickStep);

  return (
    <Box>
      <SectionHeading
        icon={<InfoOIcon size="8x" color={provider['esm.sh']} />}
        title="JavaScript size and composition"
        subtitle="Total decoded JavaScript for each configuration, broken down by dependency family."
        titleSize="4xl"
      />

      <Box
        role="list"
        aria-label="Dependency families"
        sx={{
          ...panel,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: '3x',
          '& > *:not(:last-child)': {
            borderRight: `1px solid ${border}`,
            pr: '3x',
          },
          mb: '3x',
          '@media (max-width: 1000px)': {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            '& > *': { borderRight: 'none', pr: 0 },
          },
          '@media (max-width: 620px)': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          },
        }}
      >
        {legendItems.map((item) => (
          <Flex
            key={item.key}
            role="listitem"
            sx={{ alignItems: 'center', columnGap: '3x', minWidth: 0 }}
          >
            <Box
              aria-hidden="true"
              sx={{
                flex: 'none',
                width: '7x',
                height: '7x',
                borderRadius: '2q',
                background: family[item.key],
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Text sx={{ display: 'block', fontSize: 'md', lineHeight: 1.25 }}>
                {item.label}
              </Text>
              {item.detail ? (
                <Text sx={{ display: 'block', fontSize: 'sm', color: muted, lineHeight: 1.25 }}>
                  {item.detail}
                </Text>
              ) : null}
            </Box>
          </Flex>
        ))}
      </Box>

      <Box
        role="list"
        aria-label="Decoded JavaScript size and dependency breakdown by configuration"
        sx={{ ...panel, p: 0, overflow: 'hidden' }}
      >
        {configurations.map((config, index) => {
          const color = provider[config.provider] ?? faint;
          const segments = isMeasured(config)
            ? Object.entries(config.groupsKiB)
                .filter(([, value]) => value > 0)
                .sort((a, b) => b[1] - a[1])
            : [];
          const groupTotal = segments.reduce((sum, [, value]) => sum + value, 0);
          const relativeWidth = isMeasured(config) ? 100 * config.decodedKiB / scaleMax : 0;

          return (
            <Box
              key={config.id}
              role="listitem"
              sx={{
                display: 'grid',
                gridTemplateColumns: '64px minmax(220px, 300px) minmax(0, 1fr) 180px',
                gridTemplateAreas: '"icon label bar total"',
                alignItems: 'center',
                columnGap: '4x',
                px: '4x',
                py: '4x',
                borderBottom: index < configurations.length - 1 ? `1px solid ${border}` : 'none',
                '@media (max-width: 900px)': {
                  gridTemplateColumns: '48px minmax(0, 1fr) auto',
                  gridTemplateAreas: '"icon label total" "bar bar bar"',
                  columnGap: '3x',
                  rowGap: '3x',
                },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  gridArea: 'icon',
                  display: 'flex',
                  alignItems: 'center',
                  justifySelf: 'center',
                  width: '8x',
                  height: '8x',
                  borderRadius: '2q',
                  background: `color-mix(in srgb, ${color} 18%, ${surface})`,
                  '@media (max-width: 900px)': {
                    width: '6x',
                    height: '6x',
                  },
                }}
              />

              <Box sx={{ gridArea: 'label', minWidth: 0 }}>
                <Text sx={{ display: 'block', fontSize: '2xl', fontWeight: 'bold', lineHeight: 1.2 }}>
                  {config.label}
                </Text>
                <Text sx={{ display: 'block', fontSize: 'md', color: muted, mt: '1x' }}>
                  {config.provider} · {config.build}
                </Text>
                {isMeasured(config) ? (
                  <Text sx={{ display: 'block', fontSize: 'md', color: muted, mt: '1x' }}>
                    Largest file: {kiB(config.largestFileKiB)} ({config.largestFileShare}%) ·
                    {' '}{num(config.duplicateRequests)} duplicate {config.duplicateRequests === 1 ? 'fetch' : 'fetches'}
                  </Text>
                ) : (
                  <Text sx={{ display: 'block', fontSize: 'md', color: faint, mt: '1x' }}>
                    No file to fetch yet — HTTP {config.probeStatus}
                  </Text>
                )}
              </Box>

              <Box sx={{ gridArea: 'bar', minWidth: 0 }}>
                <Box
                  role="img"
                  aria-label={
                    isMeasured(config)
                      ? `${config.label}: ${kiB(config.decodedKiB)} total, ${segments.map(([name, value]) => `${name} ${kiB(value)}`).join(', ')}`
                      : `${config.label}: not measured`
                  }
                  sx={{
                    height: '10x',
                    width: '100%',
                    background: isMeasured(config) ? recess : 'transparent',
                    border: isMeasured(config) ? 'none' : `1px dashed ${border}`,
                    borderRadius: '2q',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: `${relativeWidth}%`,
                      height: '100%',
                      borderRadius: '2q',
                      overflow: 'hidden',
                    }}
                  >
                    {segments.map(([name, value]) => (
                      <Box
                        key={name}
                        aria-hidden="true"
                        title={`${name}: ${kiB(value)} of ${kiB(config.decodedKiB)}`}
                        sx={{
                          flex: `0 0 ${100 * value / groupTotal}%`,
                          height: '100%',
                          background: family[name] ?? theme.get('colors.neutral.icon'),
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>

              <Flex
                sx={{
                  gridArea: 'total',
                  minWidth: 0,
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  rowGap: '1x',
                  borderLeft: `1px solid ${border}`,
                  pl: '4x',
                  '@media (max-width: 900px)': {
                    borderLeft: 'none',
                    pl: 0,
                  },
                }}
              >
                <Text sx={{ fontSize: '3xl', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', color: isMeasured(config) ? ink : faint }}>
                  {isMeasured(config) ? kiB(config.decodedKiB) : 'not measured'}
                </Text>
                <Text
                  sx={{
                    borderRadius: '3q',
                    background: recess,
                    color: muted,
                    fontSize: 'sm',
                    px: '3x',
                    py: '1x',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isMeasured(config)
                    ? (relativeWidth === 100 ? '100% (largest)' : `${formatPercent(relativeWidth)} of max`)
                    : 'no data'}
                </Text>
              </Flex>
            </Box>
          );
        })}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '64px minmax(220px, 300px) minmax(0, 1fr) 180px',
            columnGap: '4x',
            px: '4x',
            pt: '3x',
            pb: '2x',
            '@media (max-width: 900px)': {
              gridTemplateColumns: '48px minmax(0, 1fr) auto',
              columnGap: '3x',
            },
          }}
        >
          <Box
            sx={{
              gridColumn: '3 / 4',
              position: 'relative',
              height: '6x',
              '@media (max-width: 1400px)': { gridColumn: '1 / -1' },
            }}
          >
            {ticks.map((tick) => {
              const isZero = tick === 0;
              const isLast = tick === scaleMax;
              return (
                <Text
                  key={tick}
                  sx={{
                    position: 'absolute',
                    left: `${100 * tick / scaleMax}%`,
                    transform: isZero ? 'none' : isLast ? 'translateX(-100%)' : 'translateX(-50%)',
                    color: muted,
                    fontSize: 'xs',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {kiB(tick)}
                </Text>
              );
            })}
          </Box>
          <Text
            sx={{
              gridColumn: '3 / 4',
              display: 'block',
              textAlign: 'center',
              fontSize: 'sm',
              color: muted,
              mt: '1x',
              '@media (max-width: 1400px)': { gridColumn: '1 / -1' },
            }}
          >
            Decoded JavaScript size (KiB)
          </Text>
        </Box>
      </Box>

      <Flex
        role="note"
        sx={{
          alignItems: 'flex-start',
          columnGap: '3x',
          background: surface,
          border: `1px solid ${border}`,
          borderRadius: '3q',
          px: '4x',
          py: '3x',
          mt: '3x',
        }}
      >
        <InfoOIcon size="6x" color={muted} />
        <Stack spacing="1x">
          <Text sx={{ fontSize: 'sm', color: ink, fontWeight: 'bold' }}>
            Bar length is total decoded JavaScript on a shared scale; the colors show the dependency breakdown.
          </Text>
          <Text sx={{ fontSize: 'sm', color: muted }}>
            A merged bundle (esm.sh `?standalone`, the self-hosted artifact) puts dependencies in one file; jsDelivr `+esm`
            delivers one bundle per package. Compare totals, not the “Tonic UI” slice.
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
