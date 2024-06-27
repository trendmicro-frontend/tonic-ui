import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Slide } from '@tonic-ui/react/src';
import React from 'react';

describe('Slide', () => {
  const directions = ['left', 'right', 'up', 'down'];
  const transitionStyles = {
    left: 'translateX(100%)',
    right: 'translateX(-100%)',
    up: 'translateY(100%)',
    down: 'translateY(-100%)',
  };

  directions.forEach((direction) => {
    it(`applies correct styles when entering (direction: ${direction})`, () => {
      const { rerender } = render(
        <Slide in={false} direction={direction} data-testid={`slide-${direction}`}>
          <Box />
        </Slide>
      );

      rerender(
        <Slide in={true} direction={direction} data-testid={`slide-${direction}`}>
          <Box />
        </Slide>
      );

      const slide = screen.getByTestId(`slide-${direction}`);
      expect(slide).toHaveStyle('transform: none');
      expect(slide).toHaveStyle('transition: transform 225ms cubic-bezier(0.0, 0, 0.2, 1)');
      expect(slide).not.toHaveStyle('visibility: hidden');
    });

    it(`applies correct styles when entered (direction: ${direction})`, () => {
      render(
        <Slide in={true} direction={direction} data-testid={`slide-${direction}`}>
          <Box />
        </Slide>
      );

      const slide = screen.getByTestId(`slide-${direction}`);
      expect(slide).toHaveStyle('transform: none');
      expect(slide).toHaveStyle('transition: transform 225ms cubic-bezier(0.0, 0, 0.2, 1)');
      expect(slide).not.toHaveStyle('visibility: hidden');
    });

    it(`applies correct styles when exiting (direction: ${direction})`, () => {
      const { rerender } = render(
        <Slide in={true} direction={direction} data-testid={`slide-${direction}`}>
          <Box />
        </Slide>
      );

      rerender(
        <Slide in={false} direction={direction} data-testid={`slide-${direction}`}>
          <Box />
        </Slide>
      );

      const slide = screen.getByTestId(`slide-${direction}`);
      expect(slide).toHaveStyle(`transform: ${transitionStyles[direction]}`);
      expect(slide).toHaveStyle('transition: transform 195ms cubic-bezier(0.4, 0, 0.6, 1)');
      expect(slide).not.toHaveStyle('visibility: hidden');
    });

    it(`applies correct styles when exited (direction: ${direction})`, () => {
      render(
        <Slide in={false} direction={direction} data-testid={`slide-${direction}`}>
          <Box />
        </Slide>
      );

      const slide = screen.getByTestId(`slide-${direction}`);
      expect(slide).toHaveStyle(`transform: ${transitionStyles[direction]}`);
      expect(slide).toHaveStyle('transition: transform 195ms cubic-bezier(0.4, 0, 0.6, 1)');
      expect(slide).toHaveStyle('visibility: hidden');
    });
  });
});
