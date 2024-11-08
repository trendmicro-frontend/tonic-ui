import { screen } from '@testing-library/react';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Stack } from '@tonic-ui/react/src';
import React from 'react';

describe('Stack', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Stack spacing="4x">
        <Box />
        <Box />
        <Box />
      </Stack>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should apply the default direction of column', () => {
    render(
      <Stack data-testid="stack">
        <Box />
        <Box />
      </Stack>
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle('flex-direction: column');
  });

  it('should apply the custom direction when specified', () => {
    render(
      <>
        <Stack data-testid="stack-row" direction="row">
          <Box />
          <Box />
        </Stack>
        <Stack data-testid="stack-column" direction="column">
          <Box />
          <Box />
        </Stack>
      </>
    );

    expect(screen.getByTestId('stack-row')).toHaveStyle('flex-direction: row');
    expect(screen.getByTestId('stack-column')).toHaveStyle('flex-direction: column');
  });

  it('should apply spacing between child elements', () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    render((
      <Stack data-testid="stack" spacing="2x">
        <Box />
        <Box />
      </Stack>
    ), renderOptions);

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle('row-gap: var(--tonic-sizes-2x)');
  });

  it('should not wrap each child by default when shouldWrapChildren is false', () => {
    render(
      <Stack data-testid="stack">
        <Box data-testid="stack-item-1" />
        <Box data-testid="stack-item-2" />
      </Stack>
    );

    const stack = screen.getByTestId('stack');
    expect(stack.children).toHaveLength(2);
    expect(stack.children[0]).toHaveAttribute('data-testid', 'stack-item-1');
    expect(stack.children[1]).toHaveAttribute('data-testid', 'stack-item-2');
  });

  it('should wrap each child when shouldWrapChildren is true', () => {
    render(
      <Stack data-testid="stack" shouldWrapChildren>
        <Box data-testid="stack-item-1" />
        <Box data-testid="stack-item-2" />
      </Stack>
    );

    const stack = screen.getByTestId('stack');
    expect(stack.children).toHaveLength(2);
    expect(stack.children[0].firstChild).toHaveAttribute('data-testid', 'stack-item-1');
    expect(stack.children[1].firstChild).toHaveAttribute('data-testid', 'stack-item-2');
  });
});
