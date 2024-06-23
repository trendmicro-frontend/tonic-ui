import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Zoom } from '@tonic-ui/react/src';
import React from 'react';

describe('Zoom', () => {
  it('applies correct styles when entering', () => {
    const { rerender } = render(
      <Zoom in={false} data-testid="zoom">
        <Box />
      </Zoom>
    );

    rerender(
      <Zoom in={true} data-testid="zoom">
        <Box />
      </Zoom>
    );

    const zoom = screen.getByTestId('zoom');
    expect(zoom).toHaveStyle('transform: none');
    expect(zoom).toHaveStyle('transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(zoom).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when entered', () => {
    render(
      <Zoom in={true} data-testid="zoom">
        <Box />
      </Zoom>
    );

    const zoom = screen.getByTestId('zoom');
    expect(zoom).toHaveStyle('transform: none');
    expect(zoom).toHaveStyle('transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(zoom).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exiting', () => {
    const { rerender } = render(
      <Zoom in={true} data-testid="zoom">
        <Box />
      </Zoom>
    );

    rerender(
      <Zoom in={false} data-testid="zoom">
        <Box />
      </Zoom>
    );

    const zoom = screen.getByTestId('zoom');
    expect(zoom).toHaveStyle('transform: scale(0)');
    expect(zoom).toHaveStyle('transition: transform 195ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(zoom).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exited', () => {
    render(
      <Zoom in={false} data-testid="zoom">
        <Box />
      </Zoom>
    );

    const zoom = screen.getByTestId('zoom');
    expect(zoom).toHaveStyle('transform: scale(0)');
    expect(zoom).toHaveStyle('transition: transform 195ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(zoom).toHaveStyle('visibility: hidden');
  });
});
