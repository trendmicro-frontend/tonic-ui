// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import ListOLIcon from '../ListOLIcon';

/** @import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react' */

/**
 * @deprecated Use `ListOLIcon` instead.
 * @type {ForwardRefExoticComponent<StyleProps & SVGProps<SVGSVGElement> & import('../../SVGIcon').SVGIconProps & RefAttributes<SVGSVGElement>>}
 */
const ListOlIcon = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ListOlIcon` component is deprecated and will be removed in the next major release. Use the `ListOLIcon` component instead.');
  });

  return (
    <ListOLIcon ref={ref} {...props} />
  );
});

ListOlIcon.displayName = 'ListOLIcon';
ListOlIcon._isDeprecated = true;

export default ListOlIcon;
