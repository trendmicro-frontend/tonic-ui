import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import StackItem from './StackItem';
import { useStackStyle } from './styles';

const defaultDirection = 'column';

const Stack = forwardRef((inProps, ref) => {
  const {
    children,
    direction: directionProp,
    flexDirection: flexDirectionProp,
    shouldWrapChildren,
    spacing = 0,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Stack' });
  const direction = (flexDirectionProp ?? directionProp) ?? defaultDirection;
  const styleProps = useStackStyle({ direction, spacing });

  // Filter only the valid children of a component, and ignore any nullish or falsy child.
  const validChildren = React.Children
    .toArray(children)
    .filter(c => React.isValidElement(c));

  let clones = validChildren;
  if (shouldWrapChildren) {
    clones = validChildren.map((child, index) => {
      // Use the provided child key, otherwise use the index as fallback
      const key = (typeof child.key !== 'undefined') ? child.key : index;

      return (
        <StackItem key={key}>
          {child}
        </StackItem>
      );
    });
  }

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {clones}
    </Box>
  );
});

Stack.displayName = 'Stack';

export default Stack;
