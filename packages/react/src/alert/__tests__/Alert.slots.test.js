import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Alert, ButtonBase } from '@tonic-ui/react/src';
import React from 'react';

const CustomCloseButton = React.forwardRef((props, ref) => (
  <ButtonBase ref={ref} data-testid="custom-close-button" {...props}>X</ButtonBase>
));
CustomCloseButton.displayName = 'CustomCloseButton';

describe('Alert slots / slotProps (closeButton)', () => {
  it('A — slots.closeButton renders the custom close button component', () => {
    render(
      <Alert
        isClosable
        onClose={jest.fn()}
        slots={{ closeButton: CustomCloseButton }}
      >
        Alert message
      </Alert>
    );

    expect(screen.getByTestId('custom-close-button')).toBeInTheDocument();
  });

  it('B — slotProps.closeButton passes additional props to the close button', () => {
    render(
      <Alert
        isClosable
        onClose={jest.fn()}
        slotProps={{ closeButton: { 'data-foo': 'bar' } }}
      >
        Alert message
      </Alert>
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-foo', 'bar');
  });
});
