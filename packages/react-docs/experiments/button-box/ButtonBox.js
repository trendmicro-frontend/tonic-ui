import { Box } from '@tonic-ui/react';
import { useEventCallback } from '@tonic-ui/react-hooks';
import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import {
  useButtonBoxStyle,
} from './styles';

const ButtonBox = forwardRef((
  {
    disabled = false,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    tabIndex,
    children,
    ...rest
  },
  ref,
) => {
  const onClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClickProp?.(event);
  }, [disabled, onClickProp]);

  const onKeyDown = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ') {
      // Prevent default scrolling behavior for the Space key
      event.preventDefault();
    } else if (event.key === 'Enter' && !event.repeat) {
      // Prevent default behavior and trigger click handler only on first Enter key press
      event.preventDefault();
      onClickProp?.(event);
    }

    onKeyDownProp?.(event);
  }, [disabled, onClickProp, onKeyDownProp]);

  const onKeyUp = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ' && !event.repeat) {
      // Prevent default behavior and trigger click handler only on first Space key press
      event.preventDefault();
      onClickProp?.(event);
    }

    onKeyUpProp?.(event);
  }, [disabled, onClickProp, onKeyUpProp]);

  const styleProps = useButtonBoxStyle({ disabled });

  return (
    <Box
      ref={ref}
      role="button"
      aria-disabled={ariaAttr(disabled)}
      tabIndex={disabled ? -1 : (tabIndex ?? 0)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

ButtonBox.displayName = 'ButtonBox';

export default ButtonBox;
