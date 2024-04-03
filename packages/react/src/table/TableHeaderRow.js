import { ensureArray } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { GROUP_VARIANT_HEADER, LAYOUT_TABLE } from './constants';
import { useTableRowStyle } from './styles';
import useTable from './useTable';

const TableHeaderRow = forwardRef((
  {
    role: roleProp,
    sx: sxProp,
    ...rest
  },
  ref,
) => {
  const { layout, variant } = useTable();
  const groupVariant = GROUP_VARIANT_HEADER;
  const as = layout === LAYOUT_TABLE ? 'tr' : undefined;
  const role = roleProp ?? 'row';
  const styleProps = useTableRowStyle({ groupVariant, layout, role, variant });

  return (
    <Box
      as={as}
      ref={ref}
      role={role}
      sx={[styleProps, ...ensureArray(sxProp)]}
      {...rest}
    />
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';

export default TableHeaderRow;
