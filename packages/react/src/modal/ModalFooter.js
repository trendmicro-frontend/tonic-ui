import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useModalFooterStyle,
} from './styles';

/**
 * @typedef {Object} ModalFooterProps
 * @property {React.ReactNode} [children] - The content of the modal footer.
 */

/**
 * @type {ForwardRefComponent<'div', ModalFooterProps>}
 */
const ModalFooter = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'ModalFooter' });
  const styleProps = useModalFooterStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
