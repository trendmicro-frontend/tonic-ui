import { Box, ButtonBase, Flex, InputBase, Tag } from '@tonic-ui/react';
import { CloseSIcon } from '@tonic-ui/react-icons';
import { createTransitionStyle } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import { forwardRef } from 'react';

const preventDefault = (event) => event.preventDefault();

/**
 * Tag-input wrapper used by the multi-select Autocomplete recipe. Renders
 * `value` as `Tag` chips followed by a flat `<input>`, all inside a single
 * outline-styled box that mimics `InputControl variant="outline"`.
 *
 * Behavior is intentionally minimal — the consumer wires keyboard / blur logic
 * onto `inputProps` before passing it in. Consumer-supplied `onKeyDown` /
 * `onBlur` should call the hook handler from `inputProps` to keep popup
 * navigation working.
 *
 * @typedef {Object} TagInputProps
 * @property {object} [inputProps] - Props spread onto the inner `<input>`. Pass the chained handlers from `Autocomplete`'s `renderInput` here.
 * @property {boolean} [isClearable] - If `true`, show a clear button when there is at least one chip or non-empty input. Forward `Autocomplete`'s `renderInput` arg here.
 * @property {() => void} [onClearInput] - Called when the clear (X) button is clicked.
 * @property {(index: number) => void} [onRemoveTag] - Fires when a chip's close button is clicked.
 * @property {string} [placeholder] - Placeholder for the inner input.
 * @property {(tag: string, index: number) => React.ReactNode} [renderTag] - Customize chip content. Default: the tag string itself.
 * @property {string | string[]} [tags] - The chip values rendered before the input. Accepts a single string or an array of strings.
 */

/**
 * @type {ForwardRefComponent<'div', TagInputProps>}
 */
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
        borderColor="border._primary.enabled"
        borderRadius="sm"
        fontSize="sm"
        lineHeight="sm"
        rowGap="1x"
        columnGap="1x"
        transition={createTransitionStyle('border-color', { duration: 200 })}
        _hover={{
          borderColor: 'border._primary.hovered',
        }}
        _focusWithin={{
          borderColor: 'border._primary.focused',
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
            color: 'text.tertiary',
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
          color="text.secondary"
          _hover={{
            color: 'text.accent',
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
