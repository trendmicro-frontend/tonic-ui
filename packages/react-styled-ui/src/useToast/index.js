import React, { useCallback } from 'react';
import toaster from 'toasted-notes';
import ColorModeProvider from '../ColorModeProvider';
import ThemeProvider from '../ThemeProvider';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const useToast = () => {
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

      if (typeof render !== 'function') {
        return null;
      }

      return toaster.notify(
        ({ onClose, id }) => (
          <ThemeProvider theme={theme}>
            <ColorModeProvider value={colorMode}>
              {render({ onClose, id })}
            </ColorModeProvider>
          </ThemeProvider>
        ),
        options,
      );
    },
    [theme, colorMode],
  );

  return notify;
};

export default useToast;
