import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import { Switch } from '@tonic-ui/react/src';
import React, { useEffect, useRef } from 'react';

describe('Switch', () => {
  it('should render a check icon inside the thumb group', () => {
    const { container } = render(<Switch defaultChecked />);
    const check = container.querySelector('[data-switch-check]');
    expect(check).not.toBeNull();
    expect(check.tagName.toLowerCase()).toBe('svg');
    expect(check.querySelector('path')).not.toBeNull();
    // The check sits inside the thumb group so it rides the translate
    expect(check.parentElement.getAttribute('data-switch-thumb-group')).not.toBeNull();
  });

  it('should size the check 8/12/16 for sm/md/lg', () => {
    const { container, rerender } = render(<Switch defaultChecked size="sm" />);
    expect(
      container.querySelector('[data-switch-check]').getAttribute('width'),
    ).toBe('8');
    rerender(<Switch defaultChecked size="md" />);
    expect(
      container.querySelector('[data-switch-check]').getAttribute('width'),
    ).toBe('12');
    rerender(<Switch defaultChecked size="lg" />);
    expect(
      container.querySelector('[data-switch-check]').getAttribute('width'),
    ).toBe('16');
  });

  it('should render correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <>
        {/* Sizes */}
        <Switch size="sm" name="sizes">Label</Switch>
        <Switch size="md" name="sizes">Label</Switch>
        <Switch size="lg" name="sizes">Label</Switch>

        {/* Selected on */}
        <Switch defaultChecked>Label</Switch>

        {/* Disabled */}
        <Switch disabled>Label</Switch>
        <Switch disabled defaultChecked>Label</Switch>

        {/* Read-only */}
        <Switch readOnly>Label</Switch>
        <Switch readOnly defaultChecked>Label</Switch>
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should set aria-readonly and prevent toggling when readOnly', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Switch readOnly defaultChecked onChange={onChange} />,
    );
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('aria-readonly', 'true');

    input.click();
    expect(onChange).not.toHaveBeenCalled();
    expect(input.checked).toBe(true);
  });

  it('should still be focusable when readOnly', () => {
    const { container } = render(<Switch readOnly />);
    const input = container.querySelector('input[type="checkbox"]');
    input.focus();
    expect(document.activeElement).toBe(input);
  });

  it('should treat disabled as winning over readOnly', () => {
    const { container } = render(<Switch readOnly disabled />);
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeDisabled();
    // disabled blocks interaction, but aria-readonly stays exposed so assistive technology can describe intent.
    expect(input).toHaveAttribute('aria-readonly', 'true');
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

  it('should use default cursor on the readOnly wrapper label', () => {
    const { container } = render(<Switch readOnly>Label</Switch>);
    const label = container.querySelector('label');
    expect(label).toHaveStyleRule('cursor', 'default');
  });

  it('should keep accent label color when readOnly (not disabled)', () => {
    const { container } = render(<Switch readOnly>Label</Switch>);
    const labelText = container.querySelector('label > div:last-child');
    expect(labelText).toHaveStyleRule('color', 'var(--tonic-colors-text-accent)');
  });

  it('should show the check icon when readOnly + defaultChecked', () => {
    const { container } = render(<Switch readOnly defaultChecked />);
    const check = container.querySelector('[data-switch-check]');
    expect(getComputedStyle(check).opacity).toBe('1');
  });
});
