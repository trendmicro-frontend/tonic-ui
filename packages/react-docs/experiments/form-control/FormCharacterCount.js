import { Text, Flex } from '@tonic-ui/react';
import { useId } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { ensureString } from 'ensure-type';
import useFormControl from './useFormControl';
import {
  useFormCharacterCountColors,
  useFormCharacterCountStyle,
} from './styles';

const FormCharacterCount = forwardRef((
  {
    value = '',
    max = 0,
    ...rest
  },
  ref
) => {
  const defaultId = useId();
  const { formCharacterCountId } = useFormControl() ?? {};
  const id = formCharacterCountId ?? defaultId;
  const characterCount = ensureString(value).length;
  const isOverLimit = characterCount > max;
  const { lengthColor, maxColor } = useFormCharacterCountColors({
    isOverLimit,
  });
  const styleProps = useFormCharacterCountStyle();

  return (
    <Flex ref={ref} id={id} {...styleProps} {...rest}>
      <Text color={lengthColor}>{characterCount}</Text>
      <Text color={maxColor}>/{max}</Text>
    </Flex>
  );
});

FormCharacterCount.displayName = 'FormCharacterCount';

export default FormCharacterCount;
