import { useColorMode } from '../color-mode';
import { VARIANT_EMPHASIS, VARIANT_HIGHLIGHT } from './constants';

const useMarkStyle = ({ variant }) => {
  const [colorMode] = useColorMode();
  const emphasisTextColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];

  const baseStyle = {
    // Default user agent stylesheet:
    // ```css
    // mark {
    //   background-color: mark;
    //   color: marktext;
    // }
    //
    // The following overrides the default styles:
    backgroundColor: 'inherit',
    color: 'inherit',
  };
  const variantStyle = {
    [VARIANT_EMPHASIS]: {
      backgroundColor: 'inherit',
      color: emphasisTextColor,
      fontWeight: 'semibold',
    },
    [VARIANT_HIGHLIGHT]: {
      backgroundColor: '#fce79e',
      color: 'black:primary',
    },
  }[variant];

  return {
    ...baseStyle,
    ...variantStyle,
  };
};

export {
  useMarkStyle,
};
