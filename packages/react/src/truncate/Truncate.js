import { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { Text } from '../text';
import { useTruncateStyle } from './styles';

/**
 * @typedef {Object} TruncateProps
 * @property {React.ReactNode} [children] - The content to truncate.
 */

/**
 * @type {ForwardRefComponent<'div', TruncateProps>}
 */
const Truncate = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'Truncate' });
  const styleProps = useTruncateStyle();

  return (
    <Text
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

Truncate.displayName = 'Truncate';

export default Truncate;
