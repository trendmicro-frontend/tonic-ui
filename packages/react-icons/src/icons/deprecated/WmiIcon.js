// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import WMIIcon from '../WMIIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `WMIIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const WmiIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `WmiIcon` component is deprecated and will be removed in the next major release. Use the `WMIIcon` component instead.');
  });

  return (
    <WMIIcon ref={ref} {...props} />
  );
});

WmiIcon.displayName = 'WMIIcon';
WmiIcon._isDeprecated = true;

export default WmiIcon;
