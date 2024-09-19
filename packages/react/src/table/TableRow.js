import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { GROUP_VARIANT_BODY, LAYOUT_TABLE } from './constants';
import { useTableRowStyle } from './styles';
import useTable from './useTable';
import useTableGroup from './useTableGroup';

const TableRow = forwardRef((inProps, ref) => {
  const {
    role: roleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TableRow' });
  const { layout, variant } = useTable();
  const groupContext = useTableGroup();
  const groupVariant = groupContext?.groupVariant ?? GROUP_VARIANT_BODY;
  const as = layout === LAYOUT_TABLE ? 'tr' : undefined;
  const role = roleProp ?? 'row';
  const styleProps = useTableRowStyle({ groupVariant, layout, role, variant });

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

TableRow.displayName = 'TableRow';

export default TableRow;
