import React, { useCallback, useState } from 'react';
import { Box, Input, useTheme } from '../../../../src';

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
    </>
  );
};

export default ContainerQueriesFixture;
