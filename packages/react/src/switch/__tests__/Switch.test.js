import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Switch } from '@tonic-ui/react/src';
import React, { useEffect, useRef } from 'react';

describe('Switch', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        {/* Sizes */}
        <Switch size="sm" name="sizes">Label</Switch>
        <Switch size="md" name="sizes">Label</Switch>
        <Switch size="lg" name="sizes">Label</Switch>

        {/* States */}
        <Switch>Label</Switch>
        <Switch defaultChecked>Label</Switch>
        <Switch disabled>Label</Switch>
        <Switch disabled defaultChecked>Label</Switch>
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
        <Switch
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
