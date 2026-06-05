import { screen, waitFor } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Submenu,
  SubmenuContent,
  SubmenuTrigger,
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
      ? children({ placement: 'right-start', transition: { in: true, onEnter: () => {}, onExited: () => {} } })
      : children}
  </div>
));
CustomPopper.displayName = 'CustomPopper';

// Helper: render an open menu with an open submenu.
// NOTE: Do not pass data-testid to SubmenuContent itself in popper-slot tests — the rest
// props are forwarded to the Popper element and would override any data-testid set by
// a custom Popper component.
const renderOpenSubmenu = (submenuContentProps = {}) => {
  return render(
    <Menu defaultIsOpen>
      <MenuButton data-testid="menu-button">Open</MenuButton>
      <MenuList data-testid="menu-list">
        <MenuItem>Menu item 1</MenuItem>
        <Submenu defaultIsOpen>
          <SubmenuTrigger data-testid="submenu-trigger">Submenu</SubmenuTrigger>
          <SubmenuContent {...submenuContentProps}>
            <MenuItem>Submenu item 1</MenuItem>
            <MenuItem>Submenu item 2</MenuItem>
          </SubmenuContent>
        </Submenu>
      </MenuList>
    </Menu>
  );
};

describe('SubmenuContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  describe('Transition slot', () => {
    it('A — slots.transition renders the custom transition component', async () => {
      renderOpenSubmenu({ slots: { transition: CustomTransition } });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
      });
    });

    it('B — slotProps.transition passes additional props to the transition element', async () => {
      renderOpenSubmenu({
        slots: { transition: CustomTransition },
        slotProps: { transition: { 'data-foo': 'bar' } },
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
      });
    });

    it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', async () => {
      renderOpenSubmenu({
        TransitionComponent: CustomTransition,
        TransitionProps: {},
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
      });

      expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
        prefix: 'SubmenuContent:',
        alternative: 'slots.transition',
        willRemove: true,
      });
      expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
        prefix: 'SubmenuContent:',
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    });
  });

  describe('Popper slot', () => {
    it('A — slots.popper renders the custom popper component', async () => {
      renderOpenSubmenu({ slots: { popper: CustomPopper } });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
      });
    });

    it('B — slotProps.popper forwards additional props to the popper element', async () => {
      renderOpenSubmenu({
        slots: { popper: CustomPopper },
        slotProps: { popper: { 'data-foo': 'bar' } },
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toHaveAttribute('data-foo', 'bar');
      });
    });

    it('C — deprecated PopperComponent still renders and warns; deprecated PopperProps warns', async () => {
      renderOpenSubmenu({
        PopperComponent: CustomPopper,
        PopperProps: {},
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toBeInTheDocument();
      });

      expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperComponent', {
        prefix: 'SubmenuContent:',
        alternative: 'slots.popper',
        willRemove: true,
      });
      expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperProps', {
        prefix: 'SubmenuContent:',
        alternative: 'slotProps.popper',
        willRemove: true,
      });
    });
  });
});
