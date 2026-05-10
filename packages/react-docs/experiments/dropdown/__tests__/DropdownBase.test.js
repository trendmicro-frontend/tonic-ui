import { render, screen, waitFor } from '../../../test-utils/render';
import userEvent from '@testing-library/user-event';
import { DropdownBase, MenuButtonToggle, TagToggle } from '../index';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const openMenu = async (user, toggleTestId = 'toggle') => {
  await user.click(screen.getByTestId(toggleTestId));
  return screen.findByRole('menu');
};

describe('DropdownBase', () => {
  describe('renderToggle (recommended usage)', () => {
    it('renders the toggle element', () => {
      render(
        <DropdownBase
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });

    it('opens the menu when the toggle is clicked', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      expect(await openMenu(user)).toBeInTheDocument();
    });

    it('renders items in the menu list when open', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('closes the menu when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      await user.keyboard('[Escape]');
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('getToggleProps({ disabled: true }) disables MenuButtonToggle and prevents menu open', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={items}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle', disabled: true })}>
              Select
            </MenuButtonToggle>
          )}
        />
      );
      const toggle = screen.getByTestId('toggle');
      expect(toggle).toBeDisabled();
      await user.click(toggle);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('getToggleProps({ disabled: true }) prevents menu open with TagToggle', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={items}
          renderToggle={({ getToggleProps }) => (
            <TagToggle {...getToggleProps({ 'data-testid': 'toggle', disabled: true })}>
              Select
            </TagToggle>
          )}
        />
      );
      await user.click(screen.getByTestId('toggle'));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('value — uncontrolled', () => {
    it('passes null to renderToggle when no defaultValue is set', () => {
      render(
        <DropdownBase
          items={items}
          renderToggle={({ value }) => (
            <MenuButtonToggle data-testid="toggle">
              {value === null ? 'None' : 'Selected'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('None');
    });

    it('passes defaultValue to renderToggle on initial render', () => {
      render(
        <DropdownBase
          items={items}
          defaultValue={items[0]}
          renderToggle={({ value, renderItem }) => (
            <MenuButtonToggle data-testid="toggle">
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
    });

    it('calls onChange with the clicked item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <DropdownBase
          items={items}
          onChange={onChange}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      await user.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalledWith(items[0]);
    });

    it('updates internal value after selection', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={items}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('None');
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      await waitFor(() => {
        expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
      });
    });
  });

  describe('value — controlled', () => {
    it('reflects the controlled value in renderToggle', () => {
      render(
        <DropdownBase
          items={items}
          value={items[1]}
          renderToggle={({ value, renderItem }) => (
            <MenuButtonToggle data-testid="toggle">
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle')).toHaveTextContent('Banana');
    });

    it('calls onChange on selection but does not change the displayed value', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <DropdownBase
          items={items}
          value={items[0]}
          onChange={onChange}
          renderToggle={({ getToggleProps, value, renderItem }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>
              {value ? renderItem(value) : 'None'}
            </MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(items[1]);
      // Value is controlled — toggle still shows the original controlled value
      expect(screen.getByTestId('toggle')).toHaveTextContent('Apple');
    });
  });

  describe('item types', () => {
    it('renders divider items', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={[
            { value: 'a', label: 'Apple' },
            { type: 'divider' },
            { value: 'b', label: 'Banana' },
          ]}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      // MenuDivider renders as a styled div
      const menu = screen.getByRole('menu');
      expect(menu.querySelector('[data-tonic="MenuDivider"], [data-tonic="Divider"], [role="separator"], hr')).toBeInTheDocument();
    });

    it('renders group items with a visible title', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={[{
            type: 'group',
            label: 'My Group',
            children: [{ value: 'a', label: 'Apple' }],
          }]}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      expect(screen.getByText('My Group')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('renders a submenu trigger', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={[{
            type: 'submenu',
            label: 'More Options',
            children: [{ value: 'x', label: 'Sub Item' }],
          }]}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      expect(screen.getByText('More Options')).toBeInTheDocument();
    });

    it('renders custom items via renderItem', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase
          items={[{ type: 'custom', label: 'Custom Item' }]}
          renderItem={(item) => <span data-testid="custom-item">{item.label}</span>}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      expect(screen.getByTestId('custom-item')).toBeInTheDocument();
    });
  });

  describe('keyboard selection', () => {
    it('calls onChange when Enter is pressed on a focused menu item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <DropdownBase
          items={items}
          onChange={onChange}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      await user.keyboard('[ArrowDown]');
      const menuItems = screen.getAllByRole('menuitem');
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      await user.keyboard('[Enter]');
      expect(onChange).toHaveBeenCalledWith(items[0]);
    });

    it('calls onChange when Space is pressed on a focused menu item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <DropdownBase
          items={items}
          onChange={onChange}
          renderToggle={({ getToggleProps }) => (
            <MenuButtonToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</MenuButtonToggle>
          )}
        />
      );
      await openMenu(user);
      await user.keyboard('[ArrowDown]');
      const menuItems = screen.getAllByRole('menuitem');
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      await user.keyboard('[Space]');
      expect(onChange).toHaveBeenCalledWith(items[0]);
    });
  });

  describe('backward compatibility', () => {
    it('children as a render function renders a working toggle', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase items={items}>
          {({ getToggleProps }) => (
            <TagToggle {...getToggleProps({ 'data-testid': 'toggle' })}>Select</TagToggle>
          )}
        </DropdownBase>
      );
      expect(await openMenu(user)).toBeInTheDocument();
    });

    it('slots.toggle renders TagToggle as the toggle with children inside', async () => {
      const user = userEvent.setup();
      render(
        <DropdownBase items={items} slots={{ toggle: TagToggle }}>
          My Label
        </DropdownBase>
      );
      // TagToggle receives role="button" via getToggleProps()
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveTextContent('My Label');
      await user.click(toggle);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('slotProps.toggle props are forwarded into getToggleProps', () => {
      // slotProps.toggle are merged into MenuToggle's getMenuToggleProps(),
      // which DropdownBase then includes in getToggleProps(). The user's
      // renderToggle receives these via {...getToggleProps()}.
      render(
        <DropdownBase
          items={items}
          slotProps={{ toggle: { 'data-testid': 'toggle-via-slot-props' } }}
          renderToggle={({ getToggleProps }) => (
            <TagToggle {...getToggleProps()}>Select</TagToggle>
          )}
        />
      );
      expect(screen.getByTestId('toggle-via-slot-props')).toBeInTheDocument();
    });
  });
});
