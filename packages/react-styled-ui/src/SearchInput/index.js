import { keyframes } from '@emotion/core';
import React, { useCallback, useEffect, useState } from 'react';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
import Icon from '../Icon';
import Input from '../Input';
import useColorMode from '../useColorMode';
import splitProps from './split-props';

const spin = keyframes`
  0% {
    transform: rotate(0eg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const SearchInput = React.forwardRef((
  {
    isLoading,
    onChange,
    onClearInput,
    ...rest
  },
  ref
) => {
  const [rootProps, inputProps] = splitProps(rest);
  const { colorMode } = useColorMode();
  const primaryColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const tertiaryColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];

  const hasValue = !!rest.defaultValue || !!rest.value;
  const [isClearable, setIsClearable] = useState(hasValue);
  useEffect(() => {
    const value = String(ref?.current?.value ?? '');
    setIsClearable(value.length > 0);
  }, [ref]);

  const iconState = (() => {
    if (isLoading) {
      return 'loading';
    }
    if (isClearable) {
      return 'clearable';
    }
    return null;
  })();

  const handleClick = useCallback((e) => {
    if (iconState !== 'clearable') {
      return;
    }

    setIsClearable(false);

    if (typeof onClearInput === 'function') {
      onClearInput(e);
    }
  }, [iconState, onClearInput]);

  return (
    <Flex
      align="center"
      position="relative"
      {...rootProps}
    >
      <Flex
        align="center"
        position="absolute"
        left={0}
        height="100%"
        color={tertiaryColor}
        px="3x"
      >
        <Icon name="_core.search-o" />
      </Flex>
      <Input
        ref={ref}
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
      <Flex
        align="center"
        position="absolute"
        right={0}
        height="100%"
        zIndex={2}
      >
        <ButtonBase
          cursor="default"
          color={tertiaryColor}
          _hover={{
            cursor: 'pointer',
            color: primaryColor,
          }}
          onClick={handleClick}
          px="3x"
        >
          {iconState === 'loading' && (
            <Icon name="_core.spinner" animation={`${spin} 2s infinite linear`} />
          )}
          {iconState === 'clearable' && (
            <Icon name="_core.close-s" />
          )}
        </ButtonBase>
      </Flex>
    </Flex>
  );
});

export default SearchInput;
