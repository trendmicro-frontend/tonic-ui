// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import IPIcon from '../IPIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `IPIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const IpIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `IpIcon` component is deprecated and will be removed in the next major release. Use the `IPIcon` component instead.');
  });

  return (
    <IPIcon ref={ref} {...props} />
  );
});

IpIcon.displayName = 'IPIcon';
IpIcon._isDeprecated = true;

export default IpIcon;
