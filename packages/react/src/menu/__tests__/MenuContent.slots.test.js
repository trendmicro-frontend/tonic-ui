import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
} from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <div ref={ref} data-testid="custom-transition" {...rest}>{children}</div>
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

// Helper: render a Menu with MenuContent open by default.
// NOTE: Do not pass data-testid to MenuContent itself in popper-slot tests — the rest
// props are forwarded to the Popper element and would override any data-testid set by
// a custom Popper component.
const renderOpenMenu = (menuContentProps = {}) => {
  const items = ['Item 1', 'Item 2'];

  return render(
    <Menu defaultIsOpen>
      <MenuButton data-testid="menu-button">Open</MenuButton>
      <MenuContent {...menuContentProps}>
        {items.map((item) => (
          <MenuItem key={item}>{item}</MenuItem>
        ))}
      </MenuContent>
    </Menu>
  );
};

describe('MenuContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  describe('Transition slot', () => {
    it('A — slots.transition renders the custom transition component', async () => {
      renderOpenMenu({ slots: { transition: CustomTransition } });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
      });
    });

    it('B — slotProps.transition passes additional props to the transition element', async () => {
      renderOpenMenu({
        slots: { transition: CustomTransition },
        slotProps: { transition: { 'data-foo': 'bar' } },
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
      });
    });

    it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', async () => {
      renderOpenMenu({
        TransitionComponent: CustomTransition,
        TransitionProps: {},
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
      });

      expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
        prefix: 'MenuContent:',
        alternative: 'slots.transition',
        willRemove: true,
      });
      expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
        prefix: 'MenuContent:',
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    });
  });

  describe('Popper slot', () => {
    it('A — slots.popper renders the custom popper component', async () => {
      renderOpenMenu({ slots: { popper: CustomPopper } });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
      });
    });

    it('B — slotProps.popper forwards additional props to the popper element', async () => {
      renderOpenMenu({
        slots: { popper: CustomPopper },
        slotProps: { popper: { 'data-foo': 'bar' } },
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toHaveAttribute('data-foo', 'bar');
      });
    });

    it('C — deprecated PopperComponent still renders and warns; deprecated PopperProps warns', async () => {
      renderOpenMenu({
        PopperComponent: CustomPopper,
        PopperProps: {},
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
      });

      expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperComponent', {
        prefix: 'MenuContent:',
        alternative: 'slots.popper',
        willRemove: true,
      });
      expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperProps', {
        prefix: 'MenuContent:',
        alternative: 'slotProps.popper',
        willRemove: true,
      });
    });
  });
});
