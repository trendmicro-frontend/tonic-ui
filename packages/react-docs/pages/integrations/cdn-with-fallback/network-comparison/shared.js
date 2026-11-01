import { Box, ButtonBase, Flex, Text, Tooltip } from '@tonic-ui/react';
import { InfoOIcon } from '@tonic-ui/react-icons';

// One colour per delivery provider, so the same provider reads the same way in
// every chart on the page.
export const providerColors = (theme) => ({
  'esm.sh': theme.get('colors._chart.categorical.unpredictable.chart-1'),
  jsDelivr: theme.get('colors._chart.categorical.unpredictable.chart-2'),
  'Self-hosted': theme.get('colors._chart.categorical.unpredictable.chart-3'),
  'esm.sh + jsDelivr': theme.get('colors._chart.categorical.unpredictable.chart-4'),
});

export const getComparisonTokens = (theme) => {
  const series = [1, 2, 3].map((index) => (
    theme.get(`colors._chart.categorical.unpredictable.chart-${index}`)
  ));
  const family = {
    'Tonic UI bundle (merged dependencies)': theme.get('colors._chart.categorical.unpredictable.chart-8'),
    'Tonic UI packages': theme.get('colors._chart.categorical.unpredictable.chart-9'),
    'React / React DOM': theme.get('colors._chart.categorical.unpredictable.chart-3'),
    Emotion: theme.get('colors._chart.categorical.unpredictable.chart-1'),
    'Other dependencies': theme.get('colors._chart.categorical.unpredictable.chart-14'),
  };
  const surface = theme.get('colors.background.highest');
  const border = theme.get('colors.border.subtle');

  return {
    series,
    family,
    surface,
    recess: theme.get('colors.background.high'),
    border,
    ink: theme.get('colors.text.primary'),
    muted: theme.get('colors.text.secondary'),
    faint: theme.get('colors.text.tertiary'),
    panel: {
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: '3q',
      p: '4x',
    },
  };
};

export const SectionHeading = ({
  icon,
  title,
  subtitle,
  level = 'h3',
  titleSize = '3xl',
  aside,
}) => (
  <Flex
    sx={{
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      columnGap: '4x',
      rowGap: '3x',
      mb: '4x',
    }}
  >
    <Flex sx={{ alignItems: 'center', columnGap: '3x', minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 'none' }}>{icon}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Text as={level} sx={{ display: 'block', fontSize: titleSize, fontWeight: 'bold', lineHeight: 1.1 }}>
          {title}
        </Text>
        <Text sx={{ display: 'block', fontSize: 'md', color: 'text.secondary', mt: '1x' }}>
          {subtitle}
        </Text>
      </Box>
    </Flex>
    {aside}
  </Flex>
);

export const InfoButton = ({ label, color }) => (
  <Tooltip label={label}>
    <ButtonBase
      type="button"
      aria-label={label}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        color,
        p: '1x',
        borderRadius: '2q',
      }}
    >
      <InfoOIcon size="4x" />
    </ButtonBase>
  </Tooltip>
);

export const LayersGlyph = ({ size = 40, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="m12 2.75 9 5.1-9 5.15-9-5.15 9-5.1Z" />
    <path d="m3 12 9 5.15L21 12M3 16.15l9 5.1 9-5.1" />
  </svg>
);

export const CubeGlyph = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="m12 2.75 8.5 4.75v9.1L12 21.25l-8.5-4.65V7.5L12 2.75Z" />
    <path d="m3.5 7.5 8.5 4.8 8.5-4.8M12 12.3v8.95" />
  </svg>
);
