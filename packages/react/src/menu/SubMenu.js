import { useEventCallback } from '@tonic-ui/react-hooks';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import runIfFn from '../utils/runIfFn';
import { SubMenuProvider } from './context';
import { useSubMenuStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const SubMenu = forwardRef((
  {
    children,
    placement = 'right-start', // One of: 'right-start', 'right-end', 'left-start', 'left-end'
    ...rest
  },
  ref,
) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const onMouseEnter = useEventCallback((event) => {
    setIsHovered(true);
  });
  const onMouseLeave = useEventCallback((event) => {
    setIsHovered(false);
  });
  const styleProps = useSubMenuStyle();
  const context = getMemoizedState({
    isHovered,
    placement,
  });

  return (
    <SubMenuProvider value={context}>
      <Box
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </SubMenuProvider>
  );
});

SubMenu.displayName = 'SubMenu';

export default SubMenu;
