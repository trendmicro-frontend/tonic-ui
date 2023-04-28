import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { TonicProvider, theme } from '../src';

expect.extend(toHaveNoViolations);

const customRender = (ui, options) => {
  let wrapper = TonicProvider;
  const useCSSVariables = options?.useCSSVariables;
  if (useCSSVariables) {
    wrapper = ({ children }) => (
      <TonicProvider
        theme={{
          ...theme,
          config: {
            ...theme.config,
            useCSSVariables: true,
          },
        }}
      >
        {children}
      </TonicProvider>
    );
  }

  return render(ui, { wrapper, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
