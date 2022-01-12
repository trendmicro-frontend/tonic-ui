import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LightMode from '../LightMode';
import TestComponent from './TestComponent';

const getToggleColorModeButton = () => {
  return screen.getByRole('button');
};

describe('<LightMode />', () => {
  test('always light mode', () => {
    render(
      <LightMode>
        <TestComponent />
      </LightMode>
    );

    expect(getToggleColorModeButton()).toHaveTextContent('light');

    userEvent.click(getToggleColorModeButton());

    expect(getToggleColorModeButton()).toHaveTextContent('light');
  });
});
