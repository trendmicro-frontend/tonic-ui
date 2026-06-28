import { ensurePlainObject } from 'ensure-type';
import React, { useCallback, useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import defaultColorStyle from './color-style';
import { ColorStyleContext } from './context';

const ensureColorStyle = (colorStyle) => {
  return ensurePlainObject(colorStyle);
};

const ColorStyleProvider = (inProps) => {
  const {
    children,
    defaultValue: defaultValueProp,
    value: valueProp,
    onChange: onChangeProp,
  } = useDefaultProps({ props: inProps, name: 'ColorStyleProvider' });
  const shallowMemo = useShallowMemo();
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

  const colorStyleState = shallowMemo({
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
