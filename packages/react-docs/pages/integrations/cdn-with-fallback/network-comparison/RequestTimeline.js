import { Box, Button, Flex, Stack, Text, useTheme } from '@tonic-ui/react';
import { ChartBarIcon } from '@tonic-ui/react-icons';
import { kiB, num, measuredConfigs } from './data';
import { getComparisonTokens, providerColors, SectionHeading } from './shared';

const TimeAxis = ({ ticks, mobile = false, muted }) => (
  <Box
    aria-hidden="true"
    sx={{
      display: mobile ? 'none' : 'grid',
      gridTemplateColumns: `repeat(${ticks.length}, minmax(0, 1fr))`,
      mt: '1x',
      '@media (max-width: 620px)': { display: mobile ? 'grid' : 'none' },
    }}
  >
    {ticks.map((tick, index) => (
      <Text
        key={tick}
        sx={{
          fontSize: 'xs',
          color: muted,
          whiteSpace: 'nowrap',
          textAlign: index === 0 ? 'left' : index === ticks.length - 1 ? 'right' : 'center',
        }}
      >
        {tick} ms
      </Text>
    ))}
  </Box>
);

export default function RequestTimeline({
  active,
  selected,
  setSelected,
  timelineBuckets,
  maxBucket,
  timeTicks,
}) {
  const theme = useTheme();
  const { panel, recess, border, muted, faint } = getComparisonTokens(theme);
  const provider = providerColors(theme);
  const mobileTicks = timeTicks.filter((tick, index) => index % 2 === 0 || index === timeTicks.length - 1);

  return (
    <Box sx={panel}>
      <SectionHeading
        icon={<ChartBarIcon size="8x" color={provider[active.provider] ?? faint} />}
        title="Request Timeline"
        subtitle="JavaScript request distribution over time for the selected setup."
      />
      <Flex
        role="group"
        aria-label="Select loading strategy for request timeline"
        sx={{ flexWrap: 'wrap', gap: '2x', mb: '4x' }}
      >
        {measuredConfigs.map((strategy, index) => (
          <Button
            key={strategy.id}
            type="button"
            variant="secondary"
            selected={selected === index}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              columnGap: '2x',
              minWidth: 0,
              px: '3x',
              py: '2x',
              textAlign: 'left',
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                flex: 'none',
                width: '3x',
                height: '3x',
                borderRadius: '1x',
                background: provider[strategy.provider] ?? faint,
              }}
            />
            <Text sx={{ fontSize: 'sm' }}>{strategy.label}</Text>
          </Button>
        ))}
      </Flex>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '220px minmax(0, 1fr)',
          alignItems: 'center',
          gap: '4x',
          '@media (max-width: 620px)': { gridTemplateColumns: '1fr' },
        }}
      >
        <Box
          sx={{
            background: recess,
            border: `1px solid ${border}`,
            borderRadius: '3q',
            px: '3x',
            py: '3x',
          }}
        >
          <Text sx={{ display: 'block', fontSize: 'sm', color: muted }}>
            Total requests (JS)
          </Text>
          <Text sx={{ display: 'block', fontSize: '3xl', fontWeight: 'bold', lineHeight: 1 }}>
            {num(active.requests)}
          </Text>
        </Box>
        <Stack spacing="1x" sx={{ minWidth: 0 }}>
          <Box
            role="img"
            aria-label={`Requests by 100 millisecond interval: ${timelineBuckets.map((bucket) => `${bucket.start} to ${bucket.start + 100} milliseconds, ${bucket.requests} requests`).join('; ')}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${timelineBuckets.length}, minmax(0, 1fr))`,
              alignItems: 'end',
              columnGap: '1x',
              height: '24x',
              borderBottom: `1px solid ${faint}`,
              px: '1x',
            }}
          >
            {timelineBuckets.map((bucket) => (
              <Box
                key={bucket.start}
                aria-hidden="true"
                title={`${bucket.start}–${bucket.start + 100} ms: ${bucket.requests} requests, ${kiB(bucket.transferredKiB)} transferred`}
                sx={{
                  height: `${Math.max(3, 100 * bucket.requests / maxBucket)}%`,
                  background: provider[active.provider] ?? faint,
                  borderRadius: '2q 2q 0 0',
                }}
              />
            ))}
          </Box>
          <TimeAxis ticks={timeTicks} muted={muted} />
          <TimeAxis ticks={mobileTicks} mobile muted={muted} />
          <Text sx={{ display: 'block', fontSize: 'xs', color: muted, textAlign: 'center', mt: '1x' }}>
            Time (ms)
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
