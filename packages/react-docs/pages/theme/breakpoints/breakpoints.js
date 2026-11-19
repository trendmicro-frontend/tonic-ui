import { Box } from '@tonic-ui/react';

const App = () => (
  <Box
    fontSize={{ _: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
    lineHeight={{ _: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
  >
    <Box data-testid="breakpoint-range-xs" display={{ _: 'block', sm: 'none' }}>
      <Box mb="1x"><code>xs: 0px</code></Box>
      Extra small text
    </Box>
    <Box data-testid="breakpoint-range-sm" display={{ _: 'none', sm: 'block', md: 'none' }}>
      <Box mb="1x"><code>sm: 600px</code></Box>
      Small text
    </Box>
    <Box data-testid="breakpoint-range-md" display={{ _: 'none', md: 'block', lg: 'none' }}>
      <Box mb="1x"><code>md: 900px</code></Box>
      Medium text
    </Box>
    <Box data-testid="breakpoint-range-lg" display={{ _: 'none', lg: 'block', xl: 'none' }}>
      <Box mb="1x"><code>lg: 1200px</code></Box>
      Large text
    </Box>
    <Box data-testid="breakpoint-range-xl" display={{ _: 'none', xl: 'block' }}>
      <Box mb="1x"><code>xl: 1536px</code></Box>
      Extra large text
    </Box>
  </Box>
);

export default App;
