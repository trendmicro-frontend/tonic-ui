import {
  Flex,
} from '@tonic-ui/react';
import { forwardRef } from 'react';

const ToolbarItem = forwardRef((props, ref) => {
  const styleProps = {
    alignItems: 'center',
    columnGap: '2x',
    rowGap: '3x',
  };

  return (
    <Flex
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ToolbarItem.displayName = 'ToolbarItem';

export default ToolbarItem;
