import React from 'react';
import Flex from '../Flex';
import Box from '../Box';

const Stack = ({
  children,
  direction = 'column',
  spacing = 0,
  shouldWrapChildren,
  ...rest
}) => {
  const validChildrenArray = React.Children
    .toArray(children)
    .filter(c => React.isValidElement(c));

  return (
    <Flex
      direction={direction}
      {...rest}
    >
      {validChildrenArray.map((child, index) => {
        const isLastChild = ((index + 1) === validChildrenArray.length);
        const id = index;
        const spacingProps = {
          'column': {
            'mb': isLastChild ? null : spacing,
          },
          'column-reverse': {
            'mt': isLastChild ? null : spacing,
          },
          'row': {
            'mr': isLastChild ? null : spacing,
          },
          'row-reverse': {
            'ml': isLastChild ? null : spacing,
          },
        }[direction];

        if (shouldWrapChildren) {
          return (
            <Box
              key={`stack-box-wrapper-${id}`}
              display="inline-block"
              {...spacingProps}
            >
              {child}
            </Box>
          );
        }

        return React.cloneElement(child, spacingProps);
      })}
    </Flex>
  );
};

export default Stack;
