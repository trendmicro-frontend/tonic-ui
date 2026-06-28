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
  const theme = createTheme({
    cssVariables: {
      prefix: 'tonic',
      rootSelector: ':root',
    },
  });

  const wrapper = ({ children }) => (
    <TonicProvider
      colorMode={{
        defaultValue: 'dark',
      }}
      theme={theme}
      useCSSVariables
    >
      <PortalManager>
        <ToastManager>
          {children}
        </ToastManager>
      </PortalManager>
    </TonicProvider>
  );

  return render(ui, { wrapper });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
