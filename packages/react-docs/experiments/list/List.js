import { Box } from '@tonic-ui/react';
import { forwardRef } from 'react';

const defaultVariant = 'unordered';

const List = forwardRef((
  {
    variant = defaultVariant,
    ...rest
  },
  ref,
) => {
  const as = {
    unordered: 'ul',
    ordered: 'ol',
  }[variant];
  const styleProps = {
    margin: 0,
    paddingLeft: '6x',
  };

  return (
    <Box
      as={as}
      {...styleProps}
      {...rest}
    />
  );
});

List.displayName = 'List';

export default List;
