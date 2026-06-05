import { Box, ButtonBase, Flex, InputBase, Tag, useColorMode } from '@tonic-ui/react';
import { CloseSIcon } from '@tonic-ui/react-icons';
import { createTransitionStyle } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import { forwardRef } from 'react';

const preventDefault = (event) => event.preventDefault();

const TagInput = forwardRef((props, ref) => {
  const {
    inputProps,
    isClearable,
    onClearInput,
    onRemoveTag,
    placeholder,
    renderTag,
    tags: tagsProp,
    ...rest
  } = props;

  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const hoverBorderColor = 'blue:50';
  const focusBorderColor = 'blue:60';
  const placeholderColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const clearButtonColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const clearButtonHoverColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  const tags = ensureArray(tagsProp);

  // Show the clear button if `isClearable=true`, the input isn't disabled,
  // and there is at least one chip OR a non-empty typed value.
  const showClearButton = isClearable &&
    !inputProps?.disabled &&
    (tags.length > 0 || !!inputProps?.value);

  return (
    <Box ref={ref} position="relative" {...rest}>
      <Flex
        flexWrap="wrap"
        alignItems="center"
        gap="1x"
        minHeight="9x"
        width="100%"
        px="3x"
        py="2x"
        // Reserve room on the right for the absolutely-positioned clear button
        // so chips/input never underlap it.
        pr={showClearButton ? '8x' : '3x'}
        border={1}
        borderColor={borderColor}
        borderRadius="sm"
        fontSize="sm"
        lineHeight="sm"
        rowGap="1x"
        columnGap="1x"
        transition={createTransitionStyle('border-color', { duration: 200 })}
        _hover={{
          borderColor: hoverBorderColor,
        }}
        _focusWithin={{
          borderColor: focusBorderColor,
        }}
      >
        {tags.map((tag, index) => (
          <Tag
            // eslint-disable-next-line react/no-array-index-key
            key={`${tag}:${index}`}
            size="sm"
            isClosable
            onClose={() => onRemoveTag?.(index)}
            // Keep focus on the input when clicking the tag close button.
            onMouseDown={preventDefault}
          >
            {typeof renderTag === 'function' ? renderTag(tag, index) : tag}
          </Tag>
        ))}
        <InputBase
          {...inputProps}
          fontSize="inherit"
          lineHeight="inherit"
          flex="1 1 auto"
          minWidth="10x"
          _placeholder={{
            color: placeholderColor,
          }}
          placeholder={placeholder}
        />
      </Flex>
      {showClearButton ? (
        <ButtonBase
          aria-label="Clear"
          // Anchored to the top-right so the button stays put as chips wrap to additional rows.
          // `top="3x"` aligns it with the first chip row.
          position="absolute"
          top="3x"
          right="2x"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          color={clearButtonColor}
          _hover={{
            color: clearButtonHoverColor,
          }}
          // Keep focus on the input when clicking the clear button.
          onMouseDown={preventDefault}
          onClick={() => onClearInput?.()}
        >
          <CloseSIcon size="4x" />
        </ButtonBase>
      ) : null}
    </Box>
  );
});

TagInput.displayName = 'TagInput';

export default TagInput;
