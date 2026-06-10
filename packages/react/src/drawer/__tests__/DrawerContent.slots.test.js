import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  ButtonBase,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
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

describe('DrawerContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('A — slots.transition renders the custom transition component', () => {
    render(
      <Drawer isOpen onClose={jest.fn()} placement="right">
        <DrawerOverlay />
        <DrawerContent slots={{ transition: CustomTransition }}>
          <DrawerBody>content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.transition passes additional props to the transition element', () => {
    render(
      <Drawer isOpen onClose={jest.fn()} placement="right">
        <DrawerOverlay />
        <DrawerContent
          slots={{ transition: CustomTransition }}
          slotProps={{ transition: { 'data-foo': 'bar' } }}
        >
          <DrawerBody>content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', () => {
    render(
      <Drawer isOpen onClose={jest.fn()} placement="right">
        <DrawerOverlay />
        <DrawerContent
          TransitionComponent={CustomTransition}
          TransitionProps={{}}
        >
          <DrawerBody>content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'DrawerContent:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'DrawerContent:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });
});

describe('DrawerContent slots / slotProps (closeButton)', () => {
  it('A — slots.closeButton renders the custom close button component', () => {
    render(
      <Drawer isOpen isClosable onClose={jest.fn()} placement="right">
        <DrawerOverlay />
        <DrawerContent slots={{ closeButton: CustomCloseButton }}>
          <DrawerBody>content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByTestId('custom-close-button')).toBeInTheDocument();
  });

  it('B — slotProps.closeButton passes additional props to the close button', () => {
    render(
      <Drawer isOpen isClosable onClose={jest.fn()} placement="right">
        <DrawerOverlay />
        <DrawerContent slotProps={{ closeButton: { 'data-foo': 'bar' } }}>
          <DrawerBody>content</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-foo', 'bar');
  });
});
