import { useMergeRefs } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useDrawerContainerStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerContainer = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'DrawerContainer' });
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    backdrop,
    placement,
    size,
    containerRef, // internal use only
  } = { ...drawerContext };
  const combinedRef = useMergeRefs(containerRef, ref);
  const styleProps = useDrawerContainerStyle({ backdrop, placement, size });
  const containerProps = {
    ref: combinedRef,
    ...styleProps,
    ...props,
  };

  return (
    <Box {...containerProps} />
  );
});

DrawerContainer.displayName = 'DrawerContainer';

export default DrawerContainer;
