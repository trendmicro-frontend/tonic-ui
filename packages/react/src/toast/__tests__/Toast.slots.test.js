import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { ButtonBase, Toast } from '@tonic-ui/react/src';
import React from 'react';

const CustomCloseButton = React.forwardRef((props, ref) => (
  <ButtonBase ref={ref} data-testid="custom-close-button" {...props}>X</ButtonBase>
));
CustomCloseButton.displayName = 'CustomCloseButton';

describe('Toast slots / slotProps (closeButton)', () => {
  it('A — slots.closeButton renders the custom close button component', () => {
    render(
      <Toast
        isClosable
        onClose={jest.fn()}
        slots={{ closeButton: CustomCloseButton }}
      >
        Toast message
      </Toast>
    );

    expect(screen.getByTestId('custom-close-button')).toBeInTheDocument();
  });

  it('B — slotProps.closeButton passes additional props to the close button', () => {
    render(
      <Toast
        isClosable
        onClose={jest.fn()}
        slotProps={{ closeButton: { 'data-foo': 'bar' } }}
      >
        Toast message
      </Toast>
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-foo', 'bar');
  });
});
