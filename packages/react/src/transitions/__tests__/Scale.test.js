import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Scale } from '@tonic-ui/react/src';
import React from 'react';

describe('Scale', () => {
  it('applies correct styles when entering', () => {
    const { rerender } = render(
      <Scale in={false} data-testid="scale">
        <Box />
      </Scale>
    );

    rerender(
      <Scale in={true} data-testid="scale">
        <Box />
      </Scale>
    );

    const scale = screen.getByTestId('scale');
    expect(scale).toHaveStyle('transform: none');
    expect(scale).toHaveStyle('transition: transform 150ms cubic-bezier(0.0, 0, 0.2, 1)');
    expect(scale).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when entered', () => {
    render(
      <Scale in={true} data-testid="scale">
        <Box />
      </Scale>
    );

    const scale = screen.getByTestId('scale');
    expect(scale).toHaveStyle('transform: none');
    expect(scale).toHaveStyle('transition: transform 150ms cubic-bezier(0.0, 0, 0.2, 1)');
    expect(scale).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exiting', () => {
    const { rerender } = render(
      <Scale in={true} data-testid="scale">
        <Box />
      </Scale>
    );

    rerender(
      <Scale in={false} data-testid="scale">
        <Box />
      </Scale>
    );

    const scale = screen.getByTestId('scale');
    expect(scale).toHaveStyle('transform: scale(0.95, 0.95)');
    expect(scale).toHaveStyle('transition: transform 150ms cubic-bezier(0.4, 0, 1, 1)');
    expect(scale).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exited', () => {
    render(
      <Scale in={false} data-testid="scale">
        <Box />
      </Scale>
    );

    const scale = screen.getByTestId('scale');
    expect(scale).toHaveStyle('transform: scale(0.95, 0.95)');
    expect(scale).toHaveStyle('transition: transform 150ms cubic-bezier(0.4, 0, 1, 1)');
    expect(scale).toHaveStyle('visibility: hidden');
  });
});
