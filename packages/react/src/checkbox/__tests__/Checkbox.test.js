import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Checkbox } from '@tonic-ui/react/src';
import React, { useEffect, useRef } from 'react';

describe('Checkbox', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
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
});
