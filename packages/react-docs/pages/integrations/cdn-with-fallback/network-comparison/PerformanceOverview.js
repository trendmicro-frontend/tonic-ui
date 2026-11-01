import { Box, Divider, Flex, Stack, Text, useTheme } from '@tonic-ui/react';
import { ChartBarIcon } from '@tonic-ui/react-icons';
import { configurations, isMeasured, kiB, num } from './data';
import { getComparisonTokens, providerColors, SectionHeading } from './shared';

const Stat = ({ label, value }) => (
  <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', columnGap: '2x' }}>
    <Text sx={{ fontSize: 'sm', color: 'text.secondary' }}>{label}</Text>
    <Text sx={{ fontSize: 'md', fontWeight: 'bold', fontVariantNumeric: 'tabular-nums' }}>
      {value}
    </Text>
  </Flex>
);

export default function PerformanceOverview() {
  const theme = useTheme();
  const { panel, recess, border, faint } = getComparisonTokens(theme);
  const provider = providerColors(theme);

  return (
    <Box sx={panel}>
      <SectionHeading
        icon={<ChartBarIcon size="8x" color={provider['esm.sh']} />}
        title="Performance overview"
        subtitle="Every working configuration side by side. Medians of three cold-cache runs in Chromium."
        aside={(
          <Flex sx={{ alignItems: 'center', columnGap: '2x', color: faint, fontSize: 'xs' }}>
            <Box aria-hidden="true" sx={{ width: '3x', height: '3x', borderRadius: '1x', background: provider['esm.sh'] }} />
            <Text sx={{ fontSize: 'xs' }}>esm.sh</Text>
            <Box aria-hidden="true" sx={{ width: '3x', height: '3x', borderRadius: '1x', background: provider.jsDelivr }} />
            <Text sx={{ fontSize: 'xs' }}>jsDelivr</Text>
            <Box aria-hidden="true" sx={{ width: '3x', height: '3x', borderRadius: '1x', background: provider['Self-hosted'] }} />
            <Text sx={{ fontSize: 'xs' }}>Self-hosted</Text>
          </Flex>
        )}
      />
      <Box
        role="list"
        aria-label="Measured configuration results"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3x',
        }}
      >
        {configurations.map((config) => {
          const color = provider[config.provider] ?? faint;
          return (
            <Box
              key={config.id}
              role="listitem"
              sx={{
                background: recess,
                border: `1px solid ${border}`,
                borderLeft: `4px solid ${color}`,
                borderRadius: '2q',
                p: '3x',
                minWidth: 0,
              }}
            >
              <Flex sx={{ alignItems: 'baseline', columnGap: '2x', flexWrap: 'wrap' }}>
                <Text sx={{ fontSize: 'md', fontWeight: 'bold' }}>{config.label}</Text>
                <Text sx={{ fontSize: 'xs', color: 'text.tertiary' }}>{config.provider}</Text>
              </Flex>
              {isMeasured(config) ? (
                <Stack spacing="1x" mt="2x">
                  <Stat label="Requests" value={num(config.requests)} />
                  <Stat label="Transferred" value={kiB(config.transferredKiB)} />
                  <Stat label="Decoded JS" value={kiB(config.decodedKiB)} />
                  <Divider sx={{ mt: '2x' }} />
                  <Text sx={{ display: 'block', fontSize: 'xs', color: 'text.tertiary', mt: '1x' }}>
                    {config.renders ? 'mounts correctly' : `does not mount: ${config.failure}`}
                  </Text>
                </Stack>
              ) : (
                <Stack spacing="1x" mt="2x">
                  <Stat label="Requests" value="—" />
                  <Stat label="Transferred" value="—" />
                  <Stat label="Decoded JS" value="—" />
                  <Divider sx={{ mt: '2x' }} />
                  <Text sx={{ display: 'block', fontSize: 'xs', color: 'text.tertiary', mt: '1x' }}>
                    HTTP {config.probeStatus} — this artifact is not on npm yet, so there is nothing to measure.
                  </Text>
                </Stack>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
