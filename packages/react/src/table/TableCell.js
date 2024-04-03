import { ensureArray } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { GROUP_VARIANT_HEADER, GROUP_VARIANT_BODY, GROUP_VARIANT_FOOTER, LAYOUT_TABLE } from './constants';
import { useTableCellStyle } from './styles';
import useTable from './useTable';
import useTableGroup from './useTableGroup';

const TableCell = forwardRef((
  {
    role: roleProp,
    sx: sxProp,
    ...rest
  },
  ref,
) => {
  const { layout, size, variant } = useTable();
  const groupContext = useTableGroup();
  const groupVariant = groupContext?.groupVariant ?? GROUP_VARIANT_BODY;
  const as = (() => {
    if (groupVariant === GROUP_VARIANT_HEADER) {
      return layout === LAYOUT_TABLE ? 'th' : undefined;
    } else {
      return layout === LAYOUT_TABLE ? 'td' : undefined;
    }
  })();
  const role = roleProp ?? {
    [GROUP_VARIANT_HEADER]: 'columnheader',
    [GROUP_VARIANT_BODY]: 'cell',
    [GROUP_VARIANT_FOOTER]: 'cell',
  }[groupVariant] ?? 'cell';
  const styleProps = useTableCellStyle({ groupVariant, layout, size, variant });

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

TableCell.displayName = 'TableCell';

export default TableCell;
