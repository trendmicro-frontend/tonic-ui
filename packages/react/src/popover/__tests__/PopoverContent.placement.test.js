import { act, screen } from '@testing-library/react';
import { createPopper } from '@popperjs/core';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
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

describe('PopoverContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should grow from the edge that faces the trigger when Popper.js flips the placement', async () => {
    render(
      <Popover defaultIsOpen>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          Popover content
        </PopoverContent>
      </Popover>
    );

    const popoverContent = await screen.findByTestId('popover-content');
    expect(popoverContent).toHaveStyle({ transformOrigin: 'top center' });

    act(() => {
      reportPopperPlacement('top');
    });

    expect(popoverContent).toHaveStyle({ transformOrigin: 'bottom center' });
  });
});
