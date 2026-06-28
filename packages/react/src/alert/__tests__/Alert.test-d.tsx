import React, { createRef } from 'react';
import { Alert } from '@tonic-ui/react';

// Basic usage
<Alert>Alert message</Alert>;

// With severity
<Alert severity="success">Success message</Alert>;
<Alert severity="info">Info message</Alert>;
<Alert severity="warning">Warning message</Alert>;
<Alert severity="error">Error message</Alert>;

// With variant
<Alert variant="solid">Solid alert</Alert>;
<Alert variant="outline">Outline alert</Alert>;

// With isClosable
<Alert isClosable onClose={() => console.log('closed')}>
  Closable alert
</Alert>;

// StyleProps
<Alert padding="4x" margin="2x">
  Styled alert
</Alert>;

// Ref
const alertRef = createRef<HTMLDivElement>();
<Alert ref={alertRef}>Alert with ref</Alert>;

// With icon prop
<Alert icon="info">Alert with string icon</Alert>;
<Alert icon={<div>icon</div>}>Alert with ReactNode icon</Alert>;
<Alert icon={false}>Alert with no icon</Alert>;

// Combined props
<Alert severity="warning" variant="solid" icon={false}>
  Custom alert without icon
</Alert>;

// Negative tests
// @ts-expect-error - 'filled' is not a valid variant for Alert
<Alert variant="filled">Invalid variant</Alert>;

// @ts-expect-error - 'critical' is not a valid severity for Alert
<Alert severity="critical">Invalid severity</Alert>;
