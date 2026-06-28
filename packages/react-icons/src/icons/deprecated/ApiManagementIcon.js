// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import APIManagementIcon from '../APIManagementIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `APIManagementIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const ApiManagementIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ApiManagementIcon` component is deprecated and will be removed in the next major release. Use the `APIManagementIcon` component instead.');
  });

  return (
    <APIManagementIcon ref={ref} {...props} />
  );
});

ApiManagementIcon.displayName = 'APIManagementIcon';
ApiManagementIcon._isDeprecated = true;

export default ApiManagementIcon;
