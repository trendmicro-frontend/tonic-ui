/* eslint-disable react/jsx-no-bind */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Autocomplete, AutocompleteInput, Button } from '@tonic-ui/react/src';
import { act, useState } from 'react';

describe('Autocomplete', () => {
  const items = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  const getInput = () => screen.getByRole('combobox');

  describe('opening and closing', () => {
    it('opens the dropdown on input focus', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      await user.click(getInput());

      expect(await screen.findByRole('listbox')).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(3);
    });

    it('opens the dropdown via typing', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      await user.type(getInput(), 'a');

      expect(await screen.findByRole('listbox')).toBeInTheDocument();
    });

    it('does not open when focus arrives without a click (Tab)', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Button data-testid="prev">prev</Button>
          <Autocomplete items={items} />
        </>
      );

      screen.getByTestId('prev').focus();
      await user.tab();

      expect(getInput()).toHaveFocus();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes on Escape and does not re-open until another trigger', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      const input = getInput();
      await user.click(input);
      expect(await screen.findByRole('listbox')).toBeInTheDocument();

      await user.keyboard('[Escape]');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      // Input keeps focus after Escape
      expect(input).toHaveFocus();
    });

    it('closes when an item is selected', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      await user.click(getInput());
      await user.click(await screen.findByText('Apple'));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes on blur after the transition completes', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Button data-testid="outside">outside</Button>
          <Autocomplete items={items} />
        </>
      );

      const input = getInput();
      await user.click(input);
      expect(await screen.findByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));

      // Allow the Collapse exit transition to finish before asserting unmount.
      await act(() => new Promise((resolve) => setTimeout(resolve, 200)));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('keyboard navigation', () => {
    it('ArrowDown opens a closed popup and highlights the first item', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      const input = getInput();
      input.focus();
      await user.keyboard('[ArrowDown]');

      const itemElements = await screen.findAllByRole('option');
      expect(itemElements[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('ArrowUp opens a closed popup and highlights the last item', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      const input = getInput();
      input.focus();
      await user.keyboard('[ArrowUp]');

      const itemElements = await screen.findAllByRole('option');
      expect(itemElements[itemElements.length - 1]).toHaveAttribute('aria-selected', 'true');
    });

    it('ArrowDown wraps from last to first', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      await user.click(getInput());
      // Walk to the last item, then one more press should wrap.
      await user.keyboard('[ArrowDown][ArrowDown][ArrowDown]');
      const itemElements = await screen.findAllByRole('option');
      expect(itemElements[2]).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('[ArrowDown]');
      expect(itemElements[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('ArrowUp wraps from first to last', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      await user.click(getInput());
      await user.keyboard('[ArrowDown]');
      const itemElements = await screen.findAllByRole('option');
      expect(itemElements[0]).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('[ArrowUp]');
      expect(itemElements[2]).toHaveAttribute('aria-selected', 'true');
    });

    it('Home jumps the highlight to the first item', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      await user.click(getInput());
      await user.keyboard('[ArrowDown][ArrowDown]');
      const itemElements = await screen.findAllByRole('option');
      expect(itemElements[1]).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('[Home]');
      expect(itemElements[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('End jumps the highlight to the last item', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      await user.click(getInput());
      const itemElements = await screen.findAllByRole('option');

      await user.keyboard('[End]');
      expect(itemElements[2]).toHaveAttribute('aria-selected', 'true');
    });

    it('Enter commits the highlighted item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Autocomplete items={items} onChange={onChange} />);

      const input = getInput();
      await user.click(input);

      await user.keyboard('[ArrowDown]');
      const itemElements = await screen.findAllByRole('option');
      expect(itemElements[0]).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('[ArrowDown]');
      expect(itemElements[1]).toHaveAttribute('aria-selected', 'true');

      await user.keyboard('[Enter]');
      expect(onChange).toHaveBeenCalledWith(items[1]);
    });
  });

  describe('filtering', () => {
    it('filters items as the user types (default case-insensitive label match)', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      const input = getInput();
      await user.click(input);
      await user.type(input, 'ap');

      await waitFor(() => {
        const itemElements = screen.getAllByRole('option');
        expect(itemElements).toHaveLength(1);
        expect(itemElements[0]).toHaveTextContent('Apple');
      });
    });

    it('respects a custom filterItems', async () => {
      const user = userEvent.setup();
      const filterItems = (list, { inputValue }) => {
        if (!inputValue) {
          return list;
        }
        return list.filter((item) => item.value.startsWith(inputValue));
      };
      render(
        <Autocomplete items={items} filterItems={filterItems} />
      );

      const input = getInput();
      await user.click(input);
      await user.type(input, 'ba');

      await waitFor(() => {
        const itemElements = screen.getAllByRole('option');
        expect(itemElements).toHaveLength(1);
        expect(itemElements[0]).toHaveTextContent('Banana');
      });
    });

    it('passes getItemLabel to filterItems so consumers can stringify items', async () => {
      const user = userEvent.setup();
      const filterItems = jest.fn((list) => list);
      render(<Autocomplete items={items} filterItems={filterItems} />);

      await user.type(getInput(), 'a');

      const lastCall = filterItems.mock.calls.at(-1);
      const opts = lastCall[1];
      expect(typeof opts.getItemLabel).toBe('function');
      expect(opts.getItemLabel(items[0])).toBe('Apple');
      expect(opts.inputValue).toBe('a');
    });

    it('passthrough filterItems lets the consumer keep all items (server-driven search)', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete items={items} filterItems={(list) => list} />
      );

      const input = getInput();
      await user.click(input);
      await user.type(input, 'zzz');

      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(3);
      });
    });

    it('can inject synthetic items (creatable pattern)', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const filterItems = (list, { inputValue }) => {
        const q = inputValue.trim().toLowerCase();
        const filtered = q
          ? list.filter((item) => item.label.toLowerCase().includes(q))
          : list;
        const exists = list.some((item) => item.label.toLowerCase() === q);
        if (q && !exists) {
          return [
            ...filtered,
            { value: `__add__:${inputValue}`, label: `Add "${inputValue}"`, inputValue },
          ];
        }
        return filtered;
      };
      render(
        <Autocomplete
          items={items}
          filterItems={filterItems}
          onChange={onChange}
        />
      );

      await user.type(getInput(), 'mango');
      await user.click(await screen.findByText('Add "mango"'));

      expect(onChange).toHaveBeenCalledWith({
        value: '__add__:mango',
        label: 'Add "mango"',
        inputValue: 'mango',
      });
    });

    it('creatable: input shows the typed value (not the "Add X" label) when getItemLabel returns inputValue', async () => {
      const user = userEvent.setup();
      const filterItems = (list, { inputValue }) => {
        const q = inputValue.trim().toLowerCase();
        const filtered = q
          ? list.filter((item) => item.label.toLowerCase().includes(q))
          : list;
        const exists = list.some((item) => item.label.toLowerCase() === q);
        if (q && !exists) {
          return [
            ...filtered,
            { value: `__add__:${inputValue}`, label: `Add "${inputValue}"`, inputValue },
          ];
        }
        return filtered;
      };
      // Synthetic items prefer their `inputValue` so the typed text — not the
      // display label — lands in the input. This avoids the `Add "Add X"`
      // feedback loop when filterItems re-runs against the freshly synced value.
      const getItemLabel = (item) => item.inputValue ?? item.label ?? '';
      render(
        <Autocomplete
          items={items}
          filterItems={filterItems}
          getItemLabel={getItemLabel}
        />
      );

      const input = getInput();
      await user.type(input, 'mango');
      await user.click(await screen.findByText('Add "mango"'));

      expect(input).toHaveValue('mango');
    });
  });

  describe('selection', () => {
    it('calls onChange, syncs input value, and closes on item click', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const onInputChange = jest.fn();
      render(
        <Autocomplete
          items={items}
          onChange={onChange}
          onInputChange={onInputChange}
        />
      );

      const input = getInput();
      await user.click(input);
      await user.click(await screen.findByText('Banana'));

      expect(onChange).toHaveBeenCalledWith(items[1]);
      expect(onInputChange).toHaveBeenLastCalledWith('Banana');
      expect(input).toHaveValue('Banana');
    });

    it('autoHighlight pre-highlights the first option so Enter commits it without arrowing', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <Autocomplete
          items={items}
          autoHighlight
          onChange={onChange}
        />
      );

      await user.click(getInput());
      const itemElements = await screen.findAllByRole('option');
      await waitFor(() => {
        expect(itemElements[0]).toHaveAttribute('aria-selected', 'true');
      });

      await user.keyboard('[Enter]');
      expect(onChange).toHaveBeenCalledWith(items[0]);
    });

    it('uses getItemLabel to set the input value when an item is selected', async () => {
      const user = userEvent.setup();
      const onInputChange = jest.fn();
      render(
        <Autocomplete
          items={items}
          getItemLabel={(item) => item.value.toUpperCase()}
          onInputChange={onInputChange}
        />
      );

      const input = getInput();
      await user.click(input);
      await user.click(await screen.findByText('Banana'));

      expect(input).toHaveValue('BANANA');
      expect(onInputChange).toHaveBeenLastCalledWith('BANANA');
    });
  });

  describe('controlled input', () => {
    it('supports controlled inputValue with onInputChange', async () => {
      const user = userEvent.setup();
      const onInputChange = jest.fn();
      const Wrapper = () => {
        const [value, setValue] = useState('');
        return (
          <Autocomplete
            items={items}
            inputValue={value}
            onInputChange={(next) => {
              setValue(next);
              onInputChange(next);
            }}
          />
        );
      };
      render(<Wrapper />);

      const input = getInput();
      await user.click(input);
      await user.type(input, 'ch');

      expect(onInputChange).toHaveBeenLastCalledWith('ch');
      expect(input).toHaveValue('ch');
    });
  });

  describe('value (selected item)', () => {
    it('uncontrolled defaultValue seeds the input with the item label', () => {
      render(<Autocomplete items={items} defaultValue={items[0]} />);

      expect(getInput()).toHaveValue('Apple');
    });

    it('uncontrolled value persists across selections without external state', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Autocomplete items={items} defaultValue={items[0]} onChange={onChange} />);

      const input = getInput();
      // Clear filter before opening so all items are visible.
      await user.clear(input);
      const cherryOption = await screen.findByText('Cherry');
      await user.click(cherryOption);

      expect(onChange).toHaveBeenCalledWith(items[2]);
      expect(input).toHaveValue('Cherry');
    });

    it('controlled value seeds the input with the item label on mount', () => {
      render(<Autocomplete items={items} value={items[1]} onChange={() => {}} />);

      expect(getInput()).toHaveValue('Banana');
    });

    it('controlled value sync fires onInputChange when inputValue is also controlled', () => {
      const onInputChange = jest.fn();
      const Wrapper = () => {
        const [inputValue, setInputValue] = useState('');
        return (
          <Autocomplete
            items={items}
            value={items[0]}
            onChange={() => {}}
            inputValue={inputValue}
            onInputChange={(next) => {
              setInputValue(next);
              onInputChange(next);
            }}
          />
        );
      };
      render(<Wrapper />);

      // Mount sync notifies the controlled inputValue consumer to update.
      expect(onInputChange).toHaveBeenCalledWith('Apple');
      expect(getInput()).toHaveValue('Apple');
    });

    it('input reflects external value changes', () => {
      const Wrapper = ({ value }) => (
        <Autocomplete items={items} value={value} onChange={() => {}} />
      );
      const { rerender } = render(<Wrapper value={items[0]} />);

      expect(getInput()).toHaveValue('Apple');

      rerender(<Wrapper value={items[2]} />);
      expect(getInput()).toHaveValue('Cherry');
    });

    it('input clears when external value transitions to null', () => {
      const Wrapper = ({ value }) => (
        <Autocomplete items={items} value={value} onChange={() => {}} />
      );
      const { rerender } = render(<Wrapper value={items[0]} />);

      expect(getInput()).toHaveValue('Apple');

      rerender(<Wrapper value={null} />);
      expect(getInput()).toHaveValue('');
    });

    it('does not disturb a controlled inputValue when value is null', () => {
      // Existing pattern: consumer controls inputValue without using `value`.
      // Our sync effect should leave the input alone on mount when value is null.
      render(
        <Autocomplete
          items={items}
          inputValue="Apple"
          onInputChange={() => {}}
        />
      );

      expect(getInput()).toHaveValue('Apple');
    });

    it('clear button resets the uncontrolled value to null', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <Autocomplete
          items={items}
          defaultValue={items[0]}
          isClearable
          onChange={onChange}
        />
      );

      const input = getInput();
      expect(input).toHaveValue('Apple');

      await user.click(screen.getByRole('button', { name: 'Clear' }));

      expect(onChange).toHaveBeenCalledWith(null);
      expect(input).toHaveValue('');
    });

    it('controlled value: onChange fires but value prop is authoritative', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      // Consumer ignores onChange — value stays at items[0]
      render(<Autocomplete items={items} value={items[0]} onChange={onChange} />);

      const input = getInput();
      // Clear filter before opening so all items are visible.
      await user.clear(input);
      const cherryOption = await screen.findByText('Cherry');
      await user.click(cherryOption);

      expect(onChange).toHaveBeenCalledWith(items[2]);
      // commitSelection eagerly sets the input to the clicked item's label,
      // because most consumers honor onChange. If the consumer ignores it, the
      // input shows the clicked item's label even though `value` prop didn't
      // change — same as MUI's behavior.
      expect(input).toHaveValue('Cherry');
    });

    it('initial inputValue derivation: defaultValue seeds the input', () => {
      render(<Autocomplete items={items} defaultValue={items[1]} />);

      // Without `value` controlled and without `defaultInputValue`, the input
      // is seeded with `getItemLabel(defaultValue)`.
      expect(getInput()).toHaveValue('Banana');
    });
  });

  describe('ARIA attributes', () => {
    it('sets combobox attributes correctly', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} />);

      const input = getInput();
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('autocomplete', 'off');

      await user.click(input);

      await waitFor(() => {
        expect(input).toHaveAttribute('aria-expanded', 'true');
        const listbox = screen.getByRole('listbox');
        expect(input).toHaveAttribute('aria-controls', listbox.id);
      });

      await user.keyboard('[ArrowDown]');
      await waitFor(() => {
        const itemElements = screen.getAllByRole('option');
        expect(input).toHaveAttribute('aria-activedescendant', itemElements[0].id);
      });
    });
  });

  describe('closeBehavior', () => {
    // Select Apple then type 'ban' — value becomes 'Appleban', committedValueRef stays 'Apple'
    const setupDrift = async (user) => {
      const input = getInput();
      await user.click(input);
      await user.click(await screen.findByText('Apple'));
      await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
      await user.type(input, 'ban'); // appends; opens popup; committed stays 'Apple'
      return input;
    };

    describe('Escape', () => {
      it("'restore' (default) reverts input to last committed label", async () => {
        const user = userEvent.setup();
        render(<Autocomplete items={items} />);
        const input = await setupDrift(user);
        await user.keyboard('[Escape]');
        await waitFor(() => expect(input).toHaveValue('Apple'));
      });

      it("'restore' reverts to the defaultValue label after typed drift", async () => {
        const user = userEvent.setup();
        render(<Autocomplete items={items} defaultValue={items[0]} />);

        const input = getInput();
        await user.click(input);
        await user.clear(input);
        await user.type(input, 'banan');
        await user.keyboard('[Escape]');

        await waitFor(() => {
          expect(input).toHaveValue('Apple');
        });
      });

      it("'clear' resets input to ''", async () => {
        const user = userEvent.setup();
        render(
          <Autocomplete items={items} closeBehavior="clear" />
        );
        const input = await setupDrift(user);
        await user.keyboard('[Escape]');
        await waitFor(() => expect(input).toHaveValue(''));
      });

      it("'keep' leaves input as-is", async () => {
        const user = userEvent.setup();
        render(
          <Autocomplete items={items} closeBehavior="keep" />
        );
        const input = await setupDrift(user);
        await user.keyboard('[Escape]');
        await waitFor(() => expect(input).toHaveValue('Appleban'));
      });

      it("'clear' fires onChange(null) when input has drifted", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(
          <Autocomplete
            items={items}
            closeBehavior="clear"
            onChange={onChange}
          />
        );
        const input = await setupDrift(user);
        await user.keyboard('[Escape]');
        await waitFor(() => expect(input).toHaveValue(''));
        expect(onChange).toHaveBeenCalledWith(null);
      });
    });

    describe('blur (click outside)', () => {
      it("'restore' reverts input when text has drifted", async () => {
        const user = userEvent.setup();
        render(
          <>
            <Button data-testid="close-behavior-outside">outside</Button>
            <Autocomplete items={items} />
          </>
        );
        const input = await setupDrift(user);
        await user.click(screen.getByTestId('close-behavior-outside'));
        await waitFor(() => expect(input).toHaveValue('Apple'));
      });

      it("'restore' reverts input to last committed label after typed-empty", async () => {
        const user = userEvent.setup();
        render(
          <>
            <Button data-testid="restore-empty-outside">outside</Button>
            <Autocomplete items={items} />
          </>
        );
        const input = getInput();
        await user.click(input);
        await user.click(await screen.findByText('Apple'));
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
        // Clear the input by selecting all and deleting — committed label stays 'Apple'.
        await user.click(input);
        await user.clear(input);
        await user.click(screen.getByTestId('restore-empty-outside'));
        await waitFor(() => expect(input).toHaveValue('Apple'));
      });

      it("'clear' fires onChange(null) when input has drifted", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(
          <>
            <Button data-testid="clear-drift-outside">outside</Button>
            <Autocomplete
              items={items}
              closeBehavior="clear"
              onChange={onChange}
            />
          </>
        );
        const input = await setupDrift(user);
        await user.click(screen.getByTestId('clear-drift-outside'));
        await waitFor(() => expect(input).toHaveValue(''));
        expect(onChange).toHaveBeenCalledWith(null);
      });

      it("'clear' fires onChange(null) when typed-empty input is dismissed", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(
          <>
            <Button data-testid="clear-empty-outside">outside</Button>
            <Autocomplete
              items={items}
              closeBehavior="clear"
              onChange={onChange}
            />
          </>
        );
        const input = getInput();
        await user.click(input);
        await user.click(await screen.findByText('Apple'));
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
        await user.click(input);
        await user.clear(input);
        await user.click(screen.getByTestId('clear-empty-outside'));
        await waitFor(() => expect(input).toHaveValue(''));
        expect(onChange).toHaveBeenLastCalledWith(null);
      });
    });

    describe('Tab', () => {
      it("'restore' reverts input when text has drifted", async () => {
        const user = userEvent.setup();
        render(
          <>
            <Autocomplete items={items} />
            <Button data-testid="tab-restore-next">next</Button>
          </>
        );
        const input = await setupDrift(user);
        // Tab moves focus off the input → blur fires → dismiss applies closeBehavior.
        await user.tab();
        await waitFor(() => expect(input).toHaveValue('Apple'));
      });

      it("'clear' resets input and fires onChange(null) when text has drifted", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(
          <>
            <Autocomplete
              items={items}
              closeBehavior="clear"
              onChange={onChange}
            />
            <Button data-testid="tab-clear-next">next</Button>
          </>
        );
        const input = await setupDrift(user);
        await user.tab();
        await waitFor(() => expect(input).toHaveValue(''));
        expect(onChange).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('callbacks', () => {
    describe('onOpen', () => {
      it('fires when the dropdown opens via click', async () => {
        const user = userEvent.setup();
        const onOpen = jest.fn();
        render(
          <Autocomplete items={items} onOpen={onOpen} />
        );

        await user.click(getInput());

        expect(onOpen).toHaveBeenCalledTimes(1);
      });

      it('fires when the dropdown opens via typing', async () => {
        const user = userEvent.setup();
        const onOpen = jest.fn();
        render(
          <Autocomplete items={items} onOpen={onOpen} />
        );

        await user.type(getInput(), 'a');

        expect(onOpen).toHaveBeenCalledTimes(1);
      });

      it('fires again after close and re-open', async () => {
        const user = userEvent.setup();
        const onOpen = jest.fn();
        render(
          <Autocomplete items={items} onOpen={onOpen} />
        );

        await user.click(getInput());
        expect(onOpen).toHaveBeenCalledTimes(1);

        await user.keyboard('[Escape]');
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());

        await user.click(getInput());
        expect(onOpen).toHaveBeenCalledTimes(2);
      });
    });

    describe('onClose', () => {
      it('fires when Escape closes the dropdown', async () => {
        const user = userEvent.setup();
        const onClose = jest.fn();
        render(
          <Autocomplete items={items} onClose={onClose} />
        );

        await user.click(getInput());
        await user.keyboard('[Escape]');

        await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
      });

      it('fires when an item is selected', async () => {
        const user = userEvent.setup();
        const onClose = jest.fn();
        render(
          <Autocomplete items={items} onClose={onClose} />
        );

        await user.click(getInput());
        await user.click(await screen.findByText('Apple'));

        await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
      });

      it('fires when clicking outside', async () => {
        const user = userEvent.setup();
        const onClose = jest.fn();
        render(
          <>
            <Button data-testid="outside-close">outside</Button>
            <Autocomplete items={items} onClose={onClose} />
          </>
        );

        await user.click(getInput());
        await user.click(screen.getByTestId('outside-close'));

        await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
      });

      it('fires when Tab moves focus off the input', async () => {
        const user = userEvent.setup();
        const onClose = jest.fn();
        render(
          <>
            <Autocomplete items={items} onClose={onClose} />
            <Button data-testid="tab-onclose-next">next</Button>
          </>
        );

        await user.click(getInput());
        await user.tab();

        await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
      });
    });

    describe('onHighlightChange', () => {
      it('fires with reason "keyboard" on ArrowDown', async () => {
        const user = userEvent.setup();
        const onHighlightChange = jest.fn();
        render(
          <Autocomplete
            items={items}
            onHighlightChange={onHighlightChange}
          />
        );

        await user.click(getInput());
        await user.keyboard('[ArrowDown]');

        expect(onHighlightChange).toHaveBeenLastCalledWith({
          item: items[0],
          index: 0,
          reason: 'keyboard',
        });
      });

      it('fires with reason "mouse" on hover', async () => {
        const user = userEvent.setup();
        const onHighlightChange = jest.fn();
        render(
          <Autocomplete
            items={items}
            onHighlightChange={onHighlightChange}
          />
        );

        await user.click(getInput());
        await user.hover(await screen.findByText('Banana'));

        expect(onHighlightChange).toHaveBeenLastCalledWith({
          item: items[1],
          index: 1,
          reason: 'mouse',
        });
      });
    });
  });

  describe('isLoading', () => {
    it('shows a spinner in the endAdornment when true', () => {
      render(<Autocomplete items={items} isLoading />);

      // Spinner is in the input — visible without opening the popup.
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('still shows items in the popup when true', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={items} isLoading />);

      await user.click(getInput());

      // Popup opens normally — no built-in spinner blocking items in the popup.
      expect(await screen.findAllByRole('option')).toHaveLength(3);
    });

    it('shows the chevron and no spinner when false', () => {
      render(<Autocomplete items={items} isLoading={false} />);

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('passes isLoading to renderContent so consumers can render a loading state', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}
          isLoading

          renderContent={({ isLoading }) => (
            isLoading ? <div data-testid="loading">Loading...</div> : null
          )}
        />
      );

      await user.click(getInput());
      expect(await screen.findByTestId('loading')).toBeInTheDocument();
    });
  });

  describe('isClearable', () => {
    it('shows a clear button while the input has a value', async () => {
      const user = userEvent.setup();
      const Wrapper = () => {
        const [value, setValue] = useState('Apple');
        return <Autocomplete items={items} isClearable inputValue={value} onInputChange={setValue} />;
      };
      render(<Wrapper />);

      expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();

      await user.clear(getInput());
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
      });
    });

    it('does not show the clear button when the input is empty', () => {
      render(<Autocomplete items={items} isClearable />);

      expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });

    it('clear button resets the input and fires onChange(null)', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const Wrapper = () => {
        const [value, setValue] = useState('Apple');
        return (
          <Autocomplete
            items={items}
            isClearable
            inputValue={value}
            onInputChange={setValue}
            onChange={onChange}
          />
        );
      };
      render(<Wrapper />);

      await user.click(screen.getByRole('button', { name: 'Clear' }));

      expect(getInput()).toHaveValue('');
      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('matchWidth', () => {
    const wideItems = [
      { value: 'a', label: 'An item with a very long label that would exceed the input width' },
      { value: 'b', label: 'Another item with an even longer label for testing purposes' },
    ];

    // anchorRef.current = InputControl's outer Box = getInput().parentElement.
    // mockRects makes the anchor report a narrow width (100px) while all other elements
    // (including the listbox) report a wider width (400px), simulating content wider than input.
    // Both getBoundingClientRect (used by Popper's matchWidth modifier fn) and offsetWidth
    // (used by useAutocompleteListStyle for minWidth/width) are mocked.
    const mockRects = (anchorEl) => {
      jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
        const width = this === anchorEl ? 100 : 400;
        const rect = { width, height: 40, top: 0, left: 0, right: width, bottom: 40, x: 0, y: 0 };
        rect.toJSON = () => rect;
        return rect;
      });
      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function () {
        return this === anchorEl ? 100 : 400;
      });
    };

    it('constrains the listbox to the input width even when content is wider', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={wideItems} matchWidth />);
      mockRects(getInput().parentElement);

      await user.click(getInput());

      // width is set to the input's width (100px); maxWidth and minWidth are absent
      // so the popup is constrained to exactly the input width with no cap or floor.
      const listbox = await screen.findByRole('listbox');
      expect(listbox).toHaveStyle({ width: '100px' });
      expect(listbox).not.toHaveStyle({ 'max-width': '640px' });
      expect(listbox).not.toHaveStyle({ 'min-width': '100px' });

      jest.restoreAllMocks();
    });

    it('does not constrain the listbox width when false', async () => {
      const user = userEvent.setup();
      render(<Autocomplete items={wideItems} />);
      mockRects(getInput().parentElement);

      await user.click(getInput());

      // Without matchWidth the popup expands to content width. The styles set
      // minWidth (anchors to input width), maxWidth (hard cap), and width (content-sized).
      const listbox = await screen.findByRole('listbox');
      expect(listbox).toHaveStyle({
        'min-width': '100px',
        'max-width': '640px',
        width: 'max-content',
      });
      expect(listbox.style.width).toBe('');

      jest.restoreAllMocks();
    });
  });

  describe('selectOnFocus', () => {
    it('selects the existing input text on focus', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}
          selectOnFocus
          inputValue="Apple"
          onInputChange={() => {}}
        />
      );

      const input = getInput();
      await user.click(input);

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe('Apple'.length);
    });
  });

  describe('disabled', () => {
    it('suppresses interaction — the popup does not open', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => <AutocompleteInput {...params} disabled />}
        />
      );

      const input = getInput();
      expect(input).toBeDisabled();

      await user.click(input);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('renderInput', () => {
    it('renders a custom input with ref and inputProps wired up', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}
          renderInput={({ ref, inputProps }) => (
            <div ref={ref} data-testid="input-wrapper">
              <input {...inputProps} data-testid="custom-input" />
            </div>
          )}
        />
      );

      expect(screen.getByTestId('input-wrapper')).toBeInTheDocument();

      await user.click(screen.getByTestId('custom-input'));
      expect(await screen.findByRole('listbox')).toBeInTheDocument();
    });

    it('exposes onClearInput on params so a custom input can fire it', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <Autocomplete
          items={items}
          defaultValue={items[0]}
          onChange={onChange}
          renderInput={({ ref, inputProps, onClearInput }) => (
            <div ref={ref}>
              <input {...inputProps} />
              <button type="button" onClick={onClearInput}>
                custom-clear
              </button>
            </div>
          )}
        />
      );

      const input = getInput();
      expect(input).toHaveValue('Apple');

      await user.click(screen.getByText('custom-clear'));

      expect(onChange).toHaveBeenCalledWith(null);
      expect(input).toHaveValue('');
    });
  });

  describe('renderContent', () => {
    it('renders custom popup content', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}

          renderContent={({ items: list, renderItems }) => {
            if (list.length === 0) {
              return <div data-testid="empty">No items</div>;
            }
            return (
              <>
                <div data-testid="header">Results</div>
                {renderItems(list)}
              </>
            );
          }}
        />
      );

      await user.click(getInput());
      expect(await screen.findByTestId('header')).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(3);
    });

    it('returning null hides the popup entirely', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}

          renderContent={() => null}
        />
      );

      await user.click(getInput());

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('args bag delivers items, renderItem, renderItems, getItemProps, inputValue, isLoading, AutocompleteItem', async () => {
      const user = userEvent.setup();
      const renderContent = jest.fn(({ items: list, renderItems }) => renderItems(list));
      render(<Autocomplete items={items} renderContent={renderContent} />);

      await user.click(getInput());

      const args = renderContent.mock.calls.at(-1)[0];
      expect(args.items).toEqual(items);
      expect(typeof args.renderItem).toBe('function');
      expect(typeof args.renderItems).toBe('function');
      expect(typeof args.getItemProps).toBe('function');
      expect(typeof args.inputValue).toBe('string');
      expect(typeof args.isLoading).toBe('boolean');
      expect(typeof args.AutocompleteItem).toBe('object');
    });

    it('a custom row built from AutocompleteItem + getItemProps commits selection on click', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <Autocomplete
          items={items}
          onChange={onChange}
          renderContent={({ items: list, getItemProps, renderItem, AutocompleteItem }) => (
            <>
              {list.map((item, index) => (
                <AutocompleteItem
                  key={item.value}
                  {...getItemProps({ index, item })}
                >
                  {renderItem(item)}
                </AutocompleteItem>
              ))}
            </>
          )}
        />
      );

      await user.click(getInput());
      await user.click(await screen.findByText('Banana'));

      expect(onChange).toHaveBeenCalledWith(items[1]);
    });

    it('a custom row built from AutocompleteItem + getItemProps updates highlight on hover', async () => {
      const user = userEvent.setup();
      const onHighlightChange = jest.fn();
      render(
        <Autocomplete
          items={items}
          onHighlightChange={onHighlightChange}
          renderContent={({ items: list, getItemProps, renderItem, AutocompleteItem }) => (
            <>
              {list.map((item, index) => (
                <AutocompleteItem
                  key={item.value}
                  {...getItemProps({ index, item })}
                >
                  {renderItem(item)}
                </AutocompleteItem>
              ))}
            </>
          )}
        />
      );

      await user.click(getInput());
      await user.hover(await screen.findByText('Cherry'));

      expect(onHighlightChange).toHaveBeenLastCalledWith({
        item: items[2],
        index: 2,
        reason: 'mouse',
      });
    });
  });

  describe('renderItem', () => {
    it('renders custom item content with the current inputValue', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}

          renderItem={(item, { inputValue }) => `${item.label} — ${inputValue}`}
        />
      );

      await user.type(getInput(), 'ap');

      const itemElements = await screen.findAllByRole('option');
      expect(itemElements[0]).toHaveTextContent('Apple — ap');
    });
  });

  describe('slotProps', () => {
    it('spreads slotProps.content onto the AutocompleteList', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          items={items}
          slotProps={{
            content: { 'data-testid': 'custom-content' },
          }}
        />
      );

      await user.click(getInput());

      const listbox = await screen.findByRole('listbox');
      expect(listbox).toHaveAttribute('data-testid', 'custom-content');
    });
  });

  describe('AutocompleteInput', () => {
    it('forwards the error prop to the input as aria-invalid', () => {
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => <AutocompleteInput {...params} error />}
        />
      );

      expect(getInput()).toHaveAttribute('aria-invalid', 'true');
    });

    it('forwards placeholder to the input', () => {
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => <AutocompleteInput {...params} placeholder="Pick one" />}
        />
      );

      expect(getInput()).toHaveAttribute('placeholder', 'Pick one');
    });

    it('autoFocus focuses the input on mount', () => {
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => <AutocompleteInput {...params} autoFocus />}
        />
      );

      expect(getInput()).toHaveFocus();
    });

    it('forwards id to the input', () => {
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => <AutocompleteInput {...params} id="autocomplete-input" />}
        />
      );

      expect(getInput()).toHaveAttribute('id', 'autocomplete-input');
    });

    it('forwards name to the input', () => {
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => <AutocompleteInput {...params} name="fruit" />}
        />
      );

      expect(getInput()).toHaveAttribute('name', 'fruit');
    });

    it('forwards required to the input', () => {
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => <AutocompleteInput {...params} required />}
        />
      );

      expect(getInput()).toBeRequired();
    });

    it('merges custom inputProps with hook-managed inputProps', () => {
      render(
        <Autocomplete
          items={items}
          renderInput={(params) => (
            <AutocompleteInput
              {...params}
              inputProps={{
                ...params.inputProps,
                'data-test': 'custom',
              }}
            />
          )}
        />
      );

      const input = getInput();
      // Custom prop is preserved.
      expect(input).toHaveAttribute('data-test', 'custom');
      // Hook-managed ARIA attribute is preserved.
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });
  });
});
