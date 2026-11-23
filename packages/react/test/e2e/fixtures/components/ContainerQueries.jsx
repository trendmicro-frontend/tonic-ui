import React, { useCallback, useState } from 'react';
import { Box, Input, TonicProvider, createTheme, useTheme } from '../../../../src';

const deviceTheme = createTheme({ breakpoints: { values: { mobile: 0, tablet: 640, desktop: 1024 } } });

const responsiveChannelSx = () => [{ width: { tablet: '160px', sm: '300px' } }];

const ContainerQueriesFixture = () => {
  const { containerQueries } = useTheme();
  const [width, setWidth] = useState('299');
  const handleWidthChange = useCallback((event) => setWidth(event.target.value), []);
  const outer = containerQueries('outer');

  return (
    <>
      <Input aria-label="Outer width (px)" type="number" step="any" value={width} onChange={handleWidthChange} />
      <Box data-testid="outer-container" sx={{ containerType: 'inline-size', containerName: 'outer', width: `${width}px` }}>
        <Box data-testid="inner-container" sx={{ containerType: 'inline-size', width: '200px' }}>
          <Box data-testid="named-gte" sx={{ display: 'none', [outer.gte('18.75rem')]: { display: 'block' } }}>Named minimum</Box>
          <Box data-testid="unnamed-gte" sx={{ display: 'none', [containerQueries.gte('18.75rem')]: { display: 'block' } }}>Unnamed minimum</Box>
          <Box data-testid="named-lt" sx={{ display: 'none', [outer.lt('18.75rem')]: { display: 'block' } }}>Below minimum</Box>
          <Box data-testid="named-between" sx={{ display: 'none', [outer.between('18.75rem', 'sm')]: { display: 'block' } }}>Between minimum and sm</Box>
          <Box data-testid="named-only" sx={{ display: 'none', [outer.only('sm')]: { display: 'block' } }}>In sm range</Box>
        </Box>
      </Box>
      <TonicProvider theme={deviceTheme}>
        {/* eslint-disable @tonic-ui/no-flat-style-props -- Deliberate flat-prop coverage; the test asserts flat breakpoint maps. */}
        <Box data-testid="device-display" display={{ _: 'block', tablet: 'flex', sm: 'none' }}>Device layout</Box>
        <Box
          data-testid="responsive-channels"
          __sx={{ width: { _: '100px', tablet: '120px' }, minHeight: { base: '10px', tablet: '20px' } }}
          height={{ _: '30px', tablet: '40px' }}
          sx={responsiveChannelSx}
        />
        {/* eslint-enable @tonic-ui/no-flat-style-props */}
      </TonicProvider>
    </>
  );
};

export default ContainerQueriesFixture;
