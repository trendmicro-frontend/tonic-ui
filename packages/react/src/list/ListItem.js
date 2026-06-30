import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

/**
 * @type {ForwardRefComponent<'li'>}
 */
const ListItem = forwardRef((inProps, ref) => {
  const {
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ListItem' });

  return (
    <Box
      as="li"
      ref={ref}
      {...rest}
    />
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
