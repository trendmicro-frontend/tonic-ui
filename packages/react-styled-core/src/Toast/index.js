import React, { createContext, useContext, forwardRef, useCallback } from 'react';
import toaster from 'toasted-notes';
import ThemeProvider from '../ThemeProvider';
import ColorModeProvider from '../ColorModeProvider';
import useTheme from '../useTheme';
import useColorMode from '../useColorMode';
import Box from '../Box';
import PseudoBox from '../PseudoBox';
import { AlertButton as ToastButton } from '../Alert';
import Icon from '../Icon';
import { useToastStyle, useToastIconStyle } from './styles';

const statuses = {
  success: {
    icon: 'check-circle',
    color: 'green',
  },
  warning: {
    icon: 'warning-triangle',
    color: 'yellow'
  },
  error: {
    icon: 'circle-close',
    color: 'red'
  },
};

const ToastContext = createContext();

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error(
      'useToastContext must be used within a ToastContext.Provider',
    );
  }
  return context;
};

const Toast = ({ status = 'success', ...rest }) => {
  const styleProps = useToastStyle({
    status,
    color: statuses[status] && statuses[status].color,
  });

  const context = { status };

  return (
    <ToastContext.Provider value={context}>
      <Box {...styleProps} {...rest} />
    </ToastContext.Provider>
  );
};

const ToastIcon = props => {
  const { status } = useToastContext();
  const iconName = statuses[status] && statuses[status].icon;
  const iconProps = useToastIconStyle({
    status,
    color: statuses[status] && statuses[status].color,
  });

  return (
    <Icon
      mr="2x"
      size="4x"
      name={`_core.${iconName}`}
      {...iconProps}
      {...props}
    />
  );
};

function useToast() {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const notify = useCallback(
    ({
      position = 'top',
      duration = 5000,
      render,
      status,
    }) => {
      const options = {
        position,
        duration,
      };

      if (render) {
        return toaster.notify(
          ({ onClose, id }) => (
            <ThemeProvider theme={theme}>
              <ColorModeProvider value={colorMode}>
                <Box margin={8}>
                  {render({ onClose, id })}
                </Box>
              </ColorModeProvider>
            </ThemeProvider>
          ),
          options,
        );
      }
    },
    [theme],
  );

  return notify;
}

export { useToast, Toast, ToastIcon, ToastButton };
