import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useListStyle } from './styles';

/**
 * `List` renders a `ul` by default. Pass `as="ol"` for an ordered list.
 *
 * @type {ForwardRefComponent<'ul'>}
 */
const List = forwardRef((inProps, ref) => {
  const {
    ...rest
  } = useDefaultProps({ props: inProps, name: 'List' });
  const styleProps = useListStyle();

  return (
    <Box
      as="ul"
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

List.displayName = 'List';

export default List;
