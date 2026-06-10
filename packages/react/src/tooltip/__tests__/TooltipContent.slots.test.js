import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  Button,
  Tooltip,
} from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, onEnter, onExited, appear, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-transition" {...rest}>
    {typeof children === 'function'
      ? children('entered', { ref: { current: null }, style: {} })
      : children}
  </Box>
));
CustomTransition.displayName = 'CustomTransition';

const CustomPopper = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-popper" {...rest}>
    {typeof children === 'function'
      ? children({ placement: 'bottom', transition: { in: true, onEnter: () => {}, onExited: () => {} } })
      : children}
  </Box>
));
CustomPopper.displayName = 'CustomPopper';

const CustomArrow = React.forwardRef((props, ref) => (
  <Box ref={ref} data-testid="custom-arrow" {...props} />
));
CustomArrow.displayName = 'CustomArrow';

const renderTooltip = (tooltipProps = {}) => {
  return render(
    <Tooltip label="tooltip label" defaultIsOpen {...tooltipProps}>
      <Button data-testid="tooltip-trigger">Trigger</Button>
    </Tooltip>
  );
};

describe('TooltipContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  // Transition slot

  it('A — slots.transition renders the custom transition component', () => {
    renderTooltip({ slots: { transition: CustomTransition } });
    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.transition passes additional props to the transition element', () => {
    renderTooltip({
      slots: { transition: CustomTransition },
      slotProps: { transition: { 'data-foo': 'bar' } },
    });
    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', () => {
    renderTooltip({
      TransitionComponent: CustomTransition,
      TransitionProps: {},
    });
    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'TooltipContent:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'TooltipContent:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });

  // Popper slot

  it('D — slots.popper renders the custom popper component', () => {
    renderTooltip({ slots: { popper: CustomPopper } });
    expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
  });

  it('E — slotProps.popper passes additional props to the popper element', () => {
    renderTooltip({
      slots: { popper: CustomPopper },
      slotProps: { popper: { 'data-foo': 'bar' } },
    });
    expect(screen.getByTestId('custom-popper')).toHaveAttribute('data-foo', 'bar');
  });

  it('F — deprecated PopperComponent still renders and warns; deprecated PopperProps warns', () => {
    renderTooltip({
      PopperComponent: CustomPopper,
      PopperProps: {},
    });
    expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperComponent', {
      prefix: 'TooltipContent:',
      alternative: 'slots.popper',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperProps', {
      prefix: 'TooltipContent:',
      alternative: 'slotProps.popper',
      willRemove: true,
    });
  });

  // Arrow slot

  it('G — slots.arrow renders the custom arrow component', () => {
    renderTooltip({ slots: { arrow: CustomArrow } });
    expect(screen.getByTestId('custom-arrow')).toBeInTheDocument();
  });

  it('H — slotProps.arrow passes additional props to the arrow element', () => {
    renderTooltip({
      slots: { arrow: CustomArrow },
      slotProps: { arrow: { 'data-foo': 'bar' } },
    });
    expect(screen.getByTestId('custom-arrow')).toHaveAttribute('data-foo', 'bar');
  });

  it('I — deprecated TooltipArrowComponent still renders and warns; deprecated TooltipArrowProps warns', () => {
    renderTooltip({
      TooltipArrowComponent: CustomArrow,
      TooltipArrowProps: {},
    });
    expect(screen.getByTestId('custom-arrow')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TooltipArrowComponent', {
      prefix: 'TooltipContent:',
      alternative: 'slots.arrow',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TooltipArrowProps', {
      prefix: 'TooltipContent:',
      alternative: 'slotProps.arrow',
      willRemove: true,
    });
  });
});
