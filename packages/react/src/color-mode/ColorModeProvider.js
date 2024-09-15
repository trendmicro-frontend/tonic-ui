import { canUseDOM, noop } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { useCallback, useEffect, useReducer } from 'react';
import { useDefaultProps } from '../default-props';
import { ColorModeContext } from './context';
import { getColorScheme, colorSchemeQuery } from './utils';

const ensureColorMode = (colorMode) => {
  return colorMode === 'dark' ? 'dark' : 'light';
};

const getMemoizedState = memoize(state => ({ ...state }));

const colorModeReducer = (state, nextValue) => {
  if (nextValue === undefined) {
    const colorMode = state;
    return colorMode === 'dark' ? 'light' : 'dark';
  }
  return ensureColorMode(nextValue);
};

const ColorModeProvider = (inProps) => {
  const {
    children,
    defaultValue: defaultValueProp,
    value: valueProp,
    onChange: onChangeProp,
    useSystemColorMode,
  } = useDefaultProps({ props: inProps, name: 'ColorModeProvider' });
  const defaultColorMode = (defaultValueProp === 'dark') ? 'dark' : 'light';
  const [colorMode, setColorMode] = useReducer(colorModeReducer, ensureColorMode(valueProp ?? defaultColorMode));

  useEffect(() => {
    if (valueProp !== undefined) {
      setColorMode(valueProp);
    }
  }, [valueProp]);

  const onChange = useCallback((nextValue) => {
    if (valueProp !== undefined) {
      setColorMode(valueProp);
    } else {
      setColorMode(nextValue);
    }
    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue); // Pass original value to the onChange callback
    }
  }, [valueProp, onChangeProp]);

  useEffect(() => {
    if (valueProp !== null && valueProp !== undefined) {
      // bypass the system color mode if `valueProp` is set
      return noop;
    }
    if (!useSystemColorMode) {
      return noop;
    }
    if (!canUseDOM()) {
      return noop;
    }

    const systemColorMode = getColorScheme(defaultColorMode);
    onChange(systemColorMode);

    const mediaQueryList = window?.matchMedia?.(colorSchemeQuery.dark);
    const listener = () => {
      onChange(mediaQueryList.matches ? 'dark' : 'light');
    };
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [defaultValueProp, valueProp, useSystemColorMode, defaultColorMode, onChange]);

  const colorModeState = getMemoizedState({
    colorMode,
    onChange,
  });

  return (
    <ColorModeContext.Provider value={colorModeState}>
      {children}
    </ColorModeContext.Provider>
  );
};

ColorModeProvider.displayName = 'ColorModeProvider';

export default ColorModeProvider;
