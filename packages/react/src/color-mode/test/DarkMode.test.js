import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DarkMode from '../DarkMode';
import useColorMode from '../useColorMode';

const TestApp = () => {
  const [colorMode, setColorMode] = useColorMode();
  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };
  return (
    <button type="button" onClick={toggleColorMode}>
      {colorMode}
    </button>
  );
};

const getToggleColorModeButton = () => {
  return screen.getByRole('button');
};

describe('<DarkMode />', () => {
  test('always dark mode', async () => {
    render(
      <DarkMode>
        <TestApp />
      </DarkMode>
    );

    expect(getToggleColorModeButton()).toHaveTextContent('dark');

    await userEvent.click(getToggleColorModeButton());

    expect(getToggleColorModeButton()).toHaveTextContent('dark');
  });
});
