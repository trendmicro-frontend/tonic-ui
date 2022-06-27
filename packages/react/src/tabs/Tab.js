import { useEffectOnce } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import { Box } from '../box';
import config from '../shared/config';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import wrapEvent from '../utils/wrapEvent';
import { useTabStyle } from './styles';
import useTabs from './useTabs';

const isIndexEqual = (index1, index2) => !isNullOrUndefined(index1) && !isNullOrUndefined(index2) && (index1 === index2);

const Tab = forwardRef((
  {
    children,
    disabled: disabledProp,
    index: indexProp,
    onClick,
    ...rest
  },
  ref,
) => {
  const [index, setIndex] = useState(indexProp);
  const context = useTabs();
  const registerTab = ensureFunction(context?.registerTab);
  const unregisterTab = ensureFunction(context?.unregisterTab);
  const tabId = `${config.name}:Tab-${index}`;
  const tabPanelId = `${config.name}:TabPanel-${index}`;
  const disabled = disabledProp ?? context?.disabled;
  const isSelected = isIndexEqual(index, context?.index);
  const orientation = context?.orientation;
  const variant = context?.variant;
  const styleProps = useTabStyle({ disabled, isSelected, orientation, variant });
  const handleClick = wrapEvent(onClick, (event) => {
    if (isSelected) {
      // Do not trigger onChange if the tab is already selected
      return;
    }
    ensureFunction(context?.onChange)(index);
  });

  // Ensure the tab is registered only once at the first render
  useEffectOnce(() => {
    if (isNullOrUndefined(index)) {
      const newIndex = registerTab();
      setIndex(newIndex);
      return () => {
        unregisterTab(newIndex);
      };
    }

    registerTab(index);
    return () => {
      unregisterTab(index);
    };
  });

  const getTabProps = () => ({
    'aria-controls': tabPanelId,
    'aria-selected': isSelected,
    'data-index': index,
    disabled,
    id: tabId,
    onClick: handleClick,
    ref,
    role: 'tab',
    tabIndex: (disabled || isSelected) ? -1 : 0,
    ...styleProps,
    ...rest,
  });

  const tabContext = {
    getTabProps,
    disabled,
    index,
    isSelected,
  };

  { // deprecation warning
    const prefix = `${Tab.displayName}:`;

    Object.defineProperties(tabContext, {
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
    return children(tabContext);
  }

  return (
    <Box {...getTabProps()}>
      {children}
    </Box>
  );
});

Tab.displayName = 'Tab';

export default Tab;
