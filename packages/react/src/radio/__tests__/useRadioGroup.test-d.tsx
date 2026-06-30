import { useRadioGroup } from '@tonic-ui/react';

function UseRadioGroupExample() {
  const radioGroup = useRadioGroup();

  if (radioGroup) {
    // Properties
    const disabled = radioGroup.disabled;
    const name = radioGroup.name;
    const size = radioGroup.size;
    const value = radioGroup.value;
    const variantColor = radioGroup.variantColor;

    // Methods — onChange receives { value }
    radioGroup.onChange({ value: 'option1' });
  }

  return null;
}
