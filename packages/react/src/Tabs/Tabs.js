import React, {
  forwardRef,
  useState,
  useRef
} from 'react';
import { TabContext } from './context';
import Box from '../Box';
import { useId } from '../utils/autoId';

const Tabs = forwardRef((
  {
    children,
    onChange,
    index: controlledIndex,
    defaultIndex,
    activateOnKeypress, // TODO: activateOnKeypress is deprecated and will be removed in the v1 release
    isManual,
    variant = 'line',
    align = 'left',
    size = 'md',
    orientation = 'horizontal',
    isFitted,
    ...rest
  },
  ref,
) => {
  const { current: isControlled } = useRef(controlledIndex != null);
  const selectedPanelRef = useRef();
  const isActiveManually = activateOnKeypress || isManual;

  const getInitialIndex = () => {
    if (!isActiveManually) {
      return defaultIndex || 0;
    } else {
      return controlledIndex || defaultIndex || 0;
    }
  };

  const getActualIdx = () => {
    if (isActiveManually) {
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

    if (isControlled && isActiveManually) {
      setSelectedIndex(index);
    }

    if (!isActiveManually) {
      onChange && onChange(index);
    }
  };

  const onManualTabChange = index => {
    if (!isControlled) {
      setManualIndex(index);
    }

    if (isActiveManually) {
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
    activateOnKeypress, // TODO: activateOnKeypress is deprecated and will be removed in the v1 release
    isManual,
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
      <Box ref={ref} {...rest}>
        {children}
      </Box>
    </TabContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
