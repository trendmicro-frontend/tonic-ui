import { act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { render } from './render';

expect.extend(toHaveNoViolations);

const testA11y = async (ui, options) => {
  const { axeOptions, ...rest } = { ...options };
  const container = React.isValidElement(ui)
    ? render(ui, rest).container
    : ui;
  await act(async () => {
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });
};

export {
  testA11y,
};
