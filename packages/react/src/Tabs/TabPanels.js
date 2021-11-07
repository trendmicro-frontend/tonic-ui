import React, {
  cloneElement,
  forwardRef,
  useContext
} from 'react';
import { TabContext } from './context';
import cleanChildren from '../utils/cleanChildren';
import Box from '../Box';

const TabPanels = forwardRef(({ children, ...rest }, ref) => {
  const {
    index: selectedIndex,
    selectedPanelRef,
    id,
    activateOnKeypress, // TODO: activateOnKeypress is deprecated and will be removed in the v1 release
    isManual,
    manualIndex,
  } = useContext(TabContext);

  const validChildren = cleanChildren(children);
  const isActiveManually = activateOnKeypress || isManual;
  const clones = validChildren.map((child, index) => {
    return cloneElement(child, {
      isSelected: isActiveManually ? index === manualIndex : index === selectedIndex,
      selectedPanelRef,
      id: `${id}-${index}`,
    });
  });

  return (
    <Box tabIndex="-1" ref={ref} {...rest}>
      {clones}
    </Box>
  );
});

TabPanels.displayName = 'TabPanels';

export default TabPanels;
