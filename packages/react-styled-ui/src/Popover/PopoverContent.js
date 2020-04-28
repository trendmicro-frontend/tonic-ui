import wrapEvent from '../utils/wrapEvent';
import { usePopover } from './context';
import Popper, { PopperArrow } from '../Popper';
import { usePopoverContentStyle } from './styles';

const PopoverContent = ({
  onKeyDown,
  onBlur: onBlurProp,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  children,
  'aria-label': ariaLabel,
  ...props
}) => {
  const {
    popoverRef,
    referenceRef,
    placement,
    popoverId,
    isOpen,
    onBlur,
    closeOnEsc,
    onClose,
    isHoveringRef,
    trigger,
    headerId,
    bodyId,
    usePortal,
    hideArrow,
    skidding,
    distance,
    delay,
  } = usePopover();
  const contentStyleProps = usePopoverContentStyle();
  const arrowSize = 12;
  const _distance = distance + 8; // Arrow height is 8px
  let eventHandlers = {};
  let roleProps = {};

  if (trigger === 'click') {
    eventHandlers = {
      onBlur: wrapEvent(onBlurProp, onBlur),
    };

    roleProps = {
      role: 'dialog',
      'aria-modal': 'false',
    };
  }

  if (trigger === 'hover') {
    eventHandlers = {
      onMouseEnter: wrapEvent(onMouseEnter, () => {
        isHoveringRef.current = true;
      }),
      onMouseLeave: wrapEvent(onMouseLeave, () => {
        isHoveringRef.current = false;
        setTimeout(onClose, delay.hide);
      }),
    };

    roleProps = {
      role: 'tooltip',
    };
  }

  eventHandlers = {
    ...eventHandlers,
    onKeyDown: wrapEvent(onKeyDown, event => {
      if (event.key === 'Escape' && closeOnEsc) {
        onClose && onClose();
      }
    }),
  };

  return (
    <Popper
      as="section"
      usePortal={usePortal}
      isOpen={isOpen}
      placement={placement}
      aria-label={ariaLabel}
      anchorEl={referenceRef.current}
      ref={popoverRef}
      id={popoverId}
      aria-hidden={!isOpen}
      arrowSize={`${arrowSize}px`}
      modifiers={{ offset: [skidding, _distance] }}
      aria-labelledby={headerId}
      aria-describedby={bodyId}
      {...contentStyleProps}
      {...roleProps}
      {...eventHandlers}
      {...props}
    >
      {!hideArrow && <PopperArrow />}
      {children}
    </Popper>
  );
};

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
