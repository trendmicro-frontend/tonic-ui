import React, { forwardRef, useRef, useState } from 'react';
import { TabContext } from './context';
import Box from '../Box';
import useEffectOnce from '../hooks/useEffectOnce';
import { useId } from '../utils/autoId';
import warnRemovedProps from '../utils/warnRemovedProps';

const Tabs = forwardRef((
  {
    activateOnKeypress, // deprecated
    children,
    onChange,
    index: controlledIndex,
    defaultIndex,
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
  useEffectOnce(() => {
    if (activateOnKeypress !== undefined) {
      warnRemovedProps('activateOnKeypress');
    }
  });

  const { current: isControlled } = useRef(controlledIndex != null);
  const selectedPanelRef = useRef();

  const getInitialIndex = () => {
    if (!isManual) {
      return defaultIndex || 0;
    } else {
      return controlledIndex || defaultIndex || 0;
    }
  };

  const getActualIdx = () => {
    if (isManual) {
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

    if (isControlled && isManual) {
      setSelectedIndex(index);
    }

    if (!isManual) {
      onChange && onChange(index);
    }
  };

  const onManualTabChange = index => {
    if (!isControlled) {
      setManualIndex(index);
    }

    if (isManual) {
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
