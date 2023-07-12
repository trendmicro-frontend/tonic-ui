import { render, screen } from '@testing-library/react';
import { Box, LightMode, useColorMode } from '@tonic-ui/react/src';
import React from 'react';

describe('LightMode', () => {
  it('should render in light mode', () => {
    const TestComponent = () => {
      const [colorMode] = useColorMode();
      return (
        <Box data-testid="color-mode">{colorMode}</Box>
      );
    };

    render(
      <LightMode>
        <TestComponent />
      </LightMode>
    );

    expect(screen.getByTestId('color-mode')).toHaveTextContent('light');
  });
});
