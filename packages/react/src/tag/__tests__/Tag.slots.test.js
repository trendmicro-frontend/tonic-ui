import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { ButtonBase, Tag } from '@tonic-ui/react/src';
import React from 'react';

const CustomCloseButton = React.forwardRef((props, ref) => (
  <ButtonBase ref={ref} data-testid="custom-close-button" {...props}>X</ButtonBase>
));
CustomCloseButton.displayName = 'CustomCloseButton';

describe('Tag slots / slotProps (closeButton)', () => {
  it('A — slots.closeButton renders the custom close button component', () => {
    render(
      <Tag
        isClosable
        onClose={jest.fn()}
        slots={{ closeButton: CustomCloseButton }}
      >
        Tag label
      </Tag>
    );

    expect(screen.getByTestId('custom-close-button')).toBeInTheDocument();
  });

  it('B — slotProps.closeButton passes additional props to the close button', () => {
    render(
      <Tag
        isClosable
        onClose={jest.fn()}
        slotProps={{ closeButton: { 'data-foo': 'bar' } }}
      >
        Tag label
      </Tag>
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-foo', 'bar');
  });
});
