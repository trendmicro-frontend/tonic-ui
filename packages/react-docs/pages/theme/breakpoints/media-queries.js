import { Box, useTheme } from '@tonic-ui/react';

const App = () => {
  const { breakpoints } = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap="3x">
      <Box color="text.secondary" fontSize="sm">Active media queries</Box>
      <Box display="flex" flexWrap="wrap" gap="2x">
        <Box
          data-testid="breakpoint-gte-sm"
          sx={{ display: 'none', [breakpoints.gte('sm')]: { display: 'block' }, backgroundColor: 'background.high', borderRadius: 'sm', px: '3x', py: '1x' }}
        >
          gte('sm')
        </Box>
        <Box
          data-testid="breakpoint-lt-sm"
          sx={{ display: 'none', [breakpoints.lt('sm')]: { display: 'block' }, backgroundColor: 'background.high', borderRadius: 'sm', px: '3x', py: '1x' }}
        >
          lt('sm')
        </Box>
        <Box
          data-testid="breakpoint-only-md"
          sx={{ display: 'none', [breakpoints.only('md')]: { display: 'block' }, backgroundColor: 'background.high', borderRadius: 'sm', px: '3x', py: '1x' }}
        >
          only('md')
        </Box>
        <Box
          data-testid="breakpoint-between-sm-md"
          sx={{ display: 'none', [breakpoints.between('sm', 'md')]: { display: 'block' }, backgroundColor: 'background.high', borderRadius: 'sm', px: '3x', py: '1x' }}
        >
          between('sm', 'md')
        </Box>
      </Box>
      <Box color="text.secondary" fontSize="sm">Responsive panel widths</Box>
      <Box
        data-testid="breakpoint-composed-sx"
        sx={[
          { backgroundColor: 'background.high', borderRadius: 'sm', px: '3x', py: '2x', boxSizing: 'border-box' },
          { width: '100%', [breakpoints.gte('sm')]: { width: '50%', color: 'text.secondary' }, [breakpoints.gte('md')]: { width: '100%', color: 'text.primary' } },
        ]}
      >
        Array composition
      </Box>
      <Box
        data-testid="breakpoint-explicit-sx"
        sx={[
          { width: '100%', backgroundColor: 'background.high', borderRadius: 'sm', px: '3x', py: '2x', boxSizing: 'border-box', [breakpoints.gte('sm')]: { color: 'text.secondary' } },
          { [breakpoints.gte('sm')]: { width: '50%' } },
          { [breakpoints.gte('md')]: { width: '100%', color: 'text.primary' } },
        ]}
      >
        Merged media rules
      </Box>
      <Box
        data-testid="breakpoint-specificity-override"
        sx={{
          [breakpoints.gte('sm')]: { color: 'text.secondary' },
          backgroundColor: 'background.high',
          borderRadius: 'sm',
          px: '3x',
          py: '2x',
          boxSizing: 'border-box',
          [breakpoints.gte('md')]: { width: '100%', color: 'text.primary' },
          '&&': { width: '50%' },
        }}
      >
        Specificity override
      </Box>
    </Box>
  );
};

export default App;
