import { ensurePlainObject } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useState } from 'react';
import colorStyle from '../shared/color-style';
import { ColorStyleContext } from '../context';

const getMemoizedState = memoize(state => ({ ...state }));

const ColorStyleProvider = ({
  value: customColorStyle = colorStyle,
  children,
}) => {
  const [colorStyle, setColorStyle] = useState(ensurePlainObject(customColorStyle));
  const colorStyleState = getMemoizedState({
    colorStyle,
    setColorStyle,
  });

  return (
    <ColorStyleContext.Provider value={colorStyleState}>
      {children}
    </ColorStyleContext.Provider>
  );
};

ColorStyleProvider.displayName = 'ColorStyleProvider';

export default ColorStyleProvider;
