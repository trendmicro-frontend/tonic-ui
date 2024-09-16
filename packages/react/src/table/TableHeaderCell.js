import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { GROUP_VARIANT_HEADER, LAYOUT_TABLE } from './constants';
import { useTableCellStyle } from './styles';
import useTable from './useTable';

const TableHeaderCell = forwardRef((inProps, ref) => {
  const {
    role: roleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TableHeaderCell' });
  const { layout, size, variant } = useTable();
  const groupVariant = GROUP_VARIANT_HEADER;
  const as = layout === LAYOUT_TABLE ? 'th' : undefined;
  const role = roleProp ?? 'columnheader';
  const styleProps = useTableCellStyle({ groupVariant, layout, size, variant });

  return (
    <Box
      as={as}
      ref={ref}
      role={role}
      {...styleProps}
      {...rest}
    />
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
