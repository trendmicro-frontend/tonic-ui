import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DarkMode, useColorMode } from '@tonic-ui/react/src';
import React, { useCallback } from 'react';

const TestApp = () => {
  const [colorMode, setColorMode] = useColorMode();
  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);
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
