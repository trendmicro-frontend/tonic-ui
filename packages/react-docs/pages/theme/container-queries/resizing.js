import { useState } from 'react';
import { Box, Button, Input, Text, TextLabel, useTheme } from '@tonic-ui/react';

const WIDTH_PRESETS = [299, 300, 640, 768];

const App = () => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('299');
  const [width, setWidth] = useState(299);

  const applyWidth = (value) => {
    setInputValue(value);
    const nextWidth = Number(value);
    if (value !== '' && Number.isFinite(nextWidth) && nextWidth >= 200 && nextWidth <= 900) {
      setWidth(nextWidth);
    }
  };
  const handleWidthChange = (event) => applyWidth(event.target.value);
  const handlePresetClick = (event) => applyWidth(event.currentTarget.value);

  const unnamedQuery = theme.containerQueries.gte(18.75);
  const sidebarQueries = theme.containerQueries('sidebar');

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
        <Box role="group" aria-label="Width presets" sx={{ display: 'flex', flexWrap: 'wrap', gap: '1x' }}>
          {WIDTH_PRESETS.map(preset => (
            <Button
              key={preset}
              type="button"
              size="sm"
              variant={width === preset ? 'primary' : 'secondary'}
              aria-pressed={width === preset}
              value={preset}
              onClick={handlePresetClick}
            >
              {preset} px
            </Button>
          ))}
        </Box>
      </Box>
      <Text sx={{ color: 'text.secondary' }}>
        Resize the sidebar to see how the build summary adapts. The viewport stays the same.
      </Text>
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          data-testid="query-sidebar"
          sx={{
            width: `${width}px`,
            containerType: 'inline-size',
            containerName: 'sidebar',
            backgroundColor: 'background.low',
            outline: '1px solid',
            outlineColor: 'border.secondary',
            outlineOffset: '-1px',
          }}
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
                [sidebarQueries.gte(18.75)]: { flexDirection: 'row' },
              }}
            >
              <Box
                data-testid="query-card-first"
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  minHeight: '56px',
                  flex: '0 0 56px',
                  borderRadius: 'sm',
                  backgroundColor: 'background.low',
                  color: 'text.primary',
                  fontSize: 'lg',
                  fontWeight: 'semibold',
                }}
              >
                CI
              </Box>
              <Box data-testid="query-card-second" sx={{ flex: '1 1 auto', minWidth: 0 }}>
                <Text sx={{ fontWeight: 'semibold', color: 'text.primary' }}>Docs build</Text>
                <Text sx={{ fontSize: 'sm', color: 'text.secondary' }}>Passed · 8 checks</Text>
              </Box>
            </Box>
            <Box
              data-testid="query-unnamed"
              sx={{ display: 'none', [unnamedQuery]: { display: 'block' }, color: 'text.primary' }}
            >
              Unnamed query measuring the card: at least 18.75rem (300px at a 16px root)
            </Box>
            <Box
              data-testid="query-lt-300"
              sx={{ display: 'none', [sidebarQueries.lt(18.75)]: { display: 'block' }, color: 'text.primary' }}
            >
              Sidebar is below 18.75rem
            </Box>
            <Box
              data-testid="query-between-300-and-sm"
              sx={{ display: 'none', [sidebarQueries.between(18.75, 'sm')]: { display: 'block' }, color: 'text.primary' }}
            >
              Sidebar is at least 18.75rem and below 40rem
            </Box>
            <Box
              data-testid="query-only-sm"
              sx={{ display: 'none', [sidebarQueries.only('sm')]: { display: 'block' }, color: 'text.primary' }}
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
