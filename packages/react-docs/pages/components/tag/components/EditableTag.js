import {
  Box,
  Tag,
  TagCloseButton,
  useTheme,
} from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import AutosizeInput from './AutosizeInput';
import { useEditableTagStyle } from './styles';

const EditableTag = forwardRef((
  {
    children,
    disabled,
    isClosable = true,
    labelMaxWidth = 0,
    size = 'md',
    variant = 'solid',

    onChange,
    onClick,
    onClose,
    onFocus,
    ...props
  },
  ref
) => {
  onChange = ensureFunction(onChange);
  onClick = ensureFunction(onClick);
  onClose = ensureFunction(onClose);

  const [value, setValue] = useState(children);
  const [inputVisible, setInputVisible] = useState(false);
  const handleInputVisible = () => setInputVisible(true);
  const handleInputHidden = () => setInputVisible(false);
  const updateTag = (inputValue) => {
    setValue(inputValue);
    onChange({ value: inputValue });
    handleInputHidden();
  };

  // handle input events
  const handleInputBlur = (e) => {
    const inputValue = e.target.value;
    updateTag(inputValue);
  };
  const handleInputKeyUp = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) { // Enter
      const inputValue = e.target.value;
      updateTag(inputValue);
    }
    if (keyCode === 27) { // Esc
      handleInputHidden();
    }
  };

  // handle tag events
  const handleTagClick = (e) => {
    e.stopPropagation();
    handleInputVisible();
    onClick(e);
  };
  const handleTagClose = (e) => {
    e.stopPropagation();
    onClose(e);
  };
  const handleTagKeyUp = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      handleInputVisible();
    }
  };
  const handleTagFocus = ensureFunction(onFocus);

  const tagStyleProps = useEditableTagStyle({
    size,
    variant,
  });

  const theme = useTheme();
  const limitWidthStyle = {
    maxWidth: `calc(${labelMaxWidth}px - ${isClosable ? theme?.sizes?.['5x'] : 0})`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  if (inputVisible) {
    return (
      <AutosizeInput
        defaultValue={value}
        onBlur={handleInputBlur}
        onKeyUp={handleInputKeyUp}
      />
    );
  }

  return (
    <Tag
      ref={ref}
      variant={variant}
      size={size}
      disabled={disabled}
      tabIndex={disabled ? '-1' : '0'}
      onClick={disabled ? undefined : handleTagClick}
      onFocus={disabled ? undefined : handleTagFocus}
      onKeyUp={disabled ? undefined : handleTagKeyUp}
      {...tagStyleProps}
      {...props}
    >
      <Box
        display="inline-block"
        {...(labelMaxWidth && limitWidthStyle)}
      >
        {value}
      </Box>
      {!!isClosable && (
        <TagCloseButton
          disabled={disabled}
          tabIndex="-1" // no focus on close button
          ml="2x"
          onClick={handleTagClose}
        />
      )}
    </Tag>
  );
});

EditableTag.displayName = 'EditableTag';

export default EditableTag;
