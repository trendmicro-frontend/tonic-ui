// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import ConnectNoIPIcon from '../ConnectNoIPIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `ConnectNoIPIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const ConnectNoipIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ConnectNoipIcon` component is deprecated and will be removed in the next major release. Use the `ConnectNoIPIcon` component instead.');
  });

  return (
    <ConnectNoIPIcon ref={ref} {...props} />
  );
});

ConnectNoipIcon.displayName = 'ConnectNoIPIcon';
ConnectNoipIcon._isDeprecated = true;

export default ConnectNoipIcon;
