import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

/**
 * @typedef {Object} GridProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @typedef {Object} LegacyGridGapProps
 * @property {any} [gridGap] - **Deprecated.** Use `gap` instead.
 * @property {any} [gridRowGap] - **Deprecated.** Use `rowGap` instead.
 * @property {any} [gridColumnGap] - **Deprecated.** Use `columnGap` instead.
 */

/**
 * @type {ForwardRefComponent<'div', GridProps & LegacyGridGapProps>}
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

  useOnceWhen(() => {
    warnDeprecatedProps('gridGap', { prefix: 'Grid:', alternative: 'gap', willRemove: true });
  }, rest.gridGap !== undefined);
  useOnceWhen(() => {
    warnDeprecatedProps('gridRowGap', { prefix: 'Grid:', alternative: 'rowGap', willRemove: true });
  }, rest.gridRowGap !== undefined);
  useOnceWhen(() => {
    warnDeprecatedProps('gridColumnGap', { prefix: 'Grid:', alternative: 'columnGap', willRemove: true });
  }, rest.gridColumnGap !== undefined);

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
