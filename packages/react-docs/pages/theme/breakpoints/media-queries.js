import { Box, useTheme } from '@tonic-ui/react';

const App = () => {
  const { breakpoints } = useTheme();

  return (
    <Box>
      <Box
        data-testid="breakpoint-up-sm"
        sx={{ display: 'none', [breakpoints.up('sm')]: { display: 'block' } }}
      >
        up('sm')
      </Box>
      <Box
        data-testid="breakpoint-down-sm"
        sx={{ display: 'none', [breakpoints.down('sm')]: { display: 'block' } }}
      >
        down('sm')
      </Box>
      <Box
        data-testid="breakpoint-only-md"
        sx={{ display: 'none', [breakpoints.only('md')]: { display: 'block' } }}
      >
        only('md')
      </Box>
      <Box
        data-testid="breakpoint-not-md"
        sx={{ display: 'none', [breakpoints.not('md')]: { display: 'block' } }}
      >
        not('md')
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
          { [breakpoints.up('sm')]: { width: '100%' } },
          { [breakpoints.up('xs')]: { width: '50%' } },
        ]}
      >
        Explicit media rules: the last matching rule keeps this at half width
      </Box>
    </Box>
  );
};

export default App;
