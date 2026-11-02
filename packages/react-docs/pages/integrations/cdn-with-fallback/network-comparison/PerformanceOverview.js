import { useState } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useTheme,
} from '@tonic-ui/react';
import { ChartBarIcon, InfoOIcon } from '@tonic-ui/react-icons';
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

const ListRow = ({ left, right }) => (
  <Flex sx={{ columnGap: '3x', justifyContent: 'space-between', py: '1x' }}>
    <Text sx={{ fontSize: 'xs', wordBreak: 'break-all', lineHeight: 1.5 }}>{left}</Text>
    <Text sx={{ fontSize: 'xs', flex: 'none', fontVariantNumeric: 'tabular-nums', lineHeight: 1.5 }}>
      {right}
    </Text>
  </Flex>
);

const GroupHeading = ({ label, count }) => (
  <Text
    sx={{
      display: 'block',
      fontSize: 'xs',
      fontWeight: 'bold',
      color: 'text.tertiary',
      mt: '2x',
      mb: '1x',
    }}
  >
    {label} ({count})
  </Text>
);

const RequestsPopover = ({ files }) => {
  const theme = useTheme();
  const { surface, border } = getComparisonTokens(theme);
  const [bucket, setBucket] = useState('all');
  const groups = {
    react: files.filter((file) => bucketOf(file) === 'react'),
    emotion: files.filter((file) => bucketOf(file) === 'emotion'),
    tonic: files.filter((file) => bucketOf(file) === 'tonic'),
    other: files.filter((file) => bucketOf(file) === 'other'),
  };
  const visible = bucket === 'all'
    ? ['react', 'emotion', 'tonic', 'other'].filter((id) => groups[id].length > 0)
    : [bucket];

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <ButtonBase
          type="button"
          aria-label={`Show the ${files.length} JavaScript requests`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
            color: 'text.tertiary',
            p: '0 1x',
            borderRadius: '2q',
          }}
        >
          <InfoOIcon size="3x" />
        </ButtonBase>
      </PopoverTrigger>
      <PopoverContent sx={{ p: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <Box
          sx={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: '3q',
            p: '3x',
            width: 460,
            maxWidth: 'calc(100vw - 32px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.28)',
          }}
        >
          <Text sx={{ display: 'block', fontSize: 'md', fontWeight: 'bold' }}>
            JavaScript requests ({files.length})
          </Text>
          <Text sx={{ display: 'block', fontSize: 'xs', color: 'text.tertiary', mb: '2x' }}>
            Fetched before the app mounts, with parsed size. CDN wrapper modules and duplicate
            requests count separately.
          </Text>
          <Flex sx={{ flexWrap: 'wrap', columnGap: '2x', rowGap: '2x', mb: '2x' }}>
            {BUCKETS.map((entry) => {
              const count = entry.id === 'all' ? files.length : groups[entry.id].length;

              return (
                <Button
                  key={entry.id}
                  type="button"
                  size="sm"
                  variant="secondary"
                  selected={bucket === entry.id}
                  aria-pressed={bucket === entry.id}
                  onClick={() => setBucket(entry.id)}
                >
                  {entry.label} ({count})
                </Button>
              );
            })}
          </Flex>
          <Box sx={{ maxHeight: 320, overflowY: 'auto', pr: '3x' }}>
            {visible.map((id) => (
              <Box key={id}>
                {bucket === 'all' && (
                  <GroupHeading
                    label={BUCKETS.find((entry) => entry.id === id).label}
                    count={groups[id].length}
                  />
                )}
                {groups[id].length === 0 ? (
                  <Text sx={{ display: 'block', fontSize: 'xs', color: 'text.tertiary', py: '1x' }}>
                    {id === 'emotion'
                      ? 'Emotion is inside the Tonic UI bundle, so it adds no request.'
                      : 'No separate request: this code arrives inside another file.'}
                  </Text>
                ) : null}
                {groups[id].map((file) => (
                  <ListRow key={file.path} left={file.path} right={`${file.decodedKiB} KiB`} />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

const Stat = ({ label, value, info }) => (
  <Box>
    <Flex sx={{ alignItems: 'center', columnGap: '1x' }}>
      <Text sx={{ fontSize: 'xs', color: 'text.tertiary' }}>{label}</Text>
      {info}
    </Flex>
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
  </Box>
);

export default function PerformanceOverview() {
  const theme = useTheme();
  const { panel, recess, border, faint } = getComparisonTokens(theme);
  const provider = providerColors(theme);

  return (
    <Box sx={panel}>
      <SectionHeading
        icon={<ChartBarIcon size="8x" color={provider['esm.sh']} />}
        title="Measured cost"
        subtitle="JavaScript requests made before the app mounts, including CDN wrapper modules and duplicate requests. Values are the median of three cold-cache runs; request details come from one sample run."
      />
      <Stack spacing="3x">
        {pageConfigs.map((config) => {
          const color = provider[config.provider] ?? faint;
          const measured = isMeasured(config);
          const files = config.files ?? [];

          return (
            <Box
              key={config.id}
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
                <Text sx={{ fontSize: 'md', fontWeight: 'bold' }}>
                  {plainLabel(config.pageLabel ?? config.label)}
                </Text>
                <Text sx={{ fontSize: 'xs', color: faint }}>{config.provider}</Text>
              </Flex>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  columnGap: '4x',
                  rowGap: '2x',
                  mt: '2x',
                }}
              >
                <Stat
                  label="Requests"
                  value={measured ? num(config.requests) : '—'}
                  info={measured && files.length > 0 ? <RequestsPopover files={files} /> : null}
                />
                <Stat label="Transferred" value={measured ? kiB(config.transferredKiB) : '—'} />
                <Stat label="Decoded JS" value={measured ? kiB(config.decodedKiB) : '—'} />
                <Stat
                  label="Largest file"
                  value={measured ? `${kiB(config.largestFileKiB)} (${config.largestFileShare}%)` : '—'}
                />
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
