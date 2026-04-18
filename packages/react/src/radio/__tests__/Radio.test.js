import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Radio, RadioGroup } from '@tonic-ui/react/src';
import { useEffect, useRef } from 'react';

describe('Radio', () => {
  it('should render correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <>
        {/* Sizes */}
        <Radio size="sm" name="sizes">Label</Radio>
        <Radio size="md" name="sizes">Label</Radio>
        <Radio size="lg" name="sizes">Label</Radio>

        {/* States */}
        <Radio defaultChecked={false}>Label</Radio>
        <Radio defaultChecked>Label</Radio>
        <Radio disabled>Label</Radio>
        <Radio disabled defaultChecked>Label</Radio>
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
        <Radio
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

  it('should output a warning message when the Radio\'s name prop conflicts with the RadioGroup\'s name prop', () => {
    // Mock console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const radioGroupName = 'radio-group';
    const radioName = 'radio';

    render(
      <RadioGroup name={radioGroupName}>
        <Radio name={radioName} />
      </RadioGroup>
    );

    const expectedErrorMessage = `Warning: The \`Radio\` has a \`name\` prop ("${radioName}") that conflicts with the \`RadioGroup\`'s \`name\` prop ("${radioGroupName}")`;
    expect(consoleErrorMock).toHaveBeenLastCalledWith(expectedErrorMessage);

    // Restore the original console.error
    consoleErrorMock.mockRestore();
  });

  it('should handle string value', async () => {
    const onChange = jest.fn(e => e.target.value);
    const user = userEvent.setup();
    render(
      <Radio value="test-value" onChange={onChange}>
        Test Value
      </Radio>
    );

    await user.click(screen.getByLabelText('Test Value'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('test-value');
  });

  it('should handle number value', async () => {
    const onChange = jest.fn(e => e.target.value);
    const user = userEvent.setup();
    render(
      <Radio value={123} onChange={onChange}>
        Number Value
      </Radio>
    );

    await user.click(screen.getByLabelText('Number Value'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('123');
  });

  it('should handle boolean value', async () => {
    const onChange = jest.fn(e => e.target.value);
    const user = userEvent.setup();
    render(
      <Radio value={true} onChange={onChange}>
        Boolean Value
      </Radio>
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
      <Radio value={complexValue} onChange={onChange}>
        Object Value
      </Radio>
    );

    await user.click(screen.getByLabelText('Object Value'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('[object Object]');
  });

  it('should handle checked state changes', async () => {
    const onChange = jest.fn(e => e.target.checked);
    const user = userEvent.setup();
    render(
      <Radio value="test" onChange={onChange}>
        Test
      </Radio>
    );

    await user.click(screen.getByLabelText('Test'));
    expect(onChange).toHaveReturnedWith(true);
  });
});
