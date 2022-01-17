import React, {
  forwardRef
} from 'react';
import { Box } from '../../box';
import setRef from '../../utils/setRef';

const TabPanel = forwardRef(
  ({ children, isSelected, selectedPanelRef, id, ...rest }, ref) => {
    return (
      <Box
        ref={node => {
          if (isSelected) {
            setRef(selectedPanelRef, node);
          }
          setRef(ref, node);
        }}
        role="tabpanel"
        tabIndex={-1}
        aria-labelledby={`tab:${id}`}
        hidden={!isSelected}
        id={`panel:${id}`}
        outline={0}
        {...rest}
      >
        {typeof children === 'function'
          ? children({ isActive: isSelected })
          : children}
      </Box>
    );
  },
);

TabPanel.displayName = 'TabPanel';

export default TabPanel;
