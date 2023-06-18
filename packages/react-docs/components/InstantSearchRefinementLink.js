import {
  Link,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import NextLink from 'next/link';
import React, { forwardRef } from 'react';

const InstantSearchRefinementLink = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const defaultColor = colorStyle.color.secondary;
  const activeColor = colorStyle.color.primary;
  const hoverColor = colorStyle.color.primary;
  const visitedColor = colorStyle.color.secondary;
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];

  return (
    <NextLink
      href={props?.href}
      legacyBehavior
      passHref
    >
      <Link
        ref={ref}
        display="flex"
        alignItems="center"
        columnGap="3x"
        height="12x"
        color={defaultColor}
        border={1}
        borderColor="transparent"
        borderRadius="md"
        px="3x"
        textDecoration="none"
        width="100%"
        _active={{
          color: activeColor,
        }}
        _hover={{
          color: hoverColor,
          borderColor: hoverBorderColor,
        }}
        _visited={{
          color: visitedColor,
        }}
        {...props}
      />
    </NextLink>
  );
});

InstantSearchRefinementLink.displayName = 'InstantSearchRefinementLink';

export default InstantSearchRefinementLink;
