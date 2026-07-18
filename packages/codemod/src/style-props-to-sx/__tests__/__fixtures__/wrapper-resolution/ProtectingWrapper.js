import { Button } from '@tonic-ui/react';

// Intercepts `width` for its own layout math -- never forwarded, so it must
// stay protected even though Button itself doesn't protect `width`.
const ProtectingWrapper = ({ width, ...rest }) => (
  <Button {...rest} style={{ minWidth: width }} />
);

export default ProtectingWrapper;
