import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, OverflowTooltip } from '@tonic-ui/react/src';
import React from 'react';

describe('OverflowTooltip', () => {
  it('should display an overflow tooltip tooltip if the clientWidth is less than the scrollWidth', async () => {
    const user = userEvent.setup();
    const textContent = 'This text string will be truncated when exceeding its container width. To see this in action, try resizing your browser viewport. If the text overflows, a tooltip will appear, displaying the full content.';
    const tooltipLabel = 'tooltip label';

    // Define the scrollWidth, offsetWidth, and clientWidth of the textContent
    const scrollWidth = 1193;
    const offsetWidth = 900;
    const clientWidth = 900;
    const maxWidth = scrollWidth;

    render(
      <Box maxWidth={maxWidth}>
        <OverflowTooltip label={tooltipLabel}>
          {textContent}
        </OverflowTooltip>
      </Box>
    );

    const text = screen.getByText(textContent);

    // Mock scrollWidth, offsetWidth, and clientWidth to simulate overflow
    Object.defineProperty(text, 'scrollWidth', { configurable: true, value: scrollWidth });
    Object.defineProperty(text, 'offsetWidth', { configurable: true, value: offsetWidth });
    Object.defineProperty(text, 'clientWidth', { configurable: true, value: clientWidth });

    await user.hover(text);

    await waitFor(() => {
      expect(screen.queryByText(tooltipLabel)).toBeInTheDocument();
    });
  });

  it('should display an overflow tooltip when the `clientRect` varies while setting the width to `max-content`', async () => {
    const user = userEvent.setup();
    const textContent = 'This is a string to test overflow tooltip';
    const tooltipLabel = 'tooltip label';

    // Define the clientRects of the textContent
    const contentWidth = 120;
    const contentHeight = 20;
    const maxContentWidth = 120.84;
    const maxContentHeight = 20;

    render(
      <Box width={contentWidth}>
        <OverflowTooltip label={tooltipLabel}>
          {textContent}
        </OverflowTooltip>
      </Box>
    );

    const text = screen.getByText(textContent);

    // Mock the getClientRects() function to simulate overflow
    text.getClientRects = jest.fn();
    text.getClientRects
      .mockReturnValueOnce([{ x: 0, y: 0, top: 0, bottom: contentHeight, left: 0, right: contentWidth, width: contentWidth, height: contentHeight }])
      .mockReturnValueOnce([{ x: 0, y: 0, top: 0, bottom: contentHeight, left: 0, right: maxContentWidth, width: maxContentWidth, height: contentHeight }])
      .mockReturnValueOnce([{ x: 0, y: 0, top: 0, bottom: contentHeight, left: 0, right: contentWidth, width: contentWidth, height: contentHeight }])
      .mockReturnValueOnce([{ x: 0, y: 0, top: 0, bottom: maxContentHeight, left: 0, right: contentWidth, width: contentWidth, height: maxContentHeight }]);

    await user.hover(text);

    await waitFor(() => {
      expect(screen.queryByText(tooltipLabel)).toBeInTheDocument();
    });
  });
});
