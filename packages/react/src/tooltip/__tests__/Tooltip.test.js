import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Text, Tooltip } from '@tonic-ui/react/src';
import React from 'react';

describe('Tooltip', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Tooltip label={<Text data-testid="tooltip-label">This is a tooltip</Text>}>
        <Text data-testid="tooltip-content">Hover me</Text>
      </Tooltip>
    ), renderOptions);

    const tooltipContent = screen.getByTestId('tooltip-content');
    expect(tooltipContent).toBeInTheDocument();

    await act(() => user.hover(tooltipContent));

    await waitFor(() => {
      const tooltipLabel = screen.getByTestId('tooltip-label');
      expect(tooltipLabel).toHaveTextContent('This is a tooltip');
    });

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
