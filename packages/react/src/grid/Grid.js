import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const Grid = forwardRef((inProps, ref) => {
  const {
    gap,
    rowGap,
    columnGap,
    column,
    row,
    area,
    autoFlow,
    autoRows,
    autoColumns,
    templateRows,
    templateColumns,
    templateAreas,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Grid' });

  return (
    <Box
      ref={ref}
      display="grid"
      gridGap={gap}
      gridRowGap={rowGap}
      gridColumnGap={columnGap}
      gridColumn={column}
      gridRow={row}
      gridArea={area}
      gridAutoFlow={autoFlow}
      gridAutoRows={autoRows}
      gridAutoColumns={autoColumns}
      gridTemplateRows={templateRows}
      gridTemplateColumns={templateColumns}
      gridTemplateAreas={templateAreas}
      {...rest}
    />
  );
});

Grid.displayName = 'Grid';

export default Grid;
