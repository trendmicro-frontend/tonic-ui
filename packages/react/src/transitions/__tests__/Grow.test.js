import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Grow } from '@tonic-ui/react/src';
import React from 'react';

// `timeout="auto"` derives its duration from the rendered `clientHeight`, which
// needs real layout; that behavior is covered by the browser suite in
// packages/react/test/e2e/components/transitions.spec.mjs. These cases keep the
// deterministic numeric-timeout style mapping that does not depend on layout.
describe('Grow', () => {
  const boxHeight = 100;

  it('applies correct styles when entering (timeout=150)', () => {
    const timeout = 150;
    const { rerender } = render(
      <Grow in={false} timeout={timeout} data-testid="grow">
        <Box height={boxHeight} />
      </Grow>
    );

    rerender(
      <Grow in={true} timeout={timeout} data-testid="grow">
        <Box height={boxHeight} />
      </Grow>
    );

    const grow = screen.getByTestId('grow');
    expect(grow).toHaveStyle('opacity: 1');
    expect(grow).toHaveStyle('transform: scale(1, 1)');
    expect(grow).toHaveStyle('transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),transform 100ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(grow).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when entered (timeout=150)', () => {
    const timeout = 150;
    render(
      <Grow in={true} timeout={timeout} data-testid="grow">
        <Box height={boxHeight} />
      </Grow>
    );

    const grow = screen.getByTestId('grow');
    expect(grow).toHaveStyle('opacity: 1');
    expect(grow).toHaveStyle('transform: none');
    expect(grow).toHaveStyle('transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),transform 100ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(grow).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exiting (timeout=150)', () => {
    const timeout = 150;
    const { rerender } = render(
      <Grow in={true} timeout={timeout} data-testid="grow">
        <Box height={boxHeight} />
      </Grow>
    );

    rerender(
      <Grow in={false} timeout={timeout} data-testid="grow">
        <Box height={boxHeight} />
      </Grow>
    );

    const grow = screen.getByTestId('grow');
    expect(grow).toHaveStyle('opacity: 0');
    expect(grow).toHaveStyle('transform: scale(0.75, 0.5625)');
    expect(grow).toHaveStyle('transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),transform 100ms cubic-bezier(0.4, 0, 0.2, 1) 50ms');
    expect(grow).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exited (timeout=150)', () => {
    const timeout = 150;
    render(
      <Grow in={false} timeout={timeout} data-testid="grow">
        <Box height={boxHeight} />
      </Grow>
    );

    const grow = screen.getByTestId('grow');
    expect(grow).toHaveStyle('opacity: 0');
    expect(grow).toHaveStyle('transform: scale(0.75, 0.5625)');
    expect(grow).toHaveStyle('transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),transform 100ms cubic-bezier(0.4, 0, 0.2, 1) 50ms');
    expect(grow).toHaveStyle('visibility: hidden');
  });
});
