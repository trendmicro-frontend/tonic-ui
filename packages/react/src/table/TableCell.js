import { ensureArray } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { GROUP_VARIANT_HEADER, GROUP_VARIANT_BODY, GROUP_VARIANT_FOOTER, LAYOUT_TABLE, VARIANT_OUTLINE } from './constants';
import { useTableCellStyle } from './styles';
import useTable from './useTable';
import useTableGroup from './useTableGroup';

const TableCell = forwardRef((inProps, ref) => {
  const {
    role: roleProp,
    sx: sxProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TableCell' });
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
  let sx = {};

  // Remove bottom border if the layout is not 'table'
  if ((groupVariant === GROUP_VARIANT_BODY) && (layout !== LAYOUT_TABLE) && (variant === VARIANT_OUTLINE)) {
    sx = {
      ...sx,
      '*:last-child > &': {
        borderBottom: 0,
        borderBottomColor: 'transparent',
      },
    };
  }

  return (
    <Box
      as={as}
      ref={ref}
      role={role}
      sx={[sx, ...ensureArray(sxProp)]}
      {...styleProps}
      {...rest}
    />
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
