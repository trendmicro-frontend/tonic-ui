import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Checkbox, CheckboxGroup } from '@tonic-ui/react/src';
import { useEffect, useRef } from 'react';

describe('Checkbox', () => {
  it('should render correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <>
        {/* Sizes */}
        <Checkbox size="sm">Label</Checkbox>
        <Checkbox size="md">Label</Checkbox>
        <Checkbox size="lg">Label</Checkbox>

        {/* States */}
        <Checkbox>Label</Checkbox>
        <Checkbox indeterminate>Label</Checkbox>
        <Checkbox defaultChecked>Label</Checkbox>
        <Checkbox disabled>Label</Checkbox>
        <Checkbox disabled indeterminate>Label</Checkbox>
        <Checkbox disabled defaultChecked>Label</Checkbox>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should render correctly with `inputRef` and `ref` props', () => {
    const TestComponent = () => {
      const ref = useRef();
      const inputRef = useRef();

      useEffect(() => {
        expect(ref.current).toBeInstanceOf(HTMLLabelElement);
        expect(inputRef.current.checked).toBe(true);
      }, []);

      return (
        <Checkbox
          ref={ref}
          inputRef={inputRef}
          defaultChecked
        />
      );
    };

    render(
      <TestComponent />
    );
  });

  it('should output a warning message when the Checkbox\'s name prop conflicts with the CheckboxGroup\'s name prop', () => {
    // Mock console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const checkboxGroupName = 'checkbox-group';
    const checkboxName = 'checkbox';

    render(
      <CheckboxGroup name={checkboxGroupName}>
        <Checkbox name={checkboxName} />
      </CheckboxGroup>
    );

    const expectedErrorMessage = `Warning: The \`Checkbox\` has a \`name\` prop ("${checkboxName}") that conflicts with the \`CheckboxGroup\`'s \`name\` prop ("${checkboxGroupName}")`;
    expect(consoleErrorMock).toHaveBeenLastCalledWith(expectedErrorMessage);

    // Restore the original console.error
    consoleErrorMock.mockRestore();
  });

  it('should handle string value', async () => {
    const onChange = jest.fn(e => e.target.value);
    const user = userEvent.setup();
    render(
      <Checkbox value="test-value" onChange={onChange}>
        Test Value
      </Checkbox>
    );

    await user.click(screen.getByLabelText('Test Value'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('test-value');
  });

  it('should handle number value', async () => {
    const onChange = jest.fn(e => e.target.value);
    const user = userEvent.setup();
    render(
      <Checkbox value={123} onChange={onChange}>
        Number Value
      </Checkbox>
    );

    await user.click(screen.getByLabelText('Number Value'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('123');
  });

  it('should handle boolean value', async () => {
    const onChange = jest.fn(e => e.target.value);
    const user = userEvent.setup();
    render(
      <Checkbox value={true} onChange={onChange}>
        Boolean Value
      </Checkbox>
    );

    await user.click(screen.getByLabelText('Boolean Value'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('true');
  });

  it('should handle object value', async () => {
    const onChange = jest.fn(e => e.target.value);
    const user = userEvent.setup();
    const complexValue = { id: 1, name: 'Test' };
    render(
      <Checkbox value={complexValue} onChange={onChange}>
        Object Value
      </Checkbox>
    );

    await user.click(screen.getByLabelText('Object Value'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('[object Object]');
  });

  it('should handle checked state changes', async () => {
    const onChange = jest.fn(e => e.target.checked);
    const user = userEvent.setup();
    render(
      <Checkbox value="test" onChange={onChange}>
        Test
      </Checkbox>
    );

    await user.click(screen.getByLabelText('Test'));
    expect(onChange).toHaveReturnedWith(true);

    await user.click(screen.getByLabelText('Test'));
    expect(onChange).toHaveReturnedWith(false);
  });
});
