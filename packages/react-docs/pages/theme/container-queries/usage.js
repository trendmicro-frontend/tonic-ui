import { Box, Text, useTheme } from '@tonic-ui/react';

const App = () => {
  const { containerQueries } = useTheme();
  const wideLayout = containerQueries.gte(12);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4x' }}>
      {[144, 240].map(width => (
        <Box key={width} sx={{ width: `${width}px`, maxWidth: '100%', containerType: 'inline-size' }}>
          <Text sx={{ mb: '1x', fontSize: 'sm', fontWeight: 'semibold' }}>
            {width === 144 ? 'Narrow' : 'Wide'} ({width} px)
          </Text>
          <Box
            data-testid={`profile-card-${width}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3x',
              p: '3x',
              border: '1px solid',
              borderColor: 'border.secondary',
              borderRadius: 'sm',
              backgroundColor: 'background.high',
              [wideLayout]: { flexDirection: 'row', alignItems: 'center' },
            }}
          >
            <Box
              aria-hidden="true"
              sx={{ display: 'grid', placeItems: 'center', minHeight: '64px', minWidth: '88px', backgroundColor: 'background.low', borderRadius: 'sm', fontSize: 'xl' }}
            >
              MC
            </Box>
            <Box>
              <Text sx={{ fontWeight: 'semibold' }}>Maya Chen</Text>
              <Text sx={{ color: 'text.secondary' }}>Product designer</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default App;
