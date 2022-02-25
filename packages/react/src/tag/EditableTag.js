import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Icon } from '../icon';
import Tag from './Tag';
import TagCloseButton from './TagCloseButton';
import { useEditableTagStyle } from './styles';

const EditableTag = forwardRef((
  {
    borderRadius = 'sm',
    size = 'md',
    variant = 'solid',
    isInvalid,
    isClosable,
    disabled,
    children,
    onClose,
    ...props
  },
  ref
) => {
  onClose = ensureFunction(onClose);

  const tagStyleProps = useEditableTagStyle({
    isClosable,
    size,
    variant,
  });

  return (
    <Tag
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      aria-invalid={isInvalid}
      borderRadius={borderRadius}
      size={size}
      tabIndex={disabled ? '-1' : '0'}
      variant={variant}
      {...tagStyleProps}
      {...props}
    >
      { children }
      {!!isClosable && (
        <TagCloseButton
          disabled={disabled}
          onClick={onClose}
          tabIndex="-1" // no focus on close button
        >
          <Icon icon="close-s" verticalAlign="top" />
        </TagCloseButton>
      )}
    </Tag>
  );
});

EditableTag.displayName = 'EditableTag';

export default EditableTag;
