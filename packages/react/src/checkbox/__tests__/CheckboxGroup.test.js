import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { Checkbox, CheckboxGroup } from '@tonic-ui/react/src';

describe('CheckboxGroup', () => {
  it('should render correctly', () => {
    const { container } = render(
      <CheckboxGroup defaultValue={['1']}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
        <Checkbox value="3">Option 3</Checkbox>
      </CheckboxGroup>
    );

    expect(container).toMatchSnapshot();
  });

  it('should handle string values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="banana">Banana</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByLabelText('Apple'));
    expect(onChange).toHaveBeenCalledWith(['apple']);

    await user.click(screen.getByLabelText('Banana'));
    expect(onChange).toHaveBeenCalledWith(['apple', 'banana']);
  });

  it('should handle number values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox value={1}>One</Checkbox>
        <Checkbox value={2}>Two</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByLabelText('One'));
    expect(onChange).toHaveBeenCalledWith([1]);

    await user.click(screen.getByLabelText('Two'));
    expect(onChange).toHaveBeenCalledWith([1, 2]);
  });

  it('should handle boolean values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox value={true}>True</Checkbox>
        <Checkbox value={false}>False</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByLabelText('True'));
    expect(onChange).toHaveBeenCalledWith([true]);

    await user.click(screen.getByLabelText('False'));
    expect(onChange).toHaveBeenCalledWith([true, false]);
  });

  it('should handle object values', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    const value1 = { id: 1, name: 'Option 1' };
    const value2 = { id: 2, name: 'Option 2' };

    render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox value={value1}>Option 1</Checkbox>
        <Checkbox value={value2}>Option 2</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByLabelText('Option 1'));
    expect(onChange).toHaveBeenCalledWith([value1]);

    await user.click(screen.getByLabelText('Option 2'));
    expect(onChange).toHaveBeenCalledWith([value1, value2]);
  });

  it('should handle controlled value changes', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <CheckboxGroup value={['1']} onChange={onChange}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();

    rerender(
      <CheckboxGroup value={['1', '2']} onChange={onChange}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });

  it('should handle uncontrolled value changes', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup defaultValue={['1']} onChange={onChange}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </CheckboxGroup>
    );

    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();

    await user.click(screen.getByLabelText('Option 2'));
    expect(onChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('should handle disabled state', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup disabled onChange={onChange}>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByLabelText('Option 1'));
    await user.click(screen.getByLabelText('Option 2'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
