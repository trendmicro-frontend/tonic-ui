import { VARIANT_EMPHASIS, VARIANT_HIGHLIGHT } from './constants';

const useMarkStyle = ({ variant }) => {
  const baseStyle = {
    display: 'inline', // highlight and mark elements are inline by default

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
      color: 'text.accent', // semantic color token
      fontWeight: 'semibold',
    },
    [VARIANT_HIGHLIGHT]: {
      backgroundColor: '_highlight',
      color: 'text._fixed.light.accent',
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
