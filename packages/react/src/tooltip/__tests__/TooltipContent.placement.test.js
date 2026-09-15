import { act, screen } from '@testing-library/react';
import { createPopper } from '@popperjs/core';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Tooltip,
} from '@tonic-ui/react/src';

jest.mock('@popperjs/core', () => ({
  createPopper: jest.fn(() => ({
    destroy: jest.fn(),
    forceUpdate: jest.fn(),
    update: jest.fn(),
  })),
}));

const reportPopperPlacement = (placement) => {
  const modifiers = createPopper.mock.calls[0][2].modifiers;
  const modifier = modifiers.find((item) => item.name === 'handlePopperUpdate');
  modifier.fn({
    state: {
      elements: {},
      placement,
    },
  });
};

describe('TooltipContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should grow from the edge that faces the trigger when Popper.js flips the placement', async () => {
    render(
      <Tooltip
        data-testid="tooltip-content"
        defaultIsOpen
        label="Tooltip content"
      >
        <Button>Trigger</Button>
      </Tooltip>
    );

    const tooltipContent = await screen.findByTestId('tooltip-content');
    expect(tooltipContent).toHaveStyle({ transformOrigin: 'top center' });

    act(() => {
      reportPopperPlacement('top');
    });

    expect(tooltipContent).toHaveStyle({ transformOrigin: 'bottom center' });
  });
});
