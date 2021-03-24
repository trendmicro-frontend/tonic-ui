import {
  Box,
  InputBase,
  Tag,
  useColorMode,
  useTheme,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const EditableTag = React.forwardRef((
  {
    value,
    isInvalid,
    onChange,
    onClick,
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
          mr="2x"
          mt={mt}
          defaultValue={value}
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
      isCloseButtonVisible
      isInvalid={isInvalid}
      mr="2x"
      mt={mt}
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
    />
  );
});

export default EditableTag;
