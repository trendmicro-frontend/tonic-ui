import {
  Box,
  InputBase,
  Tag,
  Text,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const noop = () => {};

const EditableTag = forwardRef((
  {
    children,
    isInvalid,
    onChange = noop,
    onClick = noop,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const tagInputRef = React.useRef();
  const tagHiddenSpanRef = React.useRef();
  const { sizes } = useTheme();
  const mt = `calc(${sizes['1x']} - 1px)`;
  const [inputVisible, setInputVisible] = React.useState(false);
  const handleInputVisible = () => setInputVisible(true);
  const handleInputHidden = () => setInputVisible(false);
  const handleInputBlur = (e) => {
    onChange(e);
    handleInputHidden();
  };
  const handleInputKeyUp = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      // Enter
      onChange(e);
      handleInputHidden();
    }
    if (keyCode === 27) {
      // Esc
      handleInputHidden();
    }
  };
  const handleTagClick = (e) => {
    e.stopPropagation();
    onClick(e);
    handleInputVisible();
  };
  const handleTagKeyUp = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      handleInputVisible();
    }
  };
  const resizeInput = () => {
    if (!tagInputRef.current) {
      return;
    }
    const tagInput = tagInputRef.current;
    const tagHiddenSpan = tagHiddenSpanRef.current;
    tagHiddenSpan.textContent = tagInput.value;
    tagInput.style.width = `${tagHiddenSpan.offsetWidth}px`;
    tagInput.focus();
  };

  React.useEffect(() => {
    resizeInput();
  }, [inputVisible]);

  const hoverInvalidBgColor = {
    dark: 'red:50',
    light: 'red:50',
  }[colorMode];

  if (inputVisible) {
    return (
      <>
        <Box
          as="span"
          ref={tagHiddenSpanRef}
          position="absolute"
          height="0"
          overflow="hidden"
          whiteSpace="pre"
        />
        <InputBase
          ref={tagInputRef}
          minHeight="6x"
          maxWidth="100%"
          mr="2x"
          mt={mt}
          defaultValue={children}
          onKeyUp={handleInputKeyUp}
          onBlur={handleInputBlur}
          onInput={resizeInput}
        />
      </>
    );
  }
  return (
    <Tag
      ref={ref}
      isClosable
      isInvalid={isInvalid}
      mr="2x"
      mt={mt}
      verticalAlign="top"
      onClick={handleTagClick}
      onKeyUp={handleTagKeyUp}
      cursor="pointer"
      {...isInvalid && {
        _hover: {
          '&:not(:focus)': {
            bg: hoverInvalidBgColor,
            '&::before': {
              bg: hoverInvalidBgColor,
            },
          },
        }
      }}
      {...rest}
    >
      <Text
        title={children}
        maxWidth={120}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {children}
      </Text>
    </Tag>
  );
});

EditableTag.displayName = 'EditableTag';

export default EditableTag;
