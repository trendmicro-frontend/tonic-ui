import { act } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Menu, MenuButton, MenuList, MenuItem } from '@tonic-ui/react/src';
import React from 'react';

describe('Menu', () => {
  it('should render correctly', async () => {
    const items = [
      'Menu item 1',
      'Menu item 2',
      'Menu item 3',
    ];

    // Wrap the code inside act(...) for transition update
    await act(async () => {
      const { container } = render(
        <Menu
          // TODO: use "visibility: visible" or "visibility: hidden" to show/hide the menu
          isOpen={true}
        >
          <MenuButton
            variant="secondary"
          >
            Open
          </MenuButton>
          <MenuList>
            {items.map((item) => (
              <MenuItem key={item}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      );
      await testA11y(container);
    });
  });
});
