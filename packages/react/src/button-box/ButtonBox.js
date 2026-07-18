import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useButtonBoxEventHandlers from '../utils/useButtonBoxEventHandlers';
import { useButtonBoxStyle } from './styles';

/**
 * `ButtonBox` looks and behaves like a button but renders a non-button element
 * (`<div role="button">`). Use it in contexts where a native `<button>` is not
 * permitted, such as a button nested inside another button.
 */

/**
 * @typedef {Object} ButtonBoxProps
 * @property {React.ReactNode} [children] - The content of the button box.
 * @property {boolean} [disabled] - If true, the control is disabled. This sets `aria-disabled=true` and you can style this state by passing the `_disabled` prop.
 * @property {React.MouseEventHandler} [onClick] - Callback fired when the control is activated by a mouse click, the Enter key, or the Space key.
 */

/**
 * @type {ForwardRefComponent<'div', ButtonBoxProps>}
 */
const ButtonBox = forwardRef((inProps, ref) => {
  const {
    disabled = false,
    onClick,
    onKeyDown,
    onKeyUp,
    tabIndex,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ButtonBox' });
  const handlers = useButtonBoxEventHandlers({ disabled, onActivate: onClick });
  const styleProps = useButtonBoxStyle({ disabled });

  return (
    <Box
      ref={ref}
      role="button"
      aria-disabled={ariaAttr(disabled)}
      tabIndex={disabled ? undefined : (tabIndex ?? 0)}
      {...styleProps}
      {...rest}
      onClick={handlers.onClick}
      onKeyDown={callEventHandlers(onKeyDown, handlers.onKeyDown)}
      onKeyUp={callEventHandlers(onKeyUp, handlers.onKeyUp)}
    />
  );
});

ButtonBox.displayName = 'ButtonBox';

export default ButtonBox;
