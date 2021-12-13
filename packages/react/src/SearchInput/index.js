import { keyframes } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import Input from '../Input';
import useColorMode from '../useColorMode';
import useForkRef from '../utils/useForkRef';
import splitProps from './split-props';

const spin = keyframes`
  0% {
    transform: rotate(0eg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const InputAdornmentPrepend = (props) => (
  <Box
    display="flex"
    alignItems="center"
    position="absolute"
    left={0}
    height="100%"
    px="3x"
    // The z-index value should be at least 3 for the prepeneded input adornment
    zIndex={3}
    {...props}
  />
);

const InputAdornmentAppend = (props) => (
  <Box
    display="flex"
    alignItems="center"
    position="absolute"
    right={0}
    height="100%"
    px="3x"
    // The z-index value should be at least 2 for the appended input adornment
    zIndex={2}
    {...props}
  />
);

const SearchInput = React.forwardRef((
  {
    isLoading,
    onChange,
    onClearInput,
    ...rest
  },
  ref
) => {
  const inputRef = useRef();
  const combinedRef = useForkRef(inputRef, ref);
  const [rootProps, inputProps] = splitProps(rest);
  const [colorMode] = useColorMode();
  const primaryColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const tertiaryColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];

  const [isClearable, setIsClearable] = useState(!!(rest.value ?? rest.defaultValue));
  const refValue = String(inputRef.current?.value ?? '');
  useEffect(() => {
    setIsClearable(refValue.length > 0);
  }, [refValue, setIsClearable]);

  const iconState = (() => {
    if (isLoading) {
      return 'loading';
    }
    if (isClearable) {
      return 'clearable';
    }
    return null;
  })();

  const handleClickClearButton = (e) => {
    if (iconState !== 'clearable') {
      return;
    }

    inputRef.current.value = '';
    setIsClearable(false);

    if (typeof onClearInput === 'function') {
      onClearInput(e);
    }
  };

  return (
    <Box
      display="flex"
      position="relative"
      transition="all .2s"
      {...rootProps}
    >
      <InputAdornmentPrepend
        color={tertiaryColor}
      >
        <Icon icon="search-o" />
      </InputAdornmentPrepend>
      <Input
        ref={combinedRef}
        pl="10x"
        pr="10x"
        onChange={(e) => {
          const value = String(e.target.value ?? '');
          setIsClearable(value.length > 0);

          if (typeof onChange === 'function') {
            onChange(e);
          }
        }}
        {...inputProps}
      />
      <InputAdornmentAppend
        color={tertiaryColor}
      >
        {iconState === 'clearable' && (
          <ButtonBase
            _hover={{
              color: primaryColor,
            }}
            onClick={handleClickClearButton}
          >
            <Icon icon="close-s" />
          </ButtonBase>
        )}
        {iconState === 'loading' && (
          <Icon
            icon="spinner"
            animation={`${spin} 2s infinite linear`}
          />
        )}
      </InputAdornmentAppend>
    </Box>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
