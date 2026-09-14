/* eslint-disable react/jsx-no-bind */
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Dropdown } from '@tonic-ui/react/src';
import DropdownButton from '../DropdownButton';
import DropdownChip from '../DropdownChip';
import DropdownToggle from '../DropdownToggle';
import React from 'react';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', props: { disabled: true } },
];

const openMenu = async (user) => {
  await user.click(screen.getByRole('button'));
  const menu = await screen.findByRole('menu');
  await waitFor(() => expect(menu).toHaveFocus());
  return menu;
};

const CustomPopper = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-popper" {...rest}>
    {typeof children === 'function'
      ? children({ placement: 'bottom', transition: { in: true, onEnter: () => {}, onExited: () => {} } })
      : children}
  </Box>
));
CustomPopper.displayName = 'CustomPopper';

describe('Dropdown', () => {
  it('renders the default (unstyled) toggle and matches the snapshot, with no a11y violations', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown items={items} defaultValue={items[0]} />
    );
    // Open the menu so `aria-controls` resolves to the rendered menu content.
    await user.click(screen.getByRole('button'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    // Wait for the Collapse transition to complete (entering → entered).
    await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  describe('default toggle', () => {
    it('uses an unstyled DropdownToggle by default', () => {
      render(<Dropdown items={items} />);
      expect(screen.getByRole('button')).toHaveAttribute('data-tonic', 'DropdownToggle');
    });

    it('renders an empty default toggle button when nothing is selected', () => {
      render(<Dropdown items={items} />);
      const toggle = screen.getByRole('button');
      expect(toggle).toBeInTheDocument();
      expect(toggle).toHaveTextContent('');
    });

    it('shows the defaultValue label in the default toggle', () => {
      render(<Dropdown items={items} defaultValue={items[0]} />);
      expect(screen.getByRole('button')).toHaveTextContent('Apple');
    });

    it('opens the menu when the toggle is clicked', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} />);
      expect(await openMenu(user)).toBeInTheDocument();
    });

    it('renders items in the menu list when open', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} />);
      await openMenu(user);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('closes the menu when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} />);
      await openMenu(user);
      await user.keyboard('[Escape]');
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('renderToggle', () => {
    it('renders a custom DropdownButton, opens the menu, and updates after selection', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={({ renderItem, value }) => (
            <DropdownButton data-testid="toggle">
              {value ? renderItem(value) : 'Select'}
            </DropdownButton>
          )}
        />
      );
      const toggle = screen.getByTestId('toggle');
      expect(toggle).toBeInTheDocument();
      await user.click(toggle);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await user.click(screen.getByText('Banana'));
      await waitFor(() => expect(toggle).toHaveTextContent('Banana'));
    });

    it('renders a custom DropdownToggle and opens the menu', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={({ renderItem, value }) => (
            <DropdownToggle data-testid="toggle">
              {value ? renderItem(value) : 'Select'}
            </DropdownToggle>
          )}
        />
      );
      await user.click(screen.getByTestId('toggle'));
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });

    it('renders a custom DropdownChip and opens the menu', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderToggle={({ renderItem, value }) => (
            <DropdownChip data-testid="toggle">
              {value ? renderItem(value) : 'Select'}
            </DropdownChip>
          )}
        />
      );
      await user.click(screen.getByTestId('toggle'));
      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });
  });

  describe('value — uncontrolled', () => {
    it('calls onChange with the clicked item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Dropdown items={items} onChange={onChange} />);
      await openMenu(user);
      await user.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalledWith(items[0]);
    });

    it('updates the toggle label after selection', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} />);
      expect(screen.getByRole('button')).toHaveTextContent('');
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveTextContent('Banana');
      });
    });
  });

  describe('value — controlled', () => {
    it('reflects the controlled value in the toggle', () => {
      render(<Dropdown items={items} value={items[1]} />);
      expect(screen.getByRole('button')).toHaveTextContent('Banana');
    });

    it('calls onChange on selection but does not change the displayed value', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Dropdown items={items} value={items[0]} onChange={onChange} />);
      await openMenu(user);
      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(items[1]);
      // Controlled — toggle still shows the original value.
      expect(screen.getByRole('button')).toHaveTextContent('Apple');
    });
  });

  describe('item types', () => {
    it('renders divider items', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={[
            { value: 'a', label: 'Apple' },
            { type: 'divider' },
            { value: 'b', label: 'Banana' },
          ]}
        />
      );
      await openMenu(user);
      expect(document.querySelector('[data-tonic="MenuDivider"]')).toBeInTheDocument();
    });

    it('renders group items with a visible title', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={[{
            type: 'group',
            label: 'My Group',
            children: [{ value: 'a', label: 'Apple' }],
          }]}
        />
      );
      await openMenu(user);
      expect(screen.getByText('My Group')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('renders a submenu trigger', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={[{
            type: 'submenu',
            label: 'More Options',
            children: [{ value: 'x', label: 'Sub Item' }],
          }]}
        />
      );
      await openMenu(user);
      expect(screen.getByText('More Options')).toBeInTheDocument();
    });

    it('renders custom items via renderItem', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={[{ type: 'custom', label: 'Custom Item' }]}
          renderItem={(item) => <span data-testid="custom-item">{item.label}</span>}
          // Explicit toggle so the default toggle doesn't call this custom
          // (non-null-safe) renderItem with the initial null value.
          renderToggle={() => <DropdownToggle>Select</DropdownToggle>}
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
      render(<Dropdown items={items} onChange={onChange} />);
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
      render(<Dropdown items={items} onChange={onChange} />);
      await openMenu(user);
      await user.keyboard('[ArrowDown]');
      const menuItems = screen.getAllByRole('menuitem');
      await waitFor(() => expect(menuItems[0]).toHaveFocus());
      await user.keyboard('[Space]');
      expect(onChange).toHaveBeenCalledWith(items[0]);
    });
  });

  describe('renderContent', () => {
    it('renders custom content via the renderContent render-prop', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          renderContent={({ items: list, renderItems }) => (
            <div data-testid="custom-content">{renderItems(list)}</div>
          )}
        />
      );
      await openMenu(user);
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });
  });

  describe('slots / slotProps (content only)', () => {
    it('passes slotProps.content through to the internal menu content (incl. its own slots API)', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          slotProps={{
            content: {
              slots: { popper: CustomPopper },
              slotProps: { popper: { 'data-foo': 'bar' } },
            },
          }}
        />
      );
      await openMenu(user);
      await waitFor(() => {
        expect(screen.getByTestId('custom-popper')).toHaveAttribute('data-foo', 'bar');
      });
    });

    it('keeps slotProps.content flattened onto the menu list (and not as slots.content)', async () => {
      const user = userEvent.setup();
      render(
        <Dropdown
          items={items}
          slotProps={{ content: { 'data-testid': 'content-props' } }}
        />
      );
      await openMenu(user);
      expect(screen.getByTestId('content-props')).toBeInTheDocument();
    });

    it('does not crash when slots or slotProps is null (regression)', () => {
      render(<Dropdown items={items} slots={null} slotProps={null} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('content sizing', () => {
    it('matches the menu width to the toggle when matchWidth is enabled', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={items} matchWidth />);
      const toggle = screen.getByRole('button');
      jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
        const width = this === toggle ? 100 : 400;
        const rect = { width, height: 40, top: 0, left: 0, right: width, bottom: 40, x: 0, y: 0 };
        rect.toJSON = () => rect;
        return rect;
      });
      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
        .mockImplementation(function () {
          return this === toggle ? 100 : 400;
        });

      try {
        const menu = await openMenu(user);
        expect(menu).toHaveStyle({ width: '100px' });
        expect(menu).not.toHaveStyle({ 'max-width': '640px' });
        expect(menu).not.toHaveStyle({ 'min-width': '100px' });
      } finally {
        jest.restoreAllMocks();
      }
    });
  });

  describe('portal container', () => {
    it('renders the portalled menu inside document.body when no containerRef is given', async () => {
      const user = userEvent.setup();
      render(<Dropdown portalled items={items} />);
      await openMenu(user);

      const portalNode = screen.getByRole('menu').closest('.tonic-ui-portal');
      expect(portalNode).toBeInTheDocument();
      expect(portalNode.parentElement).toBe(document.body);
    });

    it('renders the portalled menu inside a custom container via slotProps.content.portalProps.containerRef', async () => {
      const user = userEvent.setup();
      const containerRef = React.createRef();
      render(
        <>
          <div ref={containerRef} data-testid="portal-container" />
          <Dropdown
            portalled
            items={items}
            slotProps={{ content: { portalProps: { containerRef } } }}
          />
        </>,
      );
      await openMenu(user);

      const portalNode = screen.getByRole('menu').closest('.tonic-ui-portal');
      const container = screen.getByTestId('portal-container');
      expect(portalNode).toBeInTheDocument();
      expect(portalNode.parentElement).toBe(container);
    });

    it('removes the portal node from the custom container when the menu closes', async () => {
      const user = userEvent.setup();
      const containerRef = React.createRef();
      render(
        <>
          <div ref={containerRef} data-testid="portal-container" />
          <Dropdown
            portalled
            items={items}
            slotProps={{ content: { portalProps: { containerRef } } }}
          />
        </>,
      );
      await openMenu(user);
      const container = screen.getByTestId('portal-container');
      expect(container.querySelector('.tonic-ui-portal')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(container.querySelector('.tonic-ui-portal')).toBeNull();
      });
    });
  });
});
