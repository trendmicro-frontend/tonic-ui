import '@testing-library/jest-dom/extend-expect';
import { render as originalRender } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { TonicProvider } from '../src';

expect.extend(toHaveNoViolations);

const TonicProviderWrapper = (props) => (
  <TonicProvider {...props} />
);

const render = (ui, options) => {
  options = {
    wrapper: TonicProviderWrapper,
    ...options,
  };
  const result = originalRender(ui, options);
  return { ...result };
};

export {
  render,
};
