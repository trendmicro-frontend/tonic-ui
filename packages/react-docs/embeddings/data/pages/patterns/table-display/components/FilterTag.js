import {
  Tag,
  useColorMode,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const FilterTag = forwardRef((
  {
    disabled,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const hoverBackgroundColor = {
    dark: 'gray:60',
    light: 'gray:40',
  }[colorMode];
  const styleProps = {
    borderRadius: '.75rem',
    cursor: 'pointer',
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
    _disabled: {
      cursor: 'not-allowed',
      userSelect: 'none',
    },
  };

  return (
    <Tag
      disabled={disabled}
      isClosable
      tabIndex={disabled ? undefined : 0}
      sx={styleProps}
      {...rest}
    />
  );
});

FilterTag.displayName = 'FilterTag';

export default FilterTag;
