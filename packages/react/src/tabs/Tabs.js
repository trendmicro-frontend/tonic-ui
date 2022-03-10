import { useConst, useOnceWhen } from '@tonic-ui/react-hooks';
import memoize from 'micro-memoize';
import React, { useEffect, useReducer } from 'react';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import runIfFn from '../utils/runIfFn';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import warnRemovedProps from '../utils/warnRemovedProps';
import { defaultOrientation, defaultVariant } from './constants';
import { TabsContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const stateReducer = (prevState, nextState) => ({
  ...prevState,
  ...(typeof nextState === 'function' ? nextState(prevState) : nextState),
});

const Tabs = ({
  activateOnKeyPress, // removed
  isFitted, // removed
  isManual, // removed

  children,
  defaultIndex = 0,
  disabled,
  index: indexProp,
  onChange,
  orientation = defaultOrientation,
  variant = defaultVariant,
}) => {
  { // deprecation warning
    const prefix = `${Tabs.displayName}:`;

    useOnceWhen(() => {
      warnRemovedProps('activateOnKeyPress', {
        prefix,
      });
    }, (activateOnKeyPress !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('isFitted', {
        prefix,
      });
    }, (isFitted !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('isManual', {
        prefix,
      });
    }, (isManual !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('variant="line"', {
        prefix,
        alternative: 'variant="default"',
        willRemove: true,
      });
    }, (variant === 'line'));

    useOnceWhen(() => {
      warnDeprecatedProps('variant="enclosed"', {
        prefix,
        alternative: 'variant="filled"',
        willRemove: true,
      });
    }, (variant === 'enclosed'));

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
    orientation,
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
