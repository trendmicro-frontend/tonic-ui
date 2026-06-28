import { ButtonBase, useTheme } from '@tonic-ui/react';
import { CloseIcon } from '@tonic-ui/react-icons';
import {
  createTransitionStyle,
} from '@tonic-ui/utils';
import { forwardRef } from 'react';

const useIconButtonStyle = ({ size = '8x' }) => {
  const theme = useTheme();
  const color = 'text.secondary';
  const activeColor = 'text.primary';
  const hoverColor = 'text.primary';
  const focusColor = 'text.secondary';
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 1,
    borderColor: 'transparent',
    borderRadius: '_control.sm',
    color,
    width: size,
    height: size,
    transition: createTransitionStyle(['border-color', 'box-shadow', 'color'], { duration: 200 }),
    _hover: {
      color: hoverColor,
      backgroundColor: '_foreground.subtle.hovered',
    },
    _active: {
      color: activeColor,
    },
    _focus: {
      borderColor: '_component.keyboardFocused.outerFocusRing',
      boxShadow: `inset 0 0 0 1px ${theme.get('colors._component.keyboardFocused.outerFocusRing')}`,
      color: focusColor,
      '&:hover': {
        color: focusHoverColor,
      },
      '&:active': {
        borderColor: '_component.keyboardFocused.outerFocusRing',
        boxShadow: `inset 0 0 0 1px ${theme.get('colors._component.keyboardFocused.outerFocusRing')}`,
        color: focusActiveColor,
      },
    },
  };
};

const IconButton = forwardRef((
  {
    size = '8x',
    ...rest
  },
  ref,
) => {
  const styleProps = useIconButtonStyle({ size });

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});
IconButton.displayName = 'IconButton';

const App = () => {
  return (
    <IconButton>
      <CloseIcon />
    </IconButton>
  );
};

export default App;
