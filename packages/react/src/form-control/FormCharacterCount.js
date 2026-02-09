import React, { forwardRef } from 'react';
import { useId } from '@tonic-ui/react-hooks';
import { Text } from '../text';
import { Flex } from '../flex';
import useFormControl from './useFormControl';
import {
  useFormCharacterCountColors,
  useFormCharacterCountStyle,
} from './styles';

const FormCharacterCount = forwardRef(
  ({ count = 0, maxCount = 0, ...rest }, ref) => {
    const defaultId = useId();
    const formControl = useFormControl();
    const isOverLimit = count > maxCount;

    const id = formControl?.formCharacterCountId ?? defaultId;
    const { lengthColor, maxColor } = useFormCharacterCountColors({ isOverLimit });
    const styleProps = useFormCharacterCountStyle();

    return (
      <Flex ref={ref} id={id} {...styleProps} {...rest}>
        <Text color={lengthColor}>{count}</Text>
        <Text color={maxColor}>/{maxCount}</Text>
      </Flex>
    );
  }
);

FormCharacterCount.displayName = 'FormCharacterCount';

export default FormCharacterCount;
