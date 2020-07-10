import React, {
  forwardRef,
  useState,
  useRef
} from 'react';
import { TabContext } from './context';
import Box from '../Box';
import { useId } from '../utils/autoId';

const Tabs = forwardRef(
  (
    {
      children,
      onChange,
      index: controlledIndex,
      defaultIndex,
      activateOnKeypress,
      variant = 'line',
      align = 'left',
      size = 'md',
      orientation = 'horizontal',
      isFitted,
      ...props
    },
    ref,
  ) => {
    const { current: isControlled } = useRef(controlledIndex != null);
    const selectedPanelRef = useRef();

    const getInitialIndex = () => {
      if (!activateOnKeypress) {
        return defaultIndex || 0;
      } else {
        return controlledIndex || defaultIndex || 0;
      }
    };

    const getActualIdx = () => {
      if (activateOnKeypress) {
        return selectedIndex;
      } else {
        return isControlled ? controlledIndex : selectedIndex;
      }
    };

    const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);
    const [manualIndex, setManualIndex] = useState(
      controlledIndex || defaultIndex || 0,
    );

    let actualIdx = getActualIdx();
    let manualIdx = isControlled ? controlledIndex : manualIndex;

    const onChangeTab = index => {
      if (!isControlled) {
        setSelectedIndex(index);
      }

      if (isControlled && activateOnKeypress) {
        setSelectedIndex(index);
      }

      if (!activateOnKeypress) {
        onChange && onChange(index);
      }
    };

    const onManualTabChange = index => {
      if (!isControlled) {
        setManualIndex(index);
      }

      if (activateOnKeypress) {
        onChange && onChange(index);
      }
    };

    const onFocusPanel = () => {
      if (selectedPanelRef.current) {
        selectedPanelRef.current.focus();
      }
    };

    const id = useId();

    const context = {
      id,
      index: actualIdx,
      manualIndex: manualIdx,
      onManualTabChange,
      activateOnKeypress,
      onChangeTab,
      selectedPanelRef,
      onFocusPanel,
      size,
      align,
      variant,
      isFitted,
      orientation,
    };

    return (
      <TabContext.Provider value={context}>
        <Box ref={ref} {...props}>
          {children}
        </Box>
      </TabContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

export default Tabs;
