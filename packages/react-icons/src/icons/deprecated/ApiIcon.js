// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import APIIcon from '../APIIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `APIIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const ApiIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ApiIcon` component is deprecated and will be removed in the next major release. Use the `APIIcon` component instead.');
  });

  return (
    <APIIcon ref={ref} {...props} />
  );
});

ApiIcon.displayName = 'APIIcon';
ApiIcon._isDeprecated = true;

export default ApiIcon;
