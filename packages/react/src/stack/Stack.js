import React from 'react';
import { Box } from '../box';
import { useStackStyle } from './styles';

const defaultDirection = 'column';

const uniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return String(id);
  };
})();

const Stack = ({
  children,
  direction,
  flexDirection,
  shouldWrapChildren,
  spacing = 0,
  ...rest
}) => {
  const validChildrenArray = React.Children
    .toArray(children)
    .filter(c => React.isValidElement(c));

  direction = (flexDirection ?? direction) ?? defaultDirection;

  const styleProps = useStackStyle({ direction, spacing });

  return (
    <Box
      {...styleProps}
      {...rest}
    >
      {validChildrenArray.map((child, index) => {
        if (shouldWrapChildren) {
          return (
            <Box
              key={uniqueId()}
              display="inline-block"
            >
              {child}
            </Box>
          );
        }

        return child;
      })}
    </Box>
  );
};

Stack.displayName = 'Stack';

export default Stack;
