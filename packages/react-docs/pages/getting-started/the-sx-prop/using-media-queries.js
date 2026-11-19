import { Box, Text, useTheme } from '@tonic-ui/react';

const App = () => {
  const { breakpoints } = useTheme();

  return (
    <Box
      fontSize="md"
      lineHeight="md"
      sx={{
        [breakpoints.up('sm')]: {
          fontSize: 'lg',
          lineHeight: 'lg',
        },
        [breakpoints.up('md')]: {
          fontSize: 'xl',
          lineHeight: 'xl',
        },
        [breakpoints.up('lg')]: {
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
