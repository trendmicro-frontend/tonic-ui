import { forwardRef, memo } from 'react';
import SVGIcon from '../SVGIcon';

/** @import { ReactNode, MemoExoticComponent, ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * Creates an SVG icon component from SVG content.
 * @type {(svgIcon: ReactNode, options: string | { displayName?: string }) => MemoExoticComponent<ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>>}
 */
const createSVGIcon = (svgIcon, options) => {
  const displayName = (typeof options === 'string') ? options : options?.displayName;
  const Component = forwardRef((props, ref) => {
    return (
      <SVGIcon
        data-icon={displayName}
        ref={ref}
        {...props}
      >
        {svgIcon}
      </SVGIcon>
    );
  });

  Component.displayName = displayName;

  return memo(Component);
};

export default createSVGIcon;
