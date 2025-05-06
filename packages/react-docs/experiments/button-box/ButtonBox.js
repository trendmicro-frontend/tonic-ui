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

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent scrolling when Space is pressed
      onClickProp?.(event);
    }

    onKeyDownProp?.(event);
  }, [disabled, onClickProp, onKeyDownProp]);

  const styleProps = useButtonBoxStyle({ disabled });

  return (
    <Box
      ref={ref}
      role="button"
      aria-disabled={ariaAttr(disabled)}
      tabIndex={disabled ? -1 : (tabIndex ?? 0)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default ButtonBox;
