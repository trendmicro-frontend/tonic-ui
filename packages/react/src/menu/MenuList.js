import { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import MenuContent from './MenuContent';
import { useMenuListStyle } from './styles';

/**
 * @typedef {Object} MenuListProps
 * @property {React.ElementType} [PopperComponent=Popper] - The component used for the popover.
 * @property {object} [PopperProps] - Props applied to the Popper component.
 * @property {React.ElementType} [TransitionComponent=Collapse] - The component used for the transition.
 * @property {{ appear?: boolean; timeout?: number | { appear?: number; enter?: number; exit?: number } }} [TransitionProps] - Props applied to the Transition element.
 * @property {boolean} [TransitionProps.appear=true] - Whether to perform the enter transition when it first mounts.
 * @property {React.ReactNode} [children] - The menu items to be displayed.
 */

/**
 * @type {ForwardRefComponent<'div', MenuListProps>}
 */
const MenuList = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'MenuList' });
  const styleProps = useMenuListStyle();

  return (
    <MenuContent
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
