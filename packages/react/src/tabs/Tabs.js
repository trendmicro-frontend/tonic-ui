import { useConst } from '@tonic-ui/react-hooks';
import { isNullOrUndefined, runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef, useEffect, useReducer } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { defaultOrientation, defaultVariant } from './constants';
import { TabsContext } from './context';
import { useTabsStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const stateReducer = (prevState, nextState) => ({
  ...prevState,
  ...(typeof nextState === 'function' ? nextState(prevState) : nextState),
});

const Tabs = forwardRef((inProps, ref) => {
  const {
    children,
    defaultIndex = 0,
    disabled,
    index: indexProp,
    onChange,
    orientation = defaultOrientation,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Tabs' });
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
  const styleProps = useTabsStyle({ orientation });

  return (
    <TabsContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
