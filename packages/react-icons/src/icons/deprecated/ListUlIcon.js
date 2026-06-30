// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import ListULIcon from '../ListULIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `ListULIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const ListUlIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ListUlIcon` component is deprecated and will be removed in the next major release. Use the `ListULIcon` component instead.');
  });

  return (
    <ListULIcon ref={ref} {...props} />
  );
});

ListUlIcon.displayName = 'ListULIcon';
ListUlIcon._isDeprecated = true;

export default ListUlIcon;
