import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

/**
 * @typedef {Object} GridProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', GridProps & Partial<Record<'gridGap' | 'gridRowGap' | 'gridColumnGap', never>>>}
 */
const Grid = forwardRef((inProps, ref) => {
  const {
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

  // These legacy names are supported by styled-system, not by Grid's flat props.
  delete rest.gridGap;
  delete rest.gridRowGap;
  delete rest.gridColumnGap;

  return (
    <Box
      ref={ref}
      display="grid"
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
