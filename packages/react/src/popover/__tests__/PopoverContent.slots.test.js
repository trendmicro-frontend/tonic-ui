import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, onEnter, onExited, appear, ...rest }, ref) => (
  <div ref={ref} data-testid="custom-transition" {...rest}>
    {typeof children === 'function'
      ? children('entered', { ref: { current: null }, style: {} })
      : children}
  </div>
));
CustomTransition.displayName = 'CustomTransition';

const CustomPopper = React.forwardRef(({ children, ...rest }, ref) => (
  <div ref={ref} data-testid="custom-popper" {...rest}>
    {typeof children === 'function'
      ? children({ placement: 'bottom', transition: { in: true, onEnter: () => {}, onExited: () => {} } })
      : children}
  </div>
));
CustomPopper.displayName = 'CustomPopper';

const renderPopover = (popoverContentProps = {}) => {
  return render(
    <Popover defaultIsOpen>
      <PopoverTrigger>
        <Button data-testid="popover-trigger">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent data-testid="popover-content" {...popoverContentProps}>
        Popover body
      </PopoverContent>
    </Popover>
  );
};

describe('PopoverContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  // Transition slot

  it('A — slots.transition renders the custom transition component', () => {
    renderPopover({ slots: { transition: CustomTransition } });
    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.transition passes additional props to the transition element', () => {
    renderPopover({
      slots: { transition: CustomTransition },
      slotProps: { transition: { 'data-foo': 'bar' } },
    });
    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', () => {
    renderPopover({
      TransitionComponent: CustomTransition,
      TransitionProps: {},
    });
    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'PopoverContent:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'PopoverContent:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });

  // Popper slot

  it('D — slots.popper renders the custom popper component', () => {
    renderPopover({ slots: { popper: CustomPopper } });
    expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
  });

  it('E — slotProps.popper passes additional props to the popper element', () => {
    renderPopover({
      slots: { popper: CustomPopper },
      slotProps: { popper: { 'data-foo': 'bar' } },
    });
    expect(screen.getByTestId('custom-popper')).toHaveAttribute('data-foo', 'bar');
  });

  it('F — deprecated PopperComponent still renders and warns; deprecated PopperProps warns', () => {
    renderPopover({
      PopperComponent: CustomPopper,
      PopperProps: {},
    });
    expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperComponent', {
      prefix: 'PopoverContent:',
      alternative: 'slots.popper',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperProps', {
      prefix: 'PopoverContent:',
      alternative: 'slotProps.popper',
      willRemove: true,
    });
  });
});
