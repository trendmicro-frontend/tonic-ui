import React, { forwardRef } from 'react';
import { Text, Flex } from '@tonic-ui/react';
import useFormControl from './useFormControl';
import {
  useFormCharacterCountColors,
  useFormCharacterCountStyle,
} from './styles';

const FormCharacterCount = forwardRef(
  ({ value = '', max = 0, ...rest }, ref) => {
    const characterCount = value.length;
    const isOverLimit = characterCount > max;
    const { countId } = useFormControl();
    const { lengthColor, maxColor } = useFormCharacterCountColors({
      isOverLimit,
    });
    const styleProps = useFormCharacterCountStyle();

    return (
      <Flex ref={ref} id={countId} {...styleProps} {...rest}>
        <Text color={lengthColor}>{characterCount}</Text>
        <Text color={maxColor}>/{max}</Text>
      </Flex>
    );
  }
);

FormCharacterCount.displayName = 'FormCharacterCount';

export default FormCharacterCount;
