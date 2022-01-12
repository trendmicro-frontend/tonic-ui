import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DarkMode from '../DarkMode';
import TestComponent from './TestComponent';

const getToggleColorModeButton = () => {
  return screen.getByRole('button');
};

describe('<DarkMode />', () => {
  test('always dark mode', () => {
    render(
      <DarkMode>
        <TestComponent />
      </DarkMode>
    );

    expect(getToggleColorModeButton()).toHaveTextContent('dark');

    userEvent.click(getToggleColorModeButton());

    expect(getToggleColorModeButton()).toHaveTextContent('dark');
  });
});
