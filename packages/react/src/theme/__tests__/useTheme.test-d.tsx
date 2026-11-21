import React from 'react';
import { useTheme, Box, createTheme } from '@tonic-ui/react';

const layoutTheme = createTheme({ breakpoints: { values: { mobile: 0, tablet: 640 } } });

function UseLayoutTheme() {
  const { breakpoints, containerQueries } = useTheme<(typeof layoutTheme.breakpoints.keys)[number]>();
  // @ts-expect-error This provider's theme does not define md.
  containerQueries.only('md');
  return <Box width={{ _: '100%', tablet: '50%' }} sx={{ [breakpoints.gte('tablet')]: { display: 'flex' } }} />;
}

// Access resolved color tokens
function UseThemeColors() {
  const theme = useTheme();
  const query: string = theme.breakpoints.between('sm', '1000rem');
  const directContainerQuery: string = theme.containerQueries.gte('xs');
  const namedContainerQuery: string = theme.containerQueries('sidebar').between('18.75rem', 'md');
  // @ts-expect-error Named container queries also require explicit units.
  theme.containerQueries('sidebar').between(18.75, 'md');
  // @ts-expect-error No public negation helper.
  theme.breakpoints.not('md');
  // @ts-expect-error Cannot replace the breakpoint snapshot.
  theme.breakpoints = createTheme().breakpoints;
  return (
    <Box
      sx={{ [query]: { display: 'block' }, [directContainerQuery]: { display: 'none' }, [namedContainerQuery]: { display: 'flex' } }}
      color={theme.colors.text.primary}
      backgroundColor={theme.colors.background.primary}
    >
      Themed text
    </Box>
  );
}

// Access theme scales
function UseThemeScales() {
  const theme = useTheme();
  return (
    <Box
      fontSize={theme.fontSizes.md}
      padding={theme.space['4x']}
      borderRadius={theme.radii.sm}
      fontWeight={theme.fontWeights.semibold}
      lineHeight={theme.lineHeights.normal}
      fontFamily={theme.fonts.base}
    >
      Scaled box
    </Box>
  );
}

// Use the .get() helper
function UseThemeGet() {
  const theme = useTheme();
  return (
    <Box
      color={theme.get('colors.red.600')}
    >
      Via get()
    </Box>
  );
}
