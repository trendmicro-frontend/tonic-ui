import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Autocomplete, Box } from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-transition" {...rest}>{children}</Box>
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

// Helper: render an Autocomplete whose items render into the listbox.
const renderAutocomplete = (autocompleteProps = {}) => render(
  <Autocomplete
    items={[
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
    ]}
    {...autocompleteProps}
  />
);

const openListbox = async (user) => {
  await user.click(screen.getByRole('combobox'));
  return screen.findByRole('listbox');
};

describe('AutocompleteList slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('A — slotProps.content.slots.popper renders the custom popper component', async () => {
    const user = userEvent.setup();
    renderAutocomplete({
      slotProps: { content: { slots: { popper: CustomPopper } } },
    });

    const popper = await openListbox(user);
    expect(popper).toHaveAttribute('data-testid', 'custom-popper');
  });

  it('B — slotProps.content.slotProps.popper forwards additional props to the popper element', async () => {
    const user = userEvent.setup();
    renderAutocomplete({
      slotProps: {
        content: {
          slots: { popper: CustomPopper },
          slotProps: { popper: { 'data-foo': 'bar' } },
        },
      },
    });

    const popper = await openListbox(user);
    expect(popper).toHaveAttribute('data-foo', 'bar');
  });

  it('A — slotProps.content.slots.transition renders the custom transition component', async () => {
    const user = userEvent.setup();
    renderAutocomplete({
      slotProps: { content: { slots: { transition: CustomTransition } } },
    });

    await openListbox(user);
    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.content.slotProps.transition forwards additional props to the transition element', async () => {
    const user = userEvent.setup();
    renderAutocomplete({
      slotProps: {
        content: {
          slots: { transition: CustomTransition },
          slotProps: { transition: { 'data-foo': 'bar' } },
        },
      },
    });

    await openListbox(user);
    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('A — slots.content replaces the internal list component', async () => {
    const user = userEvent.setup();
    const CustomList = React.forwardRef((props, ref) => (
      <Box ref={ref} data-testid="custom-list" {...props} />
    ));
    CustomList.displayName = 'CustomList';
    renderAutocomplete({ slots: { content: CustomList } });

    await user.click(screen.getByRole('combobox'));

    expect(screen.getByTestId('custom-list')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
  it('A — slots.root replaces the root container', () => {
    const CustomRoot = React.forwardRef((props, ref) => (
      <Box ref={ref} data-testid="custom-root" {...props} />
    ));
    CustomRoot.displayName = 'CustomRoot';
    renderAutocomplete({ slots: { root: CustomRoot } });

    expect(screen.getByTestId('custom-root')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('B — slotProps.root applies to the root container', () => {
    renderAutocomplete({ slotProps: { root: { 'data-foo': 'bar' } } });

    expect(screen.getByRole('combobox').closest('[data-foo]')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — legacy PopperProps / TransitionProps are merged with a deprecation warning', async () => {
    const user = userEvent.setup();
    const { container } = renderAutocomplete({
      slotProps: {
        content: {
          slots: { popper: CustomPopper, transition: CustomTransition },
          PopperProps: { 'data-legacy-popper': 'yes' },
          TransitionProps: { 'data-legacy-transition': 'yes' },
        },
      },
    });

    await openListbox(user);
    expect(screen.getByTestId('custom-popper')).toHaveAttribute('data-legacy-popper', 'yes');
    expect(container.querySelector('[data-legacy-transition="yes"]')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('PopperProps', {
      prefix: 'AutocompleteList:',
      alternative: 'slotProps.popper',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'AutocompleteList:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });
});
