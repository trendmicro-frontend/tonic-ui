import { forwardRef, useContext } from 'react';
import BaseBox from './Box';
import { ColorModeContext } from '../internal/color-mode/context';

/** @import { ElementType, ForwardRefExoticComponent, ComponentPropsWithoutRef, RefAttributes } from 'react' */

/**
 * @typedef {{ [key: string]: string | number | boolean | null | undefined | SxStyleObject | Array<string | number | null> | ((theme: ThemeScales) => string | number | SxStyleObject) }} SxStyleObject
 */

/**
 * @typedef {Object} BoxProps
 * @property {ElementType} [as] - The element type to render as.
 * @property {SxStyleObject | ((theme: ThemeScales) => SxStyleObject) | Array<SxStyleObject | ((theme: ThemeScales) => SxStyleObject) | boolean | null | undefined>} [sx] - Custom styles that have access to the theme. Accepts a style object, a function receiving the theme, or an array of both.
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
