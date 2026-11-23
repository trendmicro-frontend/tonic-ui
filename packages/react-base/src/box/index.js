import { forwardRef, useContext } from 'react';
import BaseBox from './Box';
import { ColorModeContext } from '../internal/color-mode/context';

/** @import { ElementType, ForwardRefExoticComponent, ComponentPropsWithoutRef, RefAttributes } from 'react' */

/** @typedef {ThemeScales & { readonly breakpoints?: import('@tonic-ui/utils/internal').Breakpoints<string>, readonly containerQueries?: import('@tonic-ui/utils/internal').ContainerQueries<string> }} SxTheme */

/**
 * @typedef {{ [key: string]: string | number | boolean | null | undefined | SxStyleObject | ((theme: SxTheme) => string | number | boolean | null | undefined | SxStyleObject) }} SxStyleObject
 */

/** @typedef {SxStyleObject | ((theme: SxTheme) => SxStyleObject | SxStyleArray) | boolean | null | undefined} SxStyleItem */
/** @typedef {Array<SxStyleItem>} SxStyleArray */

/**
 * @typedef {Object} BoxProps
 * @property {ElementType} [as] - The element type to render as.
 * @property {SxStyleObject | ((theme: SxTheme) => SxStyleObject | SxStyleArray) | SxStyleArray} [sx] - Custom styles as an object, theme callback, or composition array.
 */

/**
 * Box is a primitive component for styling and layout.
 * It accepts all HTML attributes and style props from the styled system.
 * @type {ForwardRefExoticComponent<StyleProps & ComponentPropsWithoutRef<'div'> & BoxProps & RefAttributes<HTMLElement>>}
 */
const Box = forwardRef((props, ref) => {
  const context = useContext(ColorModeContext);

  // Inject __colorMode from ColorModeContext if available
  if (context?.colorMode) {
    return <BaseBox ref={ref} {...props} __colorMode={context.colorMode} />;
  }

  return <BaseBox ref={ref} {...props} />;
});

Box.displayName = 'Box';

export {
  Box,
};
