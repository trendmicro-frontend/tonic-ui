import { Box, Button, ButtonGroup, Text, useTheme } from '@tonic-ui/react';
import { ChartBarIcon } from '@tonic-ui/react-icons';
import { configurations, isMeasured, metricValue, metrics } from './data';
import { getComparisonTokens, SectionHeading, providerColors } from './shared';

export default function NetworkCost({ metric, setMetric }) {
  const theme = useTheme();
  const { panel, recess, border, ink, faint } = getComparisonTokens(theme);
  const provider = providerColors(theme);
  const maxMetric = Math.max(
    ...configurations.filter(isMeasured).map((config) => config[metric]),
  );

  return (
    <Box sx={panel}>
      <SectionHeading
        icon={<ChartBarIcon size="8x" color={provider['esm.sh']} />}
        title={`Network (${metrics.find((option) => option.key === metric).label})`}
        subtitle={
          metric === 'requests'
            ? 'JavaScript request count for each configuration, on one shared scale (lower is better).'
            : metric === 'transferredKiB'
              ? 'Compressed JavaScript bytes that crossed the network (lower is better).'
              : 'Decoded JavaScript the browser parses (lower is better).'
        }
        aside={(
          <ButtonGroup
            variant="secondary"
            role="group"
            aria-label="Network metric"
            sx={{ '> *:not(:first-of-type)': { marginLeft: -1 } }}
          >
            {metrics.map((option) => (
              <Button
                key={option.key}
                type="button"
                selected={metric === option.key}
                aria-pressed={metric === option.key}
                onClick={() => setMetric(option.key)}
                sx={{ fontSize: 'xs', px: '3x', py: '2x' }}
              >
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
        )}
      />
      <Box>
        {configurations.map((config) => {
          const color = provider[config.provider] ?? faint;
          return (
            <Box
              key={config.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'minmax(150px, 190px) minmax(0, 1fr) auto',
                gridTemplateAreas: '"label bar value"',
                alignItems: 'center',
                gap: '2x',
                py: '3x',
                borderBottom: `1px solid ${border}`,
                fontSize: 'sm',
                '@media (max-width: 620px)': {
                  gridTemplateColumns: 'minmax(0, 1fr) auto',
                  gridTemplateAreas: '"label label value" "bar bar bar"',
                  rowGap: '2x',
                },
              }}
            >
              <Text sx={{ gridArea: 'label', color: ink }} title={config.note}>
                {config.provider} · {config.label}
              </Text>
              <Box
                role={isMeasured(config) ? 'meter' : 'note'}
                aria-label={
                  isMeasured(config)
                    ? `${config.provider} ${config.label}: ${metricValue(config, metric)}`
                    : `${config.provider} ${config.label}: not measured`
                }
                aria-valuemin={0}
                aria-valuemax={maxMetric}
                aria-valuenow={config[metric]}
                sx={{
                  gridArea: 'bar',
                  height: '3x',
                  background: isMeasured(config) ? recess : 'transparent',
                  border: isMeasured(config) ? 'none' : `1px dashed ${border}`,
                  borderRadius: '3x',
                  overflow: 'hidden',
                }}
              >
                {isMeasured(config) ? (
                  <Box
                    sx={{
                      width: `${100 * config[metric] / maxMetric}%`,
                      height: '100%',
                      background: color,
                      borderRadius: '3x',
                    }}
                  />
                ) : null}
              </Box>
              <Text
                sx={{
                  gridArea: 'value',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontVariantNumeric: 'tabular-nums',
                  color: isMeasured(config) ? ink : faint,
                }}
              >
                {isMeasured(config) ? metricValue(config, metric) : '—'}
              </Text>
            </Box>
          );
        })}
      </Box>
      <Text sx={{ fontSize: 'xs', color: faint, mt: '3x' }}>
        Cold cache, three runs each, median shown. Transferred is bytes on the wire after
        compression; decoded is the JavaScript the browser parses. Bars share one absolute
        scale, so the shortest bar is genuinely the cheapest. The jsDelivr standalone row is
        empty because the published npm package does not contain the artifact yet
        (probe: HTTP {configurations.find((config) => config.status === 'unavailable')?.probeStatus ?? 404}).
      </Text>
    </Box>
  );
}
