import { useCheckboxGroup } from '@tonic-ui/react';

function UseCheckboxGroupExample() {
  const checkboxGroup = useCheckboxGroup();

  if (checkboxGroup) {
    // Properties
    const disabled = checkboxGroup.disabled;
    const name = checkboxGroup.name;
    const size = checkboxGroup.size;
    const value = checkboxGroup.value;
    const variantColor = checkboxGroup.variantColor;

    // Methods — onChange receives { checked, value }
    checkboxGroup.onChange({ checked: true, value: 'option1' });
  }

  return null;
}
