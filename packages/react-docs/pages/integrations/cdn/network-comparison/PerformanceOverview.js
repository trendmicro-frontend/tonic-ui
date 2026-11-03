import { useState } from 'react';
import {
  Box,
  ButtonBase,
  Flex,
  Grid,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Tag,
  Text,
  useTheme,
} from '@tonic-ui/react';
import { ChartBarIcon } from '@tonic-ui/react-icons';
import { isMeasured, kiB, num, pageConfigs } from './data';
import { getComparisonTokens, providerColors, SectionHeading } from './shared';

// Labels carry markdown code spans for the page; this panel renders plain text.
const plainLabel = (label) => label.replace(/`/g, '');

const BUCKETS = [
  { id: 'all', label: 'All' },
  { id: 'react', label: 'React' },
  { id: 'emotion', label: 'Emotion' },
  { id: 'tonic', label: 'Tonic UI' },
  { id: 'other', label: 'Others' },
];

// Every `@emotion/*` request is Emotion, whatever pulled it in; the rest follow
// the measurement's own grouping, which also covers same-origin bundle paths such
// as `runtime/react@19.2.7.js`.
const bucketOf = (file) => {
  const { group, path } = file;
  if (path.startsWith('@emotion/') || group === 'Emotion') {
    return 'emotion';
  }
  if (group === 'React / React DOM') {
    return 'react';
  }
  if (group === 'Tonic UI packages' || group === 'Tonic UI bundle (merged dependencies)') {
    return 'tonic';
  }
  return 'other';
};

// Category identity: same colours for every configuration, in this order.
const CATEGORIES = [
  { id: 'react', label: 'React', colorKey: 'colors._chart.categorical.unpredictable.chart-8' },
  { id: 'emotion', label: 'Emotion', colorKey: 'colors._chart.categorical.unpredictable.chart-1' },
  { id: 'tonic', label: 'Tonic UI', colorKey: 'colors._chart.categorical.unpredictable.chart-4' },
  { id: 'other', label: 'Others', colorKey: 'colors._chart.categorical.unpredictable.chart-7' },
];

const ListRow = ({ left, right }) => {
  const theme = useTheme();
  const { border } = getComparisonTokens(theme);

  return (
    <Flex
      sx={{
        columnGap: '3x',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        py: '1x',
        borderRadius: '1q',
        borderBottom: `1px solid ${border}`,
        _last: { borderBottom: 'none' },
        _hover: { background: 'background.high' },
      }}
    >
      <Text
        sx={{
          flex: 1,
          minWidth: 0,
          fontSize: 'md',
          lineHeight: 1.6,
          overflowWrap: 'anywhere',
          fontFamily: theme.get('fonts.mono'),
        }}
      >
        {left}
      </Text>
      <Text
        sx={{
          fontSize: 'md',
          flex: 'none',
          lineHeight: 1.6,
          color: 'text.tertiary',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {right}
      </Text>
    </Flex>
  );
};

const GroupHeading = ({ label, count }) => (
  <Text
    sx={{
      display: 'block',
      fontSize: 'md',
      fontWeight: 'semibold',
      color: 'text.tertiary',
      mt: '3x',
      mb: '1x',
    }}
  >
    {label} ({count})
  </Text>
);

const FilterChip = ({ selected, children, onClick }) => {
  const theme = useTheme();
  const { border, muted, ink } = getComparisonTokens(theme);
  const accent = theme.get('colors.blue:60');

  return (
    <ButtonBase
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      sx={{
        px: '3x',
        py: '1x',
        borderRadius: '2q',
        border: '1px solid',
        borderColor: selected ? accent : border,
        background: selected ? accent : 'transparent',
        color: selected ? theme.get('colors.white:emphasis') : muted,
        fontSize: 'md',
        fontWeight: selected ? 'semibold' : 'normal',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        transition: 'background-color 120ms ease, border-color 120ms ease, color 120ms ease',
        _hover: selected
          ? { background: accent, color: theme.get('colors.white:emphasis') }
          : { borderColor: accent, color: ink },
      }}
    >
      {children}
    </ButtonBase>
  );
};

const COMPOSITION_LABELS = {
  react: 'React',
  emotion: 'Emotion',
  tonic: 'Tonic UI',
  other: 'Others',
};

// The build reports per-family source length before minification; scale those
// shares to the chunk's measured size so the rows add up to the file size.
const compositionRows = (composition, parsedKiB) => {
  // The chips classify React DOM with React, so the tree does too.
  const merged = { ...composition };
  if (merged.reactDom) {
    merged.react = (merged.react ?? 0) + merged.reactDom;
    delete merged.reactDom;
  }
  // Application code is a fraction of a kilobyte and has no counterpart in the
  // CDN rows, whose harness is inline, so it is not listed.
  const entries = Object.entries(merged).filter(([key]) => key !== 'app');
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (!total) {
    return [];
  }
  return entries
    .map(([key, bytes]) => ({ key, share: bytes / total }))
    .sort((a, b) => b.share - a.share)
    .map(({ key, share }) => ({
      key,
      label: COMPOSITION_LABELS[key] ?? key,
      sizeKiB: Math.round(share * parsedKiB * 10) / 10,
    }));
};

const CompositionRow = ({ label, size }) => (
  <Flex sx={{ columnGap: '2x', pl: '6x', py: '1x' }}>
    <Text sx={{ flex: 1, minWidth: 0, color: 'text.secondary' }}>{label}</Text>
    <Text sx={{ flex: 'none', color: 'text.tertiary', fontVariantNumeric: 'tabular-nums' }}>
      {size}
    </Text>
  </Flex>
);

const APP_COLOR_KEY = 'colors._chart.categorical.unpredictable.chartOther';
const LEGEND = [...CATEGORIES, { id: 'app', label: 'App bundle', colorKey: APP_COLOR_KEY }];

const groupByCategory = (files) => ({
  react: files.filter((file) => bucketOf(file) === 'react'),
  emotion: files.filter((file) => bucketOf(file) === 'emotion'),
  tonic: files.filter((file) => bucketOf(file) === 'tonic'),
  other: files.filter((file) => bucketOf(file) === 'other'),
});

const RequestDonut = ({ groups, colors, labels = {}, size = 56 }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const weightOf = (files) => files.reduce((sum, file) => sum + file.decodedKiB, 0);
  const total = CATEGORIES.reduce((sum, { id }) => sum + weightOf(groups[id]), 0);
  let consumed = 0;

  return (
    <Box
      as="svg"
      role="img"
      aria-label={CATEGORIES.map(({ id, label }) => `${labels[id] ?? label} ${weightOf(groups[id]).toFixed(1)} KiB`).join(' | ')}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      sx={{ flex: 'none', display: 'block' }}
    >
      <circle cx="24" cy="24" r={radius} fill="none" stroke="background.high" strokeWidth="8" />
      {CATEGORIES.map(({ id, label }) => {
        const weight = weightOf(groups[id]);
        if (!weight || !total) {
          return null;
        }
        const percent = (weight / total) * 100;
        const length = (weight / total) * circumference;
        const dash = `${length} ${circumference - length}`;
        const offset = -consumed;
        consumed += length;
        return (
          <circle
            key={id}
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke={colors[id]}
            strokeWidth="8"
            strokeDasharray={dash}
            strokeDashoffset={offset}
            transform="rotate(-90 24 24)"
          >
            <title>{`${labels[id] ?? label}: ${weight.toFixed(1)} KiB (${percent.toFixed(1)}%)`}</title>
          </circle>
        );
      })}
    </Box>
  );
};

const RequestsPopover = ({ files, bundledDependencies, bundledComposition, parsedKiB, children }) => {
  const theme = useTheme();
  const { surface, border } = getComparisonTokens(theme);
  const [bucket, setBucket] = useState('all');
  const groups = groupByCategory(files);
  const visible = bucket === 'all'
    ? ['react', 'emotion', 'tonic', 'other'].filter((id) => groups[id].length > 0)
    : [bucket];

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent sx={{ p: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <Box
          sx={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: '3q',
            p: '3x',
            width: 640,
            maxWidth: 'calc(100vw - 32px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.28)',
            textAlign: 'left',
          }}
        >
          <Text sx={{ display: 'block', fontSize: 'lg', fontWeight: 'semibold', mb: '4x' }}>
            Requests ({files.length})
          </Text>
          <Text sx={{ display: 'block', fontSize: 'md', color: 'text.tertiary', mb: '4x' }}>
            {bundledDependencies
              ? 'Fetched before the app mounts, with parsed size. The bundle is tree-shaken to what the app imports.'
              : 'Fetched before the app mounts, with parsed size. CDN wrapper modules and duplicate requests count separately.'}
          </Text>
          {bundledDependencies ? (
            <>
              {files.map((file) => (
                <ListRow key={file.path} left={file.path} right={`${file.decodedKiB} KiB`} />
              ))}
              {compositionRows(bundledComposition, parsedKiB).map((row) => (
                <CompositionRow
                  key={row.key}
                  label={row.label}
                  size={`~${row.sizeKiB} KiB`}
                />
              ))}
            </>
          ) : null}
          {!bundledDependencies && (
            <Flex sx={{ flexWrap: 'wrap', columnGap: '2x', rowGap: '2x', mb: '2x' }}>
              {BUCKETS.map((entry) => {
                const count = entry.id === 'all' ? files.length : groups[entry.id].length;

                return (
                  <FilterChip
                    key={entry.id}
                    selected={bucket === entry.id}
                    onClick={() => setBucket(entry.id)}
                  >
                    {entry.label} ({count})
                  </FilterChip>
                );
              })}
            </Flex>
          )}
          {!bundledDependencies && (
            <Box sx={{ maxHeight: 360, overflowY: 'auto', pr: '2x' }}>
              {visible.map((id) => (
                <Box key={id}>
                  {bucket === 'all' && (
                    <GroupHeading
                      label={BUCKETS.find((entry) => entry.id === id).label}
                      count={groups[id].length}
                    />
                  )}
                  {groups[id].length === 0 ? (
                    <Text sx={{ display: 'block', fontSize: 'md', color: 'text.tertiary', py: '1x' }}>
                      {id === 'emotion'
                        ? 'Emotion is inside the Tonic UI bundle, so it adds no request.'
                        : 'No separate request: this code arrives inside another file.'}
                    </Text>
                  ) : null}
                  {groups[id].map((file) => (
                    <ListRow
                      key={file.path}
                      left={file.path}
                      right={`${file.decodedKiB} KiB`}
                    />
                  ))}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </PopoverContent>
    </Popover>
  );
};

const Stat = ({ label, value, valueNode }) => (
  <Box>
    <Text sx={{ display: 'block', fontSize: 'md', color: 'text.tertiary', mb: '2x' }}>{label}</Text>
    {valueNode ?? (
      <Text
        sx={{
          display: 'block',
          fontSize: 'md',
          fontWeight: 'bold',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </Text>
    )}
  </Box>
);

export default function PerformanceOverview() {
  const theme = useTheme();
  const { panel, recess, border } = getComparisonTokens(theme);
  const provider = providerColors(theme);

  return (
    <Box sx={panel}>
      <SectionHeading
        icon={<ChartBarIcon size="8x" color={provider['esm.sh']} />}
        title="Measurement"
        subtitle="JavaScript requests made before the app mounts, including CDN wrapper modules and duplicate requests. Values are the median of three cold-cache runs; request details come from one sample run."
      />
      <Flex sx={{ flexWrap: 'wrap', alignItems: 'center', columnGap: '6x', rowGap: '2x', mb: '4x' }}>
        {LEGEND.map(({ id, label, colorKey }) => (
          <Flex key={id} sx={{ alignItems: 'center', columnGap: '2x' }}>
            <Box
              aria-hidden="true"
              sx={{ width: '3x', height: '3x', borderRadius: '1q', flex: 'none', background: theme.get(colorKey) }}
            />
            <Text sx={{ fontSize: 'md', color: 'text.secondary', lineHeight: '3x' }}>{label}</Text>
          </Flex>
        ))}
      </Flex>
      <Text sx={{ display: 'block', fontSize: 'sm', color: 'text.secondary', mt: '-2x', mb: '4x' }}>
        The five CDN configurations ship the application as an inline script in{' '}
        <Text as="span" sx={{ display: 'inline', fontFamily: 'mono' }}>index.html</Text>, so it adds no separate request.
      </Text>
      <Stack spacing="2x">
        {pageConfigs.map((config) => {
          const measured = isMeasured(config);
          const files = config.files ?? [];
          const colors = Object.fromEntries(CATEGORIES.map(({ id, colorKey }) => [id, theme.get(colorKey)]));
          const counts = groupByCategory(files);
          if (config.bundledDependencies) {
            // The bundle is application code, not a dependency category.
            counts.app = files;
            counts.other = [];
          }

          return (
            <Grid
              key={config.id}
              data-testid="measurement-row"
              sx={{
                background: recess,
                border: `1px solid ${border}`,
                borderLeft: `4px solid ${theme.get('colors.blue:60')}`,
                borderRadius: '2q',
                px: '3x',
                py: '3x',
                // Fixed fractions: every card has the same width, so the divider
                // and the four stat columns line up across rows.
                gridTemplateColumns: 'minmax(0, 2.2fr) 1px minmax(0, 4fr)',
                columnGap: '4x',
                alignItems: 'center',
                minWidth: 0,
              }}
            >
              <Flex sx={{ alignItems: 'center', columnGap: '3x', minWidth: 0 }}>
                <Box sx={{ width: '12x', height: '12x', flex: 'none' }}>
                  {files.length > 0 ? (
                    <RequestDonut
                      groups={groupByCategory(files)}
                      colors={config.bundledDependencies ? { other: theme.get(APP_COLOR_KEY) } : colors}
                      labels={config.bundledDependencies ? { other: 'Application bundle' } : undefined}
                    />
                  ) : null}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Text sx={{ display: 'block', fontSize: 'md', fontWeight: 'bold', lineHeight: '3x' }}>
                    {plainLabel(config.pageLabel ?? config.label)}
                  </Text>
                  <Flex sx={{ alignItems: 'center', columnGap: '2x', flexWrap: 'wrap', rowGap: '1x', mt: '2x' }}>
                    <Tag data-testid="measurement-provider">{config.provider}</Tag>
                    <Text sx={{ fontSize: 'sm', color: 'text.secondary' }}>
                      {config.bundledDependencies
                        // The bundler ships one file: application code only.
                        ? 'App bundle'
                        : CATEGORIES.map(({ id, label }) => `${label}: ${counts[id]?.length ?? 0}`).join(' | ')}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Box
                aria-hidden="true"
                sx={{ width: '1px', height: '100%', background: border }}
              />
              <Grid
                sx={{
                  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                  columnGap: '4x',
                  rowGap: '2x',
                  minWidth: 0,
                }}
              >
                <Stat
                  label="Requests"
                  value={measured ? num(config.requests) : '—'}
                  valueNode={measured && files.length > 0 ? (
                    <RequestsPopover
                      files={files}
                      bundledDependencies={config.bundledDependencies}
                      bundledComposition={config.bundledComposition}
                      parsedKiB={config.decodedKiB}
                    >
                      <ButtonBase
                        type="button"
                        aria-label={`Show the ${files.length} JavaScript requests`}
                        sx={{
                          display: 'inline-block',
                          p: 0,
                          fontSize: 'md',
                          fontWeight: 'bold',
                          fontVariantNumeric: 'tabular-nums',
                          color: 'text.primary',
                          borderBottom: '1px dotted',
                          borderColor: 'text.tertiary',
                          cursor: 'pointer',
                          _hover: { color: 'blue:60', borderColor: 'blue:60' },
                        }}
                      >
                        {num(config.requests)}
                      </ButtonBase>
                    </RequestsPopover>
                  ) : null}
                />
                <Stat label="Transferred" value={measured ? kiB(config.transferredKiB) : '—'} />
                <Stat label="Decompressed" value={measured ? kiB(config.decodedKiB) : '—'} />
                <Stat
                  label="App ready"
                  value={measured && Number.isFinite(config.readyMs) ? `${config.readyMs} ms` : '—'}
                />
              </Grid>
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
}
