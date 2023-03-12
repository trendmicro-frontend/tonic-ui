import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Menu, MenuButton, MenuList, MenuItem } from '@tonic-ui/react/src';
import React from 'react';

describe('Menu', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();
    const items = [
      { id: 1, label: 'Menu item 1', disabled: false },
      { id: 2, label: 'Menu item 2', disabled: false },
      { id: 3, label: 'Menu item 3', disabled: true },
    ];
    const { container } = render(
      <Menu>
        <MenuButton variant="secondary" data-testid="button">
          Open
        </MenuButton>
        <MenuList>
          {items.map((item) => (
            <MenuItem
              data-id={item.id}
              key={item.id}
              disabled={item.disabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();

    await act(() => user.click(button));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
