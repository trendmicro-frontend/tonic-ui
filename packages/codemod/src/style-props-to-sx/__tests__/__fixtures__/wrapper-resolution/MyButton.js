import { Button } from '@tonic-ui/react';
import { forwardRef } from 'react';

const MyButton = forwardRef(({ label, ...rest }, ref) => (
  <Button ref={ref} {...rest}>{label}</Button>
));

export default MyButton;
