import { Box } from '@tonic-ui/react';

const App = () => (
  <Box
    fontSize={{
      _: 'md', // default
      sm: 'sm', // @media screen and (min-width: 320px)
      md: 'md', // @media screen and (min-width: 744px)
      lg: 'lg', // @media screen and (min-width: 1440px)
      xl: 'xl', // @media screen and (min-width: 1680px)
      '2xl': '2xl', // @media screen and (min-width: 1920px)
    }}
    lineHeight={{
      _: 'md', // default
      sm: 'sm', // @media screen and (min-width: 320px)
      md: 'md', // @media screen and (min-width: 744px)
      lg: 'lg', // @media screen and (min-width: 1440px)
      xl: 'xl', // @media screen and (min-width: 1680px)
      '2xl': '2xl', // @media screen and (min-width: 1920px)
    }}
  >
    <Box display={{ _: 'none', sm: 'block', md: 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 320px)</code></Box>
      Small Text
    </Box>
    <Box display={{ _: 'none', md: 'block', lg: 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 744px)</code></Box>
      Medium Text
    </Box>
    <Box display={{ _: 'none', lg: 'block', xl: 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 1440px)</code></Box>
      Large Text
    </Box>
    <Box display={{ _: 'none', xl: 'block', '2xl': 'none' }}>
      <Box mb="1x"><code>@media screen and (min-width: 1680px)</code></Box>
      Extra Large Text
    </Box>
    <Box display={{ _: 'none', '2xl': 'block' }}>
      <Box mb="1x"><code>@media screen and (min-width: 1920px)</code></Box>
      Double Extra Large Text
    </Box>
  </Box>
);

export default App;
