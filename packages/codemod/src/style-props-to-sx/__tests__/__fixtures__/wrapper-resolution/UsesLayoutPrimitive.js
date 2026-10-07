import { Flex } from '@tonic-ui/react';

// Forwards to Flex (no longer a whole-component exemption) -- the wrapper's
// own prop surface converts like any other wrapper resolution case.
const UsesLayoutPrimitive = ({ ...rest }) => <Flex {...rest} />;

export default UsesLayoutPrimitive;
