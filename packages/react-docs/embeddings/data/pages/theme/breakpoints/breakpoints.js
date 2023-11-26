import { Box } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box
    fontSize={{
      _: 'md', // default
      sm: 'sm', // @media screen and (min-width: 320px)
      md: 'md', // @media screen and (min-width: 640px)
      lg: 'lg', // @media screen and (min-width: 1024px)
      xl: 'xl', // @media screen and (min-width: 1280px)
      '2xl': '2xl', // @media screen and (min-width: 1680px)
    }}
    lineHeight={{
      _: 'md', // default
      sm: 'sm', // @media screen and (min-width: 320px)
      md: 'md', // @media screen and (min-width: 640px)
      lg: 'lg', // @media screen and (min-width: 1024px)
      xl: 'xl', // @media screen and (min-width: 1280px)
      '2xl': '2xl', // @media screen and (min-width: 1680px)
    }}
  >
    <Box display={{ _: 'none', sm: 'block', md: 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 320px)</code></Box>
      Small Text
    </Box>
    <Box display={{ _: 'none', md: 'block', lg: 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 640px)</code></Box>
      Medium Text
    </Box>
    <Box display={{ _: 'none', lg: 'block', xl: 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 1024px)</code></Box>
      Large Text
    </Box>
    <Box display={{ _: 'none', xl: 'block', '2xl': 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 1280px)</code></Box>
      Extra Large Text
    </Box>
    <Box display={{ _: 'none', '2xl': 'block' }}>
      <Box mb="1x"><code>@media screen and (min-width: 1680px)</code></Box>
      Double Extra Large Text
    </Box>
  </Box>
);

export default App;
