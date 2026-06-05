import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useButtonEventHandlers from '../utils/useButtonEventHandlers';
import {
  useMenuToggleStyle,
} from './styles';
import useMenu from './useMenu';

const MenuToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
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
    disabled,
    onActivate: () => ensureFunction(toggleMenu)(),
  });

  const getMenuToggleProps = () => ({
    'aria-controls': menuId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isOpen),
    'aria-haspopup': 'menu',
    disabled,
    id: menuToggleId,
    onClick: callEventHandlers(onClickProp, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, onKeyDown),
    ref: combinedRef,
    role: 'button',
    tabIndex: 0,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getMenuToggleProps,
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
