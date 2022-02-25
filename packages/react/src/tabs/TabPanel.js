import { useEffectOnce } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import { Box } from '../box';
import config from '../shared/config';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import useTabs from './useTabs';
import { useTabPanelStyle } from './styles';

const isIndexEqual = (index1, index2) => !isNullOrUndefined(index1) && !isNullOrUndefined(index2) && (index1 === index2);

const TabPanel = forwardRef((
  {
    children,
    index: indexProp,
    variant: variantProp,
    ...rest
  },
  ref,
) => {
  const [index, setIndex] = useState(indexProp);
  const context = useTabs();
  const registerTabPanel = ensureFunction(context?.registerTabPanel);
  const unregisterTabPanel = ensureFunction(context?.unregisterTabPanel);
  const tabId = `${config.name}:Tab-${index}`;
  const tabPanelId = `${config.name}:TabPanel-${index}`;
  const isSelected = isIndexEqual(index, context?.index);
  const variant = variantProp ?? context?.variant;
  const styleProps = useTabPanelStyle({ isSelected, variant });

  // Use useEffectOnce to ensure the tab panel is registered only on the first render
  useEffectOnce(() => {
    if (isNullOrUndefined(index)) {
      const newIndex = registerTabPanel();
      setIndex(newIndex);
      return () => {
        unregisterTabPanel(newIndex);
      };
    }

    registerTabPanel(index);
    return () => {
      unregisterTabPanel(index);
    };
  }, true);

  const getTabPanelProps = () => ({
    'aria-hidden': !isSelected,
    'aria-labelledby': tabId,
    hidden: !isSelected,
    id: tabPanelId,
    ref,
    role: 'tabpanel',
    tabIndex: 0,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getTabPanelProps,
      index,
      variant,
    });
  }

  return (
    <Box {...getTabPanelProps()}>
      {children}
    </Box>
  );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
