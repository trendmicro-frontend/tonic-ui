import { AngleDownIcon, CloseSIcon } from '@tonic-ui/react-icons';
import React, { forwardRef, useCallback } from 'react';
import { Box } from '../box';
import { ButtonBase } from '../button';
import { useColorMode } from '../color-mode';
import { useDefaultProps } from '../default-props';
import { InputControl } from '../input';
import { Spinner } from '../spinner';

const preventDefault = (event) => event.preventDefault();

/**
 * @typedef {Object} AutocompleteInputProps
 * @property {boolean} [autoFocus] - Focuses the underlying `<input>` element on mount.
 * @property {boolean} [disabled] - Disables the input and prevents user interactions.
 * @property {boolean} [error] - If `true`, the input is displayed in error state.
 * @property {React.InputHTMLAttributes<HTMLInputElement> & { [key: string]: unknown }} [inputProps] - Props applied to the underlying `<input>` element. Hook-managed ARIA/ref/value props flow in via `renderInput` params; consumers may merge additional attributes (e.g. `data-*`).
 * @property {boolean} [isClearable=false] - If `true`, enables the clear-button capability. The actual button visibility depends on the input having a value and not being disabled.
 * @property {boolean} [isLoading=false] - If `true`, the clear button is replaced by a loading spinner.
 * @property {string} [name] - `name` attribute forwarded to the underlying `<input>` element.
 * @property {(event?: React.SyntheticEvent) => void} [onClearInput] - Callback fired when the clear button is clicked.
 * @property {string} [placeholder] - Placeholder text forwarded to the underlying `<input>` element.
 * @property {boolean} [required] - Marks the underlying `<input>` element as required.
 */

/**
 * @type {ForwardRefComponent<'div', AutocompleteInputProps>}
 */
const AutocompleteInput = forwardRef((inProps, ref) => {
  const {
    autoFocus,
    disabled,
    error,
    id,
    inputProps,
    isClearable,
    isLoading,
    name,
    onClearInput,
    placeholder,
    required,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AutocompleteInput' });

  const [colorMode] = useColorMode();
  const clearButtonColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const clearButtonHoverColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  const value = inputProps?.value ?? '';
  const showClearButton = isClearable && !disabled && !!value;
  const showSpinner = isLoading && !disabled;

  const handleClick = useCallback((event) => {
    // Prevent the popup from reopening when the clear button is clicked.
    event.preventDefault();

    onClearInput?.(event);
  }, [onClearInput]);

  const spinnerIcon = (
    <Box
      display="inline-flex"
      alignSelf="stretch"
      alignItems="center"
      justifyContent="center"
      px="2x"
      onMouseDown={preventDefault}
    >
      <Spinner size="xs" />
    </Box>
  );

  let endAdornment;
  if (showSpinner) {
    endAdornment = spinnerIcon;
  } else if (showClearButton) {
    endAdornment = (
      <ButtonBase
        aria-label="Clear"
        display="inline-flex"
        alignSelf="stretch"
        alignItems="center"
        justifyContent="center"
        px="2x"
        color={clearButtonColor}
        _hover={{
          color: clearButtonHoverColor,
        }}
        onMouseDown={preventDefault}
        onClick={handleClick}
      >
        <CloseSIcon size="4x" />
      </ButtonBase>
    );
  } else {
    endAdornment = (
      <Box
        display="inline-flex"
        alignSelf="stretch"
        alignItems="center"
        justifyContent="center"
        px="2x"
        onMouseDown={preventDefault}
      >
        <AngleDownIcon size="4x" />
      </Box>
    );
  }

  return (
    <InputControl
      ref={ref}
      width="100%"
      // `inputProps` carries the hook-managed ARIA / ref / value / handlers.
      // HTML attrs and visual state are passed at the top level — InputControl
      // forwards them onto the underlying `<input>` itself.
      slotProps={{ input: inputProps }}
      placeholder={placeholder}
      id={id}
      name={name}
      autoFocus={autoFocus}
      required={required}
      disabled={disabled}
      error={error}
      endAdornment={endAdornment}
      {...rest}
    />
  );
});

AutocompleteInput.displayName = 'AutocompleteInput';

export default AutocompleteInput;
