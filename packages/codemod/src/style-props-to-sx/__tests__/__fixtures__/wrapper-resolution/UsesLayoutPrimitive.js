import { Flex } from '@tonic-ui/react';

// Forwards to a Layer-1 exempt primitive -- the wrapper's OWN prop surface
// is still convertible; only DIRECT usage of Flex is exempt, not usage
// through a wrapper that merely implements itself with Flex.
const UsesLayoutPrimitive = ({ ...rest }) => <Flex {...rest} />;

export default UsesLayoutPrimitive;
