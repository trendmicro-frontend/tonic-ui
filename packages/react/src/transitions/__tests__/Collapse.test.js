import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Collapse } from '@tonic-ui/react/src';
import React from 'react';

describe('Collapse', () => {
  const boxHeight = 100;

  // In a JSDOM environment, elements do not have a real layout or rendering context.
  // We need to adjust the tests to mock the corresponding properties:
  const mockClientHeight = (height) => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: height,
    });
  };

  beforeEach(() => {
    mockClientHeight(boxHeight); // Default mock height, adjust as needed
  });

  afterEach(() => {
    // Clean up mock to avoid test pollution
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 0,
    });
  });

  it('applies correct styles when entering', () => {
    const { rerender } = render(
      <Collapse in={false} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    rerender(
      <Collapse in={true} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveStyle('height: 100px');
    expect(collapse).toHaveStyle('opacity: 1');
    expect(collapse).toHaveStyle('overflow: hidden');
    expect(collapse).toHaveStyle('transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1),opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(collapse).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when entered', () => {
    render(
      <Collapse in={true} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveStyle('height: auto');
    expect(collapse).toHaveStyle('opacity: 1');
    expect(collapse).toHaveStyle('transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1),opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(collapse).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exiting', () => {
    const { rerender } = render(
      <Collapse in={true} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    rerender(
      <Collapse in={false} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveStyle('height: 0');
    expect(collapse).toHaveStyle('opacity: 0');
    expect(collapse).toHaveStyle('overflow: hidden');
    expect(collapse).toHaveStyle('transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1),opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(collapse).not.toHaveStyle('visibility: hidden');
  });

  it('applies correct styles when exited', () => {
    render(
      <Collapse in={false} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveStyle('height: 0');
    expect(collapse).toHaveStyle('opacity: 0');
    expect(collapse).toHaveStyle('transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1),opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(collapse).toHaveStyle('visibility: hidden');
  });
});
