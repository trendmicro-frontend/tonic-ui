import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  ButtonBase,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

const CustomCloseButton = React.forwardRef((props, ref) => (
  <ButtonBase ref={ref} data-testid="custom-close-button" {...props}>X</ButtonBase>
));
CustomCloseButton.displayName = 'CustomCloseButton';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-transition" {...rest}>{children}</Box>
));
CustomTransition.displayName = 'CustomTransition';

describe('ModalContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('A — slots.transition renders the custom transition component', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent slots={{ transition: CustomTransition }}>
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.transition passes additional props to the transition element', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent
          slots={{ transition: CustomTransition }}
          slotProps={{ transition: { 'data-foo': 'bar' } }}
        >
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent
          TransitionComponent={CustomTransition}
          TransitionProps={{}}
        >
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'ModalContent:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'ModalContent:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });
});

describe('ModalContent slots / slotProps (closeButton)', () => {
  it('A — slots.closeButton renders the custom close button component', () => {
    render(
      <Modal isOpen isClosable onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent slots={{ closeButton: CustomCloseButton }}>
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('custom-close-button')).toBeInTheDocument();
  });

  it('B — slotProps.closeButton passes additional props to the close button', () => {
    render(
      <Modal isOpen isClosable onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent slotProps={{ closeButton: { 'data-foo': 'bar' } }}>
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-foo', 'bar');
  });
});
