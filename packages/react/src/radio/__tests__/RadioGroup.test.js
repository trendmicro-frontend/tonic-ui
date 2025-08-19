import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Radio, RadioGroup } from '@tonic-ui/react/src';
import React from 'react';

describe('RadioGroup', () => {
  it('should render correctly', () => {
    const { container } = render(
      <RadioGroup defaultValue="1">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
    );

    expect(container).toMatchSnapshot();
  });

  it('should handle string values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="" onChange={onChange}>
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
      </RadioGroup>
    );

    await user.click(screen.getByLabelText('Apple'));
    expect(onChange).toHaveBeenCalledWith('apple');

    await user.click(screen.getByLabelText('Banana'));
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('should handle number values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="" onChange={onChange}>
        <Radio value={1}>One</Radio>
        <Radio value={2}>Two</Radio>
      </RadioGroup>
    );

    await user.click(screen.getByLabelText('One'));
    expect(onChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByLabelText('Two'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should handle boolean values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="" onChange={onChange}>
        <Radio value={true}>True</Radio>
        <Radio value={false}>False</Radio>
      </RadioGroup>
    );

    await user.click(screen.getByLabelText('True'));
    expect(onChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByLabelText('False'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('should handle object values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    const value1 = { id: 1, name: 'Option 1' };
    const value2 = { id: 2, name: 'Option 2' };

    render(
      <RadioGroup defaultValue="" onChange={onChange}>
        <Radio value={value1}>Option 1</Radio>
        <Radio value={value2}>Option 2</Radio>
      </RadioGroup>
    );

    await user.click(screen.getByLabelText('Option 1'));
    expect(onChange).toHaveBeenCalledWith(value1);

    await user.click(screen.getByLabelText('Option 2'));
    expect(onChange).toHaveBeenCalledWith(value2);
  });

  it('should handle controlled value changes', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <RadioGroup value="1" onChange={onChange}>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();

    rerender(
      <RadioGroup value="2" onChange={onChange}>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 1')).not.toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });

  it('should handle uncontrolled value changes', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="1" onChange={onChange}>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();

    await user.click(screen.getByLabelText('Option 2'));
    expect(onChange).toHaveBeenCalledWith('2');
  });

  it('should handle disabled state', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup disabled defaultValue="" onChange={onChange}>
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
      </RadioGroup>
    );

    await user.click(screen.getByLabelText('Option 1'));
    await user.click(screen.getByLabelText('Option 2'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
