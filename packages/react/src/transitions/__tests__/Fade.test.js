import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Fade } from '@tonic-ui/react/src';
import React from 'react';

describe('Fade', () => {
  it('applies correct styles when entering', () => {
    const { rerender } = render(
      <Fade in={false} data-testid="fade">
        <Box />
      </Fade>
    );

    rerender(
      <Fade in={true} data-testid="fade">
        <Box />
      </Fade>
    );

    const fade = screen.getByTestId('fade');
    expect(fade).toHaveStyle('opacity: 1');
    expect(fade).toHaveStyle('transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(fade).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when entered', () => {
    render(
      <Fade in={true} data-testid="fade">
        <Box />
      </Fade>
    );

    const fade = screen.getByTestId('fade');
    expect(fade).toHaveStyle('opacity: 1');
    expect(fade).toHaveStyle('transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(fade).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exiting', () => {
    const { rerender } = render(
      <Fade in={true} data-testid="fade">
        <Box />
      </Fade>
    );

    rerender(
      <Fade in={false} data-testid="fade">
        <Box />
      </Fade>
    );

    const fade = screen.getByTestId('fade');
    expect(fade).toHaveStyle('opacity: 0');
    expect(fade).toHaveStyle('transition: opacity 195ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(fade).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exited', () => {
    render(
      <Fade in={false} data-testid="fade">
        <Box />
      </Fade>
    );

    const fade = screen.getByTestId('fade');
    expect(fade).toHaveStyle('opacity: 0');
    expect(fade).toHaveStyle('transition: opacity 195ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(fade).toHaveStyle('visibility: hidden');
  });
});
