import React, {
  Children,
  cloneElement,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  isValidElement,
} from 'react';
import { useId } from '../utils/autoId';
import Box from '../Box';

const RadioGroup = forwardRef(
  (
    {
      onChange,
      name,
      value: valueProp,
      defaultValue,

      size,
      spacing,
      variantColor,
      disabled,
      inline,

      children,
      ...rest
    },
    ref,
  ) => {
    const { current: isControlled } = useRef(valueProp != null);
    const [value, setValue] = useState(defaultValue || null);
    const _value = isControlled ? valueProp : value;

    const rootRef = useRef();

    const _onChange = event => {
      if (!isControlled) {
        setValue(event.target.value);
      }

      if (onChange) {
        onChange(event, event.target.value);
      }
    };

    // If no name is passed, we'll generate a random, unique name
    const fallbackName = `radio-${useId()}`;
    const _name = name || fallbackName;

    const clones = Children.map(children, (child, index) => {
      if (!isValidElement(child)) {
        return null;
      }

      const isLastRadio = (children.length === index + 1);
      const defaultSpacing = spacing || (inline ? '6x' : '1x');
      const spacingProps = inline ? { mr: defaultSpacing } : { mb: defaultSpacing };

      return (
        <Box
          display={inline ? 'inline-block' : 'block'}
          {...(!isLastRadio && spacingProps)}
        >
          {cloneElement(child, {
            size: size,
            variantColor: variantColor,
            name: _name,
            onChange: _onChange,
            checked: child.props.value === _value,
            disabled: disabled,
          })}
        </Box>
      );
    });

    // Calling focus() on the radiogroup should focus on the selected option or first enabled option
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          let input = rootRef.current.querySelector(
            'input:not(:disabled):checked',
          );

          if (!input) {
            input = rootRef.current.querySelector('input:not(:disabled)');
          }

          if (input) {
            input.focus();
          }
        },
      }),
      [],
    );

    return (
      <Box ref={rootRef} role="radiogroup" {...rest}>
        {clones}
      </Box>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
