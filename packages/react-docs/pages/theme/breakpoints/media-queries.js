import { Box, useTheme } from '@tonic-ui/react';

const App = () => {
  const { breakpoints } = useTheme();

  return (
    <Box>
      <Box
        data-testid="breakpoint-gte-sm"
        sx={{ display: 'none', [breakpoints.gte('sm')]: { display: 'block' } }}
      >
        gte('sm')
      </Box>
      <Box
        data-testid="breakpoint-lt-sm"
        sx={{ display: 'none', [breakpoints.lt('sm')]: { display: 'block' } }}
      >
        lt('sm')
      </Box>
      <Box
        data-testid="breakpoint-only-md"
        sx={{ display: 'none', [breakpoints.only('md')]: { display: 'block' } }}
      >
        only('md')
      </Box>
      <Box
        data-testid="breakpoint-between-sm-md"
        sx={{ display: 'none', [breakpoints.between('sm', 'md')]: { display: 'block' } }}
      >
        between('sm', 'md')
      </Box>
      <Box
        data-testid="breakpoint-composed-sx"
        sx={[
          { color: [null, null, 'red'] },
          { width: [null, '50%', '100%'] },
        ]}
      >
        Composed styles: half width below sm, full width from sm
      </Box>
      <Box
        data-testid="breakpoint-explicit-sx"
        sx={[
          { color: [null, 'blue', 'red'] },
          { [breakpoints.gte('sm')]: { width: '100%' } },
          { [breakpoints.gte('xs')]: { width: '50%' } },
        ]}
      >
        Merged breakpoint rules: half width below sm, full width from sm
      </Box>
      <Box
        data-testid="breakpoint-specificity-override"
        sx={{
          color: [null, 'blue', 'red'],
          [breakpoints.gte('sm')]: { width: '100%' },
          '&&': { width: '50%' },
        }}
      >
        Higher selector specificity keeps this at half width
      </Box>
    </Box>
  );
};

export default App;
