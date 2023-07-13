import { render, screen } from '@testing-library/react';
import {
  Box,
  DarkMode,
  InvertedMode,
  LightMode,
  useColorMode,
} from '@tonic-ui/react/src';
import React from 'react';

describe('InvertedMode', () => {
  it('should invert dark mode to light mode', () => {
    const TestComponent = () => {
      const [colorMode] = useColorMode();
      return (
        <Box data-testid="color-mode">{colorMode}</Box>
      );
    };

    render(
      <DarkMode>
        <InvertedMode>
          <TestComponent />
        </InvertedMode>
      </DarkMode>
    );

    expect(screen.getByTestId('color-mode')).toHaveTextContent('light');
  });

  it('should invert light mode to dark mode', () => {
    const TestComponent = () => {
      const [colorMode] = useColorMode();
      return (
        <Box data-testid="color-mode">{colorMode}</Box>
      );
    };

    render(
      <LightMode>
        <InvertedMode>
          <TestComponent />
        </InvertedMode>
      </LightMode>
    );

    expect(screen.getByTestId('color-mode')).toHaveTextContent('dark');
  });
});
