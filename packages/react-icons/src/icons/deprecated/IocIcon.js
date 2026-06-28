// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import IOCIcon from '../IOCIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `IOCIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const IocIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `IocIcon` component is deprecated and will be removed in the next major release. Use the `IOCIcon` component instead.');
  });

  return (
    <IOCIcon ref={ref} {...props} />
  );
});

IocIcon.displayName = 'IOCIcon';
IocIcon._isDeprecated = true;

export default IocIcon;
