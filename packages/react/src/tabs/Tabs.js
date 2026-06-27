import { useConst } from '@tonic-ui/react-hooks';
import { isNullOrUndefined, runIfFn } from '@tonic-ui/utils';
import { forwardRef, useEffect, useReducer } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { defaultOrientation, defaultVariant } from './constants';
import { TabsContext } from './context';
import { useTabsStyle } from './styles';

const stateReducer = (prevState, nextState) => ({
  ...prevState,
  ...(typeof nextState === 'function' ? nextState(prevState) : nextState),
});

/**
 * @template {string | number} [T=string | number]
 * @typedef {Object} TabsProps
 * @property {React.ReactNode | ((context: { disabled?: boolean; index: number | string; onChange: (index: string | number) => void; orientation: 'horizontal' | 'vertical'; variant: 'default' | 'filled' | 'unstyled' }) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the context object.
 * @property {T} [defaultIndex=0] - The default index of the tab to be selected in uncontrolled mode.
 * @property {boolean} [disabled] - Whether the tabs should be disabled.
 * @property {T} [index] - The index of the tab to be selected in controlled mode.
 * @property {(index: T) => void} [onChange] - A callback function that is called when the index changes.
 * @property {('horizontal'|'vertical')} [orientation='horizontal'] - The orientation of the tabs.
 * @property {('default'|'filled'|'unstyled')} [variant='default'] - The variant of the tabs.
 */

/**
 * @type {{ <T extends string | number = string | number>(props: StyleProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof TabsProps<T>> & TabsProps<T> & React.RefAttributes<HTMLElement>): React.ReactElement | null; displayName?: string }}
 */
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
  const shallowMemo = useShallowMemo();
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

  const context = shallowMemo({
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
