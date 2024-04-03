import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Radio } from '@tonic-ui/react/src';
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
});
