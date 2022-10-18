import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useCallback } from 'react';
import LightMode from '../LightMode';
import useColorMode from '../useColorMode';

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
    render(
      <LightMode>
        <TestApp />
      </LightMode>
    );

    expect(getToggleColorModeButton()).toHaveTextContent('light');

    await userEvent.click(getToggleColorModeButton());

    expect(getToggleColorModeButton()).toHaveTextContent('light');
  });
});
