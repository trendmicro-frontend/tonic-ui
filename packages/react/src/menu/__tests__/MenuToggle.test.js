import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuToggle,
} from '@tonic-ui/react/src';

describe('MenuToggle', () => {
  const TestComponent = ({ userProps, toggleProps } = {}) => (
    <Menu>
      <MenuToggle {...toggleProps}>
        {({ getMenuToggleProps }) => (
          <Button
            data-testid="toggle"
            {...getMenuToggleProps(userProps)}
          >
            Toggle
          </Button>
        )}
      </MenuToggle>
      <MenuList data-testid="menu-list">
        <MenuItem>Menu item 1</MenuItem>
      </MenuList>
    </Menu>
  );

  it('opens the menu when the toggle element is clicked', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await user.click(screen.getByTestId('toggle'));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });

  it('merges user onClick with the internal toggle handler', async () => {
    const user = userEvent.setup();
    const userOnClick = jest.fn();
    render(<TestComponent userProps={{ onClick: userOnClick }} />);

    await user.click(screen.getByTestId('toggle'));

    expect(userOnClick).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });

  it('merges user onKeyDown with the internal key handling', async () => {
    const userOnKeyDown = jest.fn();
    render(<TestComponent userProps={{ onKeyDown: userOnKeyDown }} />);

    fireEvent.keyDown(screen.getByTestId('toggle'), { key: 'Enter' });

    expect(userOnKeyDown).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });

  it('spreads other user props onto the toggle element', () => {
    render(<TestComponent userProps={{ 'data-foo': 'bar' }} />);

    expect(screen.getByTestId('toggle')).toHaveAttribute('data-foo', 'bar');
  });

  it('keeps menu wiring keys over user props', () => {
    render(<TestComponent userProps={{ id: 'custom-id', role: 'combobox', tabIndex: -1 }} />);

    const toggle = screen.getByTestId('toggle');
    expect(toggle.id).toBeTruthy();
    expect(toggle.id).not.toBe('custom-id');
    expect(toggle).toHaveAttribute('role', 'button');
    expect(toggle).toHaveAttribute('tabindex', '0');
  });

  it('stops the handler chain when the user onClick prevents default', async () => {
    const user = userEvent.setup();
    render(<TestComponent userProps={{ onClick: (event) => event.preventDefault() }} />);

    await user.click(screen.getByTestId('toggle'));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('applies disabled from user props to the toggle element', () => {
    const userOnClick = jest.fn();
    render((
      <Menu>
        <MenuToggle>
          {({ getMenuToggleProps }) => (
            <Box
              as="span"
              data-testid="toggle"
              {...getMenuToggleProps({ disabled: true, onClick: userOnClick })}
            >
              Toggle
            </Box>
          )}
        </MenuToggle>
        <MenuList>
          <MenuItem>Menu item 1</MenuItem>
        </MenuList>
      </Menu>
    ));

    const toggle = screen.getByTestId('toggle');
    expect(toggle).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(toggle);

    expect(userOnClick).toHaveBeenCalledTimes(1);
  });

  it('gates interaction when disabled via the disabled prop', () => {
    render(<TestComponent toggleProps={{ disabled: true }} />);

    const toggle = screen.getByTestId('toggle');
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveAttribute('aria-disabled', 'true');

    fireEvent.keyDown(toggle, { key: 'Enter' });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('supports component-level onClick when rendered directly', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render((
      <Menu>
        <MenuToggle data-testid="toggle" onClick={onClick}>
          Toggle
        </MenuToggle>
        <MenuList>
          <MenuItem>Menu item 1</MenuItem>
        </MenuList>
      </Menu>
    ));

    await user.click(screen.getByTestId('toggle'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });
});
