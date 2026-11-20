import { Box, Text, useTheme } from '@tonic-ui/react';

const App = () => {
  const { breakpoints } = useTheme();

  return (
    <Box
      fontSize="md"
      lineHeight="md"
      sx={{
        [breakpoints.gte('sm')]: {
          fontSize: 'lg',
          lineHeight: 'lg',
        },
        [breakpoints.gte('md')]: {
          fontSize: 'xl',
          lineHeight: 'xl',
        },
        [breakpoints.gte('lg')]: {
          fontSize: '2xl',
          lineHeight: '2xl',
        },
      }}
    >
      <Text>
        This text scales with the screen width
      </Text>
    </Box>
  );
};

export default App;
