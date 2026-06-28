// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import NASIcon from '../NASIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `NASIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const NasIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `NasIcon` component is deprecated and will be removed in the next major release. Use the `NASIcon` component instead.');
  });

  return (
    <NASIcon ref={ref} {...props} />
  );
});

NasIcon.displayName = 'NASIcon';
NasIcon._isDeprecated = true;

export default NasIcon;
