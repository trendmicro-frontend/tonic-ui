import { Box } from '@tonic-ui/react';
import { forwardRef } from 'react';

const Main = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      as="main"
      id="main"
      ref={ref}
      color="text.primary"
      {...props}
    >
      {children}
    </Box>
  );
});

Main.displayName = 'Main';

export default Main;
