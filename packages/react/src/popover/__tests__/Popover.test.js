import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@tonic-ui/react/src';
import React from 'react';

describe('Popover', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Popover>
        <PopoverTrigger data-testid="popover-trigger">
          <Button>Hover me</Button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          This is a popover
        </PopoverContent>
      </Popover>
    ), renderOptions);

    const popoverTrigger = screen.getByTestId('popover-trigger');
    expect(popoverTrigger).toBeInTheDocument();

    await act(() => user.click(popoverTrigger));

    await waitFor(() => {
      const popoverContent = screen.getByTestId('popover-content');
      expect(popoverContent).toHaveTextContent('This is a popover');
    });

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
