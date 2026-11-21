import { Box, Code, Text, useTheme } from '@tonic-ui/react';

const widgets = [
  ['Orders', '128'],
  ['Revenue', '$2,560'],
  ['Visitors', '1,024'],
];

const ranges = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

const App = () => {
  const { breakpoints } = useTheme();

  return (
    <Box>
      <Text sx={{ fontWeight: 'semibold' }}>Store dashboard</Text>
      <Box sx={{ mb: '2x', color: 'text.secondary', fontSize: 'sm' }}>
        {ranges.map((range) => (
          <Box
            key={range}
            data-testid={`breakpoint-range-${range}`}
            sx={{
              display: 'none',
              [range === 'base' ? breakpoints.lt('sm') : breakpoints.only(range)]: { display: 'block' },
            }}
          >
            Active breakpoint: <Code>{range}</Code>
          </Box>
        ))}
      </Box>
      <Box
        aria-label="Store metrics"
        role="list"
        sx={{
          display: 'grid',
          gap: '2x',
          gridTemplateColumns: 'minmax(0, 1fr)',
          [breakpoints.gte('md')]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
          [breakpoints.gte('lg')]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {widgets.map(([label, value]) => (
          <Box
            key={label}
            role="listitem"
            sx={{ px: '3x', py: '2x', backgroundColor: 'background.high', borderRadius: 'sm' }}
          >
            <Text sx={{ color: 'text.secondary', fontSize: 'sm' }}>{label}</Text>
            <Text sx={{ fontWeight: 'semibold' }}>{value}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;
