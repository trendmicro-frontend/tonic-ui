import { useConst, useEffectOnce } from '@tonic-ui/react-hooks';
import memoize from 'micro-memoize';
import React, { useEffect, useReducer } from 'react';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import runIfFn from '../utils/runIfFn';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import warnRemovedProps from '../utils/warnRemovedProps';
import { TabsContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const stateReducer = (prevState, nextState) => ({
  ...prevState,
  ...(typeof nextState === 'function' ? nextState(prevState) : nextState),
});

const defaultVariant = 'default';

const Tabs = ({
  activateOnKeyPress, // removed
  isFitted, // removed
  isManual, // removed
  orientation, // removed

  children,
  defaultIndex = 0,
  disabled,
  index: indexProp,
  onChange,
  variant = defaultVariant,
}) => {
  useEffectOnce(() => {
    const prefix = `${Tabs.displayName}:`;

    if (activateOnKeyPress !== undefined) {
      warnRemovedProps('activateOnKeyPress', {
        prefix,
      });
    }
    if (isFitted !== undefined) {
      warnRemovedProps('isFitted', {
        prefix,
      });
    }
    if (isManual !== undefined) {
      warnRemovedProps('isManual', {
        prefix,
      });
    }
    if (orientation !== undefined) {
      warnRemovedProps('orientation', {
        prefix,
      });
    }
    if (variant === 'line') {
      warnDeprecatedProps('variant="line"', {
        prefix,
        alternative: 'variant="default"',
        willRemove: true,
      });
    }
    if (variant === 'enclosed') {
      warnDeprecatedProps('variant="enclosed"', {
        prefix,
        alternative: 'variant="filled"',
        willRemove: true,
      });
    }
  }, true); // TODO: check if `when` is true for each prop

  { // map deprecated props to new props
    if (variant === 'line') {
      variant = 'default';
    }
    if (variant === 'enclosed') {
      variant = 'filled';
    }
  }

  const tabMap = useConst(() => new Map());
  const tabPanelMap = useConst(() => new Map());
  const [state, setState] = useReducer(stateReducer, {
    index: indexProp ?? defaultIndex,
  });

  useEffect(() => {
    if (indexProp !== undefined) {
      setState({ index: indexProp });
    }
  }, [indexProp]);

  const handleChange = (index) => {
    if (indexProp !== undefined) {
      setState({ index: indexProp });
    } else {
      setState({ index: index });
    }

    if (typeof onChange === 'function') {
      onChange(index);
    }
  };

  const registerTab = (index) => {
    const nextIndex = isNullOrUndefined(index) ? tabMap.size : index;
    tabMap.set(nextIndex, true);
    return nextIndex;
  };

  const unregisterTab = (index) => {
    return tabMap.delete(index);
  };

  const registerTabPanel = (index) => {
    const nextIndex = isNullOrUndefined(index) ? tabPanelMap.size : index;
    tabPanelMap.set(nextIndex, true);
    return nextIndex;
  };

  const unregisterTabPanel = (index) => {
    return tabPanelMap.delete(index);
  };

  const context = getMemoizedState({
    disabled,
    index: state.index,
    onChange: handleChange,
    variant,
    registerTab,
    registerTabPanel,
    unregisterTab,
    unregisterTabPanel,
  });

  return (
    <TabsContext.Provider value={context}>
      {runIfFn(children, context)}
    </TabsContext.Provider>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
