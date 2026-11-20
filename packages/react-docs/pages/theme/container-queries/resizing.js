import { useState } from 'react';
import { Box, Input, Text, TextLabel, useTheme } from '@tonic-ui/react';

const App = () => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('299');
  const [width, setWidth] = useState(299);

  const handleWidthChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const nextWidth = Number(value);
    if (value !== '' && Number.isFinite(nextWidth) && nextWidth >= 200 && nextWidth <= 900) {
      setWidth(nextWidth);
    }
  };

  const unnamedQuery = theme.containerQueries.gte(18.75);

  return (
    <Box data-testid="container-query-demo" sx={{ display: 'flex', flexDirection: 'column', gap: '3x', minWidth: 0 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1x' }}>
        <TextLabel htmlFor="container-query-width">Container width (px)</TextLabel>
        <Input
          id="container-query-width"
          type="number"
          step="any"
          min={200}
          max={900}
          value={inputValue}
          onChange={handleWidthChange}
          sx={{ width: '160px' }}
        />
      </Box>
      <Text sx={{ color: 'text.secondary' }}>
        The card changes to a row at 18.75rem (300px with a 16px root). The sidebar sm range is 40rem to below 48rem (640px to below 768px).
      </Text>
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          data-testid="query-sidebar"
          sx={{ width: `${width}px`, containerType: 'inline-size', containerName: 'sidebar', backgroundColor: 'background.low' }}
        >
          <Box
            data-testid="query-unnamed-outer"
            sx={{ display: 'none', [unnamedQuery]: { display: 'block' }, color: 'text.primary' }}
          >
            Unnamed query measuring the sidebar: at least 18.75rem (300px at a 16px root)
          </Box>
          <Box
            data-testid="query-card-container"
            sx={{ width: '200px', containerType: 'inline-size', containerName: 'card' }}
          >
            <Box
              data-testid="query-card"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2x',
                p: '2x',
                boxSizing: 'border-box',
                border: '1px solid',
                borderColor: 'border.secondary',
                borderRadius: 'sm',
                backgroundColor: 'background.high',
                [theme.containerQueries('sidebar').gte(18.75)]: { flexDirection: 'row' },
              }}
            >
              <Box data-testid="query-card-first" sx={{ flex: '1 1 0', minWidth: 0, p: '2x', borderRadius: 'sm', backgroundColor: 'background.low', color: 'text.primary' }}>
                First item
              </Box>
              <Box data-testid="query-card-second" sx={{ flex: '1 1 0', minWidth: 0, p: '2x', borderRadius: 'sm', backgroundColor: 'background.low', color: 'text.primary' }}>
                Second item
              </Box>
            </Box>
            <Box
              data-testid="query-unnamed"
              sx={{ display: 'none', [unnamedQuery]: { display: 'block' }, color: 'text.primary' }}
            >
              Unnamed query measuring the card: at least 18.75rem (300px at a 16px root)
            </Box>
            <Box
              data-testid="query-only-sm"
              sx={{ display: 'none', [theme.containerQueries('sidebar').only('sm')]: { display: 'block' }, color: 'text.primary' }}
            >
              Sidebar sm: 40rem inclusive to 48rem exclusive (640px to below 768px at a 16px root)
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
