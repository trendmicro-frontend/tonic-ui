import { ensurePlainObject } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useCallback, useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import defaultColorStyle from './color-style';
import { ColorStyleContext } from './context';

const ensureColorStyle = (colorStyle) => {
  return ensurePlainObject(colorStyle);
};

const getMemoizedState = memoize(state => ({ ...state }));

const ColorStyleProvider = (inProps) => {
  const {
    children,
    defaultValue: defaultValueProp,
    value: valueProp,
    onChange: onChangeProp,
  } = useDefaultProps({ props: inProps, name: 'ColorStyleProvider' });
  const [colorStyle, setColorStyle] = useState(ensureColorStyle(valueProp ?? (defaultValueProp ?? defaultColorStyle)));

  useEffect(() => {
    if (valueProp !== undefined) {
      setColorStyle(ensureColorStyle(valueProp));
    }
  }, [valueProp]);

  const onChange = useCallback((nextValue) => {
    if (valueProp !== undefined) {
      setColorStyle(ensureColorStyle(valueProp));
    } else {
      setColorStyle(ensureColorStyle(nextValue));
    }
    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue); // Pass original value to the onChange callback
    }
  }, [valueProp, onChangeProp]);

  const colorStyleState = getMemoizedState({
    colorStyle,
    onChange,
  });

  return (
    <ColorStyleContext.Provider value={colorStyleState}>
      {children}
    </ColorStyleContext.Provider>
  );
};

ColorStyleProvider.displayName = 'ColorStyleProvider';

export default ColorStyleProvider;
