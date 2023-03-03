import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Text, Tooltip } from '@tonic-ui/react/src';
import React from 'react';

describe('Tooltip', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();
    const { baseElement, container } = render(
      <Tooltip label="This is a tooltip">
        <Text data-testid="content">Hover me</Text>
      </Tooltip>
    );

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();

    await act(() => user.hover(content));

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();

    await testA11y(container);
  });
});
