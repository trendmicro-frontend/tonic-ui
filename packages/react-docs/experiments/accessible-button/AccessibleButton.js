import { Box } from '@tonic-ui/react';
import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import {
  useAccessibleButtonRootStyle,
  useAccessibleButtonBaseStyle,
} from './styles';

const AccessibleButton = forwardRef(function AccessibleButton(
  {
    disabled = false,
    onClick,
    onKeyDown,
    tabIndex,
    children,
    ...rest
  },
  ref
) {
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const handleKeyDown = (event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent scrolling when Space is pressed
      onClick?.(event);
    }

    onKeyDown?.(event);
  };

  const rootStyleProps = useAccessibleButtonRootStyle({ cursor: rest.cursor, disabled });
  const baseStyleProps = useAccessibleButtonBaseStyle({ disabled });

  return (
    <Box
      {...rootStyleProps}
    >
      <Box
        ref={ref}
        role="button"
        aria-disabled={ariaAttr(disabled)}
        tabIndex={disabled ? -1 : (tabIndex ?? 0)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...baseStyleProps}
        {...rest}
      >
        {children}
      </Box>
    </Box>
  );
});

export default AccessibleButton;
