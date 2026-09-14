import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useButtonEventHandlers from '../utils/useButtonEventHandlers';
import {
  useMenuToggleStyle,
} from './styles';
import useMenu from './useMenu';

/**
 * @typedef {Object} MenuToggleUserProps
 * @property {boolean} [disabled] - Whether the toggle element is disabled. Merged (OR) with the `disabled` prop to set `disabled`/`aria-disabled`; menu activation is gated by the internal handlers when the `disabled` prop is set.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Called before the internal click handler; the chain stops if the event is default-prevented.
 * @property {React.KeyboardEventHandler<HTMLButtonElement>} [onKeyDown] - Called before the internal keydown handler; the chain stops if the event is default-prevented.
 * @property {object} [otherKeys] - Any other keys are spread first, so menu wiring (`id`, `ref`, `role`, `tabIndex`, `aria-*`) and component props take precedence.
 */

/**
 * @typedef {Object} MenuToggleContext
 * @property {(userProps?: MenuToggleUserProps & Record<string, any>) => React.HTMLAttributes<HTMLButtonElement> & { ref: React.RefCallback<HTMLElement> }} getMenuToggleProps - Props to spread onto a custom toggle element. `disabled` merges (OR) with the `disabled` prop for `disabled`/`aria-disabled`; `onClick` and `onKeyDown` chain with the internal handlers; other keys are spread first and never override the menu wiring.
 * @property {(userProps?: MenuToggleUserProps & Record<string, any>) => React.HTMLAttributes<HTMLButtonElement> & { ref: React.RefCallback<HTMLElement> }} getToggleProps - Alias of `getMenuToggleProps`.
 */

/**
 * @typedef {Object} MenuToggleProps
 * @property {React.ReactNode | ((context: MenuToggleContext) => React.ReactNode)} [children] - The content of the menu toggle or a function that receives `{ getMenuToggleProps, getToggleProps }`.
 * @property {boolean} [disabled] - Whether the menu toggle is disabled.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Callback when the menu toggle is clicked.
 * @property {React.KeyboardEventHandler<HTMLButtonElement>} [onKeyDown] - Callback when the user presses a key.
 */

/**
 * @type {ForwardRefComponent<'button', MenuToggleProps>}
 */
const MenuToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled: disabledProp,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuToggle' });
  const menuContext = useMenu(); // context might be an undefined value
  const {
    isOpen,
    menuId,
    menuToggleId,
    menuToggleRef,
    onToggle: toggleMenu,
  } = { ...menuContext };
  const combinedRef = useMergeRefs(menuToggleRef, ref);
  const styleProps = useMenuToggleStyle();

  const { onClick, onKeyDown } = useButtonEventHandlers({
    disabled: disabledProp,
    onActivate: () => ensureFunction(toggleMenu)(),
  });

  const getMenuToggleProps = (userProps = {}) => {
    const {
      disabled: userDisabled,
      onClick: userOnClick,
      onKeyDown: userOnKeyDown,
      ...userRest
    } = userProps;
    const isDisabled = userDisabled || disabledProp;

    return {
      ...userRest,
      'aria-controls': menuId,
      'aria-disabled': ariaAttr(isDisabled),
      'aria-expanded': ariaAttr(isOpen),
      'aria-haspopup': 'menu',
      disabled: isDisabled,
      id: menuToggleId,
      onClick: callEventHandlers(userOnClick, onClickProp, onClick),
      onKeyDown: callEventHandlers(userOnKeyDown, onKeyDownProp, onKeyDown),
      ref: combinedRef,
      role: 'button',
      tabIndex: 0,
      ...styleProps,
      ...rest,
    };
  };

  if (typeof children === 'function') {
    return children({
      getMenuToggleProps,
      getToggleProps: getMenuToggleProps, // alias
    });
  }

  return (
    <ButtonBase {...getMenuToggleProps()}>
      {children}
    </ButtonBase>
  );
});

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
