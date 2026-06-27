import { forwardRef, useContext } from 'react';
import BaseBox from './Box';
import { ColorModeContext } from '../internal/color-mode/context';

const Box = forwardRef((props, ref) => {
  const context = useContext(ColorModeContext);

  // Inject __colorMode from ColorModeContext if available
  if (context?.colorMode) {
    return <BaseBox ref={ref} {...props} __colorMode={context.colorMode} />;
  }

  return <BaseBox ref={ref} {...props} />;
});

Box.displayName = 'Box';

export {
  Box,
};
