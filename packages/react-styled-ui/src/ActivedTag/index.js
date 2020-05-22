import React, { forwardRef } from 'react';
import Tag from '../Tag';

const ActivedTag = forwardRef(
  (
    props,
    ref,
  ) => {
    const {
      isCloseable = true,
      variantColor
    } = props;

    return (
      <Tag
        ref={ref}
        canFocus
        isCloseable={isCloseable}
        cursor="pointer"
        _hover={{
          '&:not(:focus)': {
            bg: `${variantColor}:60`,
            '& > :first-child': {
              bg: `${variantColor}:60`,
            },
          },
        }}
        {...props}
      />
    );
  },
);

ActivedTag.displayName = 'ActivedTag';

export default ActivedTag;
