import { useEffectOnce } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import { ButtonBase } from '../button';
import config from '../shared/config';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import runIfFn from '../utils/runIfFn';
import wrapEvent from '../utils/wrapEvent';
import { useTabStyle } from './styles';
import useTabs from './useTabs';

const defaultVariant = 'default';
const isIndexEqual = (index1, index2) => !isNullOrUndefined(index1) && !isNullOrUndefined(index2) && (index1 === index2);

const Tab = forwardRef((
  {
    children,
    disabled: disabledProp,
    index: indexProp,
    onClick,
    variant: variantProp,
    ...rest
  },
  ref,
) => {
  const [index, setIndex] = useState(indexProp);
  const context = useTabs();
  const isActive = isIndexEqual(index, context?.index);
  const registerTab = ensureFunction(context?.registerTab);
  const unregisterTab = ensureFunction(context?.unregisterTab);
  const tabId = `${config.name}:Tab-${index}`;
  const tabPanelId = `${config.name}:TabPanel-${index}`;
  const handleClick = wrapEvent(onClick, (event) => {
    if (isActive) {
      // Do not trigger onChange if the tab is already active
      return;
    }
    ensureFunction(context?.onChange)(index);
  });
  const disabled = disabledProp ?? context?.disabled;
  const variant = (variantProp ?? context?.variant) ?? defaultVariant;
  const styleProps = useTabStyle({
    disabled,
    isActive,
    variant,
  });

  // Use useEffectOnce to ensure the tab is registered only on the first render
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
  }, true);

  return (
    <ButtonBase
      ref={ref}
      aria-controls={tabPanelId}
      aria-selected={isActive}
      data-index={index}
      disabled={disabled}
      id={tabId}
      onClick={handleClick}
      role="tab"
      tabIndex={disabled ? -1 : 0}
      {...styleProps}
      {...rest}
    >
      {runIfFn(children, context)}
    </ButtonBase>
  );
});

Tab.displayName = 'Tab';

export default Tab;
