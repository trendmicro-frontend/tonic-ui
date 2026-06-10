import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-transition" {...rest}>{children}</Box>
));
CustomTransition.displayName = 'CustomTransition';

describe('ModalOverlay slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('A — slots.transition renders the custom transition component', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay slots={{ transition: CustomTransition }} />
        <ModalContent>
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.transition passes additional props to the transition element', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay
          slots={{ transition: CustomTransition }}
          slotProps={{ transition: { 'data-foo': 'bar' } }}
        />
        <ModalContent>
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay
          TransitionComponent={CustomTransition}
          TransitionProps={{}}
        />
        <ModalContent>
          <ModalBody>content</ModalBody>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'ModalOverlay:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'ModalOverlay:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });
});
