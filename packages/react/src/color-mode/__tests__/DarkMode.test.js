import { render, screen } from '@testing-library/react';
import { Box, DarkMode, useColorMode } from '@tonic-ui/react/src';

describe('DarkMode', () => {
  it('should render in dark mode', () => {
    const TestComponent = () => {
      const [colorMode] = useColorMode();
      return (
        <Box data-testid="color-mode">{colorMode}</Box>
      );
    };

    render(
      <DarkMode>
        <TestComponent />
      </DarkMode>
    );

    expect(screen.getByTestId('color-mode')).toHaveTextContent('dark');
  });
});
