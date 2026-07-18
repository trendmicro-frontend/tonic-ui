// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import IEIcon from '../IEIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `IEIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const IeIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `IeIcon` component is deprecated and will be removed in the next major release. Use the `IEIcon` component instead.');
  });

  return (
    <IEIcon ref={ref} {...props} />
  );
});

IeIcon.displayName = 'IEIcon';
IeIcon._isDeprecated = true;

export default IeIcon;
