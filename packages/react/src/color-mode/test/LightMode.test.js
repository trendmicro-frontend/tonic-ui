import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import LightMode from '../LightMode';
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
