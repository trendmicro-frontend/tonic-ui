import { ariaAttr, dataAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import ButtonBase from './ButtonBase';
import { useButtonStyle } from './styles';
import useButtonGroup from './useButtonGroup';

const defaultSize = 'md';
const defaultVariant = 'default';
const defaultOrientation = 'horizontal';

const Button = forwardRef((inProps, ref) => {
  const {
    disabled,
    selected,
    size: sizeProp,
    variant: variantProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Button' });

  let orientation; // orientation for ButtonGroup
  let size = sizeProp;
  let variant = variantProp;

  const buttonGroupContext = useButtonGroup();
  if (buttonGroupContext) {
    const {
      size: buttonGroupSize,
      variant: buttonGroupVariant,
      orientation: buttonGroupOrientation,
    } = { ...buttonGroupContext };
    // Use fallback values if values are null or undefined
    size = (size ?? buttonGroupSize) ?? defaultSize;
    variant = (variant ?? buttonGroupVariant) ?? defaultVariant;
    orientation = buttonGroupOrientation ?? defaultOrientation;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variant = variant ?? defaultVariant;
  }

  const attributes = {
    'aria-disabled': ariaAttr(disabled),

    // Only use `aria-selected` with these roles: `option`, `tab`, `menuitemradio`, `treeitem`, `gridcell`, `row`, `rowheader`, and `columnheader`.
    'data-selected': dataAttr(selected),

    type: 'button',

    // Disable the button if "disabled" is true
    disabled,

    // For button in the disabled state, just keep "pointer-events" and "tabIndex" as is.
    // For button in the selected state, set both "pointer-events: none" and "tabIndex: -1" to prevent the button receiving focus through sequential keyboard navigation.
    tabIndex: selected ? -1 : undefined,
  };

  const styleProps = useButtonStyle({
    orientation, // No default value if not specified
    size,
    variant,
  });

  return (
    <ButtonBase
      ref={ref}
      as="button"
      {...attributes}
      {...styleProps}
      {...rest}
    />
  );
});

Button.displayName = 'Button';

export default Button;
