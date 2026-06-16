import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, InputControl } from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} data-testid="custom-input" {...props} />
));
CustomInput.displayName = 'CustomInput';

const CustomRoot = React.forwardRef(({ children, ...props }, ref) => (
  <Box ref={ref} data-testid="custom-root" {...props}>{children}</Box>
));
CustomRoot.displayName = 'CustomRoot';

describe('InputControl slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  // input slot

  it('A — slots.input renders the custom input component', () => {
    render(<InputControl slots={{ input: CustomInput }} />);
    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });

  it('B — slotProps.input passes additional props to the input element', () => {
    render(<InputControl slots={{ input: CustomInput }} slotProps={{ input: { 'data-foo': 'bar' } }} />);
    expect(screen.getByTestId('custom-input')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated inputComponent still renders and warns; deprecated inputProps warns', () => {
    render(<InputControl inputComponent={CustomInput} inputProps={{}} />);
    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('inputComponent', {
      prefix: 'InputControl:',
      alternative: 'slots.input',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('inputProps', {
      prefix: 'InputControl:',
      alternative: 'slotProps.input',
      willRemove: true,
    });
  });

  // root slot

  it('D — slots.root renders the custom root component', () => {
    render(<InputControl slots={{ root: CustomRoot }} />);
    expect(screen.getByTestId('custom-root')).toBeInTheDocument();
  });

  it('E — slotProps.root passes additional props to the root element', () => {
    render(<InputControl slots={{ root: CustomRoot }} slotProps={{ root: { 'data-foo': 'bar' } }} />);
    expect(screen.getByTestId('custom-root')).toHaveAttribute('data-foo', 'bar');
  });

  it('E2 — rendering without slotProps emits no useSlot warning', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<InputControl />);
    expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining('useSlot:'));
    consoleErrorSpy.mockRestore();
  });

  // merge semantics (MUI-style): legacy inputProps AND slotProps.input both apply, new wins on conflict

  it('F — legacy inputProps and slotProps.input are merged (new wins on conflict)', () => {
    render(
      <InputControl
        slots={{ input: CustomInput }}
        inputProps={{ 'data-legacy': 'legacy', 'data-shared': 'old' }}
        slotProps={{ input: { 'data-new': 'new', 'data-shared': 'new' } }}
      />
    );
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('data-legacy', 'legacy'); // legacy-only key preserved
    expect(input).toHaveAttribute('data-new', 'new'); // new-only key applied
    expect(input).toHaveAttribute('data-shared', 'new'); // conflict: new wins
  });

  // handler chaining: a slotProps.input handler still fires

  it('G — slotProps.input.onChange fires alongside the component', async () => {
    const onChange = jest.fn();
    render(<InputControl slotProps={{ input: { onChange } }} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');
    expect(onChange).toHaveBeenCalled();
  });

  // render-prop form: getInputProps() returns the merged props

  it('H — children({ getInputProps }) returns the merged slot props', () => {
    render(
      <InputControl placeholder="hello" slotProps={{ input: { 'data-foo': 'bar' } }}>
        {({ getInputProps }) => <input data-testid="render-prop-input" {...getInputProps()} />}
      </InputControl>
    );
    const input = screen.getByTestId('render-prop-input');
    expect(input).toHaveAttribute('placeholder', 'hello'); // internal prop
    expect(input).toHaveAttribute('data-foo', 'bar'); // slotProps.input
  });
});
