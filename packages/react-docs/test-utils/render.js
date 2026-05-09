import { matchers } from '@emotion/jest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PortalManager,
  ToastManager,
  TonicProvider,
  createTheme,
} from '@tonic-ui/react';

// https://emotion.sh/docs/@emotion/jest#tohavestylerule
//
// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const customRender = (ui, options) => {
  const {
    theme: themeOptions = {
      cssVariables: {
        prefix: 'tonic',
        rootSelector: ':root',
      },
    },
    ...rest
  } = { ...options };

  const wrapper = ({ children }) => (
    <TonicProvider
      colorMode={{
        defaultValue: 'dark',
      }}
      theme={createTheme(themeOptions)}
    >
      <PortalManager>
        <ToastManager>
          {children}
        </ToastManager>
      </PortalManager>
    </TonicProvider>
  );

  return render(ui, { wrapper, ...rest });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
