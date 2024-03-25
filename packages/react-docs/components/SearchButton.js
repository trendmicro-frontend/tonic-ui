import {
  ButtonBase,
  Flex,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  SearchOIcon,
} from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';

const SearchButton = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const focusBorderColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];

  return (
    <ButtonBase
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      color={colorStyle.color.primary}
      border={1}
      borderColor={borderColor}
      borderRadius="sm"
      _focus={{
        borderColor: focusBorderColor,
      }}
      _hover={{
        borderColor: hoverBorderColor,
      }}
      fontSize="sm"
      lineHeight="sm"
      px="3x"
      height="8x"
      minWidth={{
        sm: 34,
        md: 200,
      }}
      transition="min-width 0.2s"
      {...rest}
    >
      <Flex
        alignItems="center"
        columnGap="2x"
      >
        <SearchOIcon />
        <Text
          display={{
            sm: 'none',
            md: 'block',
          }}
          color={colorStyle.color.secondary}
        >
          {children}
        </Text>
      </Flex>
    </ButtonBase>
  );
});

SearchButton.displayName = 'SearchButton';

export default SearchButton;
