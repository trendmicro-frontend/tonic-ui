import { Box, Text, useTheme } from '@tonic-ui/react';

const photos = [
  ['Alpine lake', '#9dcfdb', '#315c69'],
  ['Desert ridge', '#f5d3a4', '#aa603a'],
  ['Forest trail', '#bcd5ac', '#395f50'],
  ['Coastal bluff', '#a8c6e8', '#38598b'],
  ['Sunset valley', '#e7a4a6', '#79506a'],
  ['Winter peak', '#c9cee4', '#5a6888'],
];

const App = () => {
  const { breakpoints, containerQueries } = useTheme();
  const wideLayout = containerQueries.gte(14);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6x',
        [breakpoints.gte('md')]: { flexDirection: 'row' },
      }}
    >
      {[['Sidebar', 192], ['Main area', 384]].map(([label, width]) => (
        <Box key={width} sx={{ width: `${width}px`, maxWidth: '100%', containerType: 'inline-size' }}>
          <Text sx={{ mb: '2x', fontSize: 'sm', fontWeight: 'semibold' }}>
            {label}
          </Text>
          <Box
            role="list"
            aria-label="Travel gallery"
            data-testid={`gallery-grid-${width}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2x',
              [wideLayout]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
            }}
          >
            {photos.map(([name, sky, ground]) => (
              <Box key={name} role="listitem">
                <Box
                  as="svg"
                  role="img"
                  aria-label={name}
                  viewBox="0 0 96 56"
                  preserveAspectRatio="xMidYMid slice"
                  sx={{ display: 'block', width: '100%', height: '56px', borderRadius: 'sm' }}
                >
                  <path fill={sky} d="M0 0h96v56H0z" />
                  <circle fill="#fff5dc" cx="69" cy="15" r="7" />
                  <path fill={ground} d="M0 56V45L28 14l20 23 16-13 32 23v9z" />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default App;
