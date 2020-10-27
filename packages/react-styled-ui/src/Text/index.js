import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';
import getColorPalette from '@trendmicro/styled-ui-theme/build/color-palette';

const Text = forwardRef((
  {
    as,
    size,
    ...rest
  },
  ref,
) => {
  const { fontSizes } = useTheme();
  const { colorMode } = useColorMode();
  const markedBgColor = getColorPalette(colorMode).get('background.marked');
  const sizeProps = {};
  if (size !== undefined && Object.prototype.hasOwnProperty.call(fontSizes, size)) {
    sizeProps.fontSize = size;
    sizeProps.lineHeight = size;
  }
  if (as === 'mark') {
    sizeProps.backgroundColor = markedBgColor;
  }

  return (
    <PseudoBox
      as={as}
      ref={ref}
      display="inline-block"
      fontFamily="base"
      {...sizeProps}
      {...rest}
    />
  );
});

Text.displayName = 'Text';

export default Text;
