import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Radio, RadioGroup } from '@tonic-ui/react/src';
import React, { useEffect, useRef } from 'react';

describe('Radio', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
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
});
