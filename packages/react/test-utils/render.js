import { matchers } from '@emotion/jest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as React from 'react';
import {
  PortalManager,
  ToastManager,
  TonicProvider,
  theme,
} from '../src';

// https://emotion.sh/docs/@emotion/jest#tohavestylerule
//
// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const customRender = (ui, options) => {
  const wrapper = ({ children }) => (
    <TonicProvider
      colorMode={{
        defaultValue: 'dark',
      }}
      theme={{
        ...theme,
        config: {
          ...theme.config,
          useCSSVariables: options?.useCSSVariables,
        },
      }}
    >
      <PortalManager>
        <ToastManager>
          {children}
        </ToastManager>
      </PortalManager>
    </TonicProvider>
  );

  return render(ui, { wrapper, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
