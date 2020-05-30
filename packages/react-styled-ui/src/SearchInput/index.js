import { keyframes } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
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

const SearchInput = React.forwardRef((
  {
    isLoading,
    onChange,
    onClearInput,
    ...rest
  },
  ref
) => {
  const searchInputRef = useRef();
  const forkedRef = useForkRef(searchInputRef, ref);
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

  const [isClearable, setIsClearable] = useState(!!(rest.value ?? rest.defaultValue));
  const refValue = String(searchInputRef.current?.value ?? '');
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

    searchInputRef.current.value = '';
    setIsClearable(false);

    if (typeof onClearInput === 'function') {
      onClearInput(e);
    }
  };

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
        zIndex={3}
        color={tertiaryColor}
        px="3x"
      >
        <Icon name="_core.search-o" />
      </Flex>
      <Input
        ref={forkedRef}
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
      {!!iconState && (
        <Flex
          align="center"
          position="absolute"
          right={0}
          height="100%"
          zIndex={3}
          color={tertiaryColor}
          px="3x"
        >
          {iconState === 'clearable' && (
            <ButtonBase
              _hover={{
                color: primaryColor,
              }}
              onClick={handleClickClearButton}
            >
              <Icon name="_core.close-s" />
            </ButtonBase>
          )}
          {iconState === 'loading' && (
            <Icon name="_core.spinner" animation={`${spin} 2s infinite linear`} />
          )}
        </Flex>
      )}
    </Flex>
  );
});

export default SearchInput;
