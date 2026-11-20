import { Box } from '@tonic-ui/react';

const App = () => (
  <Box
    fontSize={{ _: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }}
    lineHeight={{ _: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }}
  >
    <Box data-testid="breakpoint-range-base" display={{ _: 'block', sm: 'none' }}>
      <Box mb="1x"><code>base: &lt; 40rem</code></Box>
      Extra small text
    </Box>
    <Box data-testid="breakpoint-range-sm" display={{ _: 'none', sm: 'block', md: 'none' }}>
      <Box mb="1x"><code>sm: 40rem</code></Box>
      Small text
    </Box>
    <Box data-testid="breakpoint-range-md" display={{ _: 'none', md: 'block', lg: 'none' }}>
      <Box mb="1x"><code>md: 48rem</code></Box>
      Medium text
    </Box>
    <Box data-testid="breakpoint-range-lg" display={{ _: 'none', lg: 'block', xl: 'none' }}>
      <Box mb="1x"><code>lg: 64rem</code></Box>
      Large text
    </Box>
    <Box data-testid="breakpoint-range-xl" display={{ _: 'none', xl: 'block', '2xl': 'none' }}>
      <Box mb="1x"><code>xl: 80rem</code></Box>
      Extra large text
    </Box>
    <Box data-testid="breakpoint-range-2xl" display={{ _: 'none', '2xl': 'block' }}>
      <Box mb="1x"><code>2xl: 96rem</code></Box>
      2x extra large text
    </Box>
  </Box>
);

export default App;
