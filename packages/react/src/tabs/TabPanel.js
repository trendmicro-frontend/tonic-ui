import { useEffectOnce } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import { Box } from '../box';
import config from '../shared/config';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import runIfFn from '../utils/runIfFn';
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
  const isActive = isIndexEqual(index, context?.index);
  const variant = variantProp ?? context?.variant;
  const styleProps = useTabPanelStyle({ isActive, variant });

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

  return (
    <Box
      aria-hidden={!isActive}
      aria-labelledby={tabId}
      hidden={!isActive}
      id={tabPanelId}
      ref={ref}
      role="tabpanel"
      tabIndex={-1}
      {...styleProps}
      {...rest}
    >
      {runIfFn(children, { ...context, isActive, variant })}
    </Box>
  );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
