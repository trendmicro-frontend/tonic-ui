import { useEventCallback } from '@tonic-ui/react-hooks';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import config from '../shared/config';
import runIfFn from '../utils/runIfFn';
import useAutoId from '../utils/useAutoId';
import { SubmenuProvider } from './context';
import { useSubmenuStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Submenu = forwardRef((
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
  const defaultId = useAutoId();
  const submenuId = `${config.name}:Submenu-${defaultId}`;
  const styleProps = useSubmenuStyle();
  const context = getMemoizedState({
    isHovered,
    placement,
    submenuId,
  });

  return (
    <SubmenuProvider value={context}>
      <Box
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </SubmenuProvider>
  );
});

Submenu.displayName = 'Submenu';

export default Submenu;
