import React, { forwardRef } from 'react';
import Box from '../Box';

const PseudoBox = forwardRef((props, ref) => <Box ref={ref} {...props} />);

PseudoBox.displayName = 'PseudoBox';

export default PseudoBox;
