// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import TVIcon from '../TVIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `TVIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const TvIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `TvIcon` component is deprecated and will be removed in the next major release. Use the `TVIcon` component instead.');
  });

  return (
    <TVIcon ref={ref} {...props} />
  );
});

TvIcon.displayName = 'TVIcon';
TvIcon._isDeprecated = true;

export default TvIcon;
