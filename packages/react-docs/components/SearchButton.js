import { ButtonBase, Flex, Text } from '@tonic-ui/react';
import { SearchOIcon } from '@tonic-ui/react-icons';
import { forwardRef } from 'react';

const SearchButton = forwardRef(({ children, ...rest }, ref) => {
  return (
    <ButtonBase
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border={1}
      borderColor="border._primary.enabled"
      borderRadius="sm"
      _focus={{
        borderColor: 'border._primary.focused',
      }}
      _hover={{
        borderColor: 'border._primary.hovered',
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
      <Flex alignItems="center" columnGap="2x">
        <SearchOIcon />
        <Text
          display={{
            sm: 'none',
            md: 'block',
          }}
          color="text.tertiary"
        >
          {children}
        </Text>
      </Flex>
    </ButtonBase>
  );
});

SearchButton.displayName = 'SearchButton';

export default SearchButton;
