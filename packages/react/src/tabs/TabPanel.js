import { useEffectOnce } from '@tonic-ui/react-hooks';
import { ariaAttr, isNullOrUndefined, warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useTabs from './useTabs';
import { useTabPanelStyle } from './styles';

const isIndexEqual = (index1, index2) => !isNullOrUndefined(index1) && !isNullOrUndefined(index2) && (index1 === index2);

const TabPanel = forwardRef((inProps, ref) => {
  const {
    children,
    index: indexProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TabPanel' });
  const [index, setIndex] = useState(indexProp);
  const context = useTabs();
  const registerTabPanel = ensureFunction(context?.registerTabPanel);
  const unregisterTabPanel = ensureFunction(context?.unregisterTabPanel);
  const tabId = `${config.name}:Tab-${index}`;
  const tabPanelId = `${config.name}:TabPanel-${index}`;
  const isSelected = isIndexEqual(index, context?.index);
  const tabIndex = 0;
  const styleProps = useTabPanelStyle({ tabIndex });

  // Ensure the tab panel is registered only once at the first render
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
  });

  const getTabPanelProps = () => ({
    'aria-hidden': ariaAttr(!isSelected),
    'aria-labelledby': tabId,
    hidden: !isSelected,
    id: tabPanelId,
    ref,
    role: 'tabpanel',
    tabIndex,
    ...styleProps,
    ...rest,
  });

  const tabPanelContext = {
    getTabPanelProps,
    index,
    isSelected,
  };

  { // deprecation warning
    const prefix = `${TabPanel.displayName}:`;

    Object.defineProperties(tabPanelContext, {
      isActive: {
        get: () => {
          warnDeprecatedProps('isActive', {
            prefix,
            alternative: 'isSelected',
            willRemove: true,
          });
          return isSelected;
        },
      },
    });
  }

  if (typeof children === 'function') {
    return children(tabPanelContext);
  }

  return (
    <Box {...getTabPanelProps()}>
      {children}
    </Box>
  );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
