import { Box, Flex, Text } from '@tonic-ui/react';

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
    <Flex sx={{ alignItems: 'flex-start', columnGap: '3x', minWidth: 0 }}>
      <Flex sx={{ flex: 'none', display: 'inline-flex', alignItems: 'center' }}>
        {icon}
      </Flex>
      <Box sx={{ minWidth: 0 }}>
        <Text as={level} sx={{ fontSize: titleSize, fontWeight: 'bold', lineHeight: 1.1, mt: 0, mb: 0 }}>
          {title}
        </Text>
        {subtitle ? (
          <Text sx={{ fontSize: 'md', color: 'text.secondary', mt: '1x' }}>
            {subtitle}
          </Text>
        ) : null}
      </Box>
    </Flex>
    {aside}
  </Flex>
);
