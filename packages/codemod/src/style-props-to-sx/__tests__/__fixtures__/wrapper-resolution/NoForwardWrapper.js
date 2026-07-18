import { Button } from '@tonic-ui/react';

// Destructures everything by name -- no rest element, nothing is forwarded.
const NoForwardWrapper = ({ label, onClick }) => (
  <Button onClick={onClick}>{label}</Button>
);

export default NoForwardWrapper;
