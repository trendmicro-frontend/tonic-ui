import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Button, Tooltip } from '@tonic-ui/react/src';
import React from 'react';

describe('Tooltip', () => {
  const tooltipLabel = 'tooltip label';
  const buttonLabel = 'button label';
  const TestComponent = (props) => (
    <Tooltip label={tooltipLabel} {...props}>
      <Button>{buttonLabel}</Button>
    </Tooltip>
  );

  it('should render correctly', async () => {
    const user = userEvent.setup();
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <TestComponent />
    ), renderOptions);

    const button = screen.getByText(buttonLabel);
    expect(button).toBeInTheDocument();

    await user.hover(button);

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should not show on mouseover if `disabled` is set to `false`', async () => {
    const user = userEvent.setup();

    render(<TestComponent disabled={false} />);

    await user.hover(screen.getByText(buttonLabel));

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('should not show on mouseover if `disabled` is set to `true`', async () => {
    const user = userEvent.setup();

    render(<TestComponent disabled={true} />);

    await user.hover(screen.getByText(buttonLabel));

    await waitFor(() => {
      expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument();
    });
  });

  it('should display on mouseover and close when clicked if `closeOnClick` is set to `true`', async () => {
    const user = userEvent.setup();

    render(<TestComponent closeOnClick={true} />);

    await user.hover(screen.getByText(buttonLabel));

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    // Click
    await user.click(screen.getByText(buttonLabel));

    await waitFor(() => {
      expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument();
    });
  });

  it('should display on mouseover and close when `Escape` key is pressed if `closeOnEsc` is set to `true`', async () => {
    const user = userEvent.setup();

    render(<TestComponent closeOnEsc={true} />);

    await user.hover(screen.getByText(buttonLabel));

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    // Press [Escape]
    await user.keyboard('[Escape]');

    await waitFor(() => {
      expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument();
    });
  });

  it('should display on mouseover and close when pointer down if `closeOnPointerDown` is set to `true`', async () => {
    const user = userEvent.setup();

    render(<TestComponent closeOnPointerDown={true} />);

    await user.hover(screen.getByText(buttonLabel));

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    // Pointer down
    await fireEvent.pointerDown(screen.getByText(buttonLabel));

    await waitFor(() => {
      expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument();
    });
  });
});
