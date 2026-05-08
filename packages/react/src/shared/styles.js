/**
 * Shared base style for icon buttons.
 *
 * The `_disabled` block here only resets `color`. Consumers that define a
 * `_hover` background must add their own `_disabled` block to override it.
 *
 * Consumers:
 *
 * | Close Button      | Style hook                | Parent exposes `disabled`? | Passes `disabled` to `ButtonBase`? | Needs own `_disabled`? |
 * | ----------------- | ------------------------- | -------------------------- | ---------------------------------- | ---------------------- |
 * | AlertCloseButton  | useAlertCloseButtonStyle  | no                         | no                                 | no                     |
 * | DrawerCloseButton | useDrawerCloseButtonStyle | no                         | no                                 | no                     |
 * | ModalCloseButton  | useModalCloseButtonStyle  | no                         | no                                 | no                     |
 * | TagCloseButton    | useTagCloseButtonStyle    | no                         | no                                 | no                     |
 * | ToastCloseButton  | useToastCloseButtonStyle  | no                         | no                                 | no                     |
 */
const useIconButtonStyle = ({
  color,
  size = '8x',
}) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    width: size,
    height: size,
    _disabled: {
      color: color,
    },
  };
};

export {
  useIconButtonStyle,
};
