import { Box } from '@tonic-ui/react';
import { forwardRef } from 'react';

const ListItem = forwardRef((props, ref) => {
  return (
    <Box
      as="li"
      {...props}
    />
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
