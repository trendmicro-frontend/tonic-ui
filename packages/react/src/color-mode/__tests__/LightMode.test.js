import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LightMode, useColorMode } from '@tonic-ui/react/src';
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

describe('<LightMode />', () => {
  test('always light mode', async () => {
    const user = userEvent.setup()

    render(
      <LightMode>
        <TestApp />
      </LightMode>
    );

    expect(getToggleColorModeButton()).toHaveTextContent('light');

    await user.click(getToggleColorModeButton());

    expect(getToggleColorModeButton()).toHaveTextContent('light');
  });
});
