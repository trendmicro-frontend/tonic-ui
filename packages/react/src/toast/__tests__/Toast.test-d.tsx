import React, { createRef } from 'react';
import { Toast, Icon } from '@tonic-ui/react';

// Basic usage
<Toast>Toast message</Toast>;

// With appearance
<Toast appearance="none">None</Toast>;
<Toast appearance="success">Success</Toast>;
<Toast appearance="info">Info</Toast>;
<Toast appearance="warning">Warning</Toast>;
<Toast appearance="error">Error</Toast>;

// With icon prop
<Toast icon="info">With string icon</Toast>;
<Toast icon={<Icon icon="check" />}>With ReactNode icon</Toast>;
<Toast icon={false}>Without icon</Toast>;

// With isClosable
<Toast isClosable onClose={() => console.log('close')}>
  Closable toast
</Toast>;

// StyleProps
<Toast padding="4x">Styled</Toast>;

// Ref
const toastRef = createRef<HTMLDivElement>();
<Toast ref={toastRef}>Toast</Toast>;

// Negative tests
// @ts-expect-error - 'critical' is not a valid appearance for Toast
<Toast appearance="critical">Invalid appearance</Toast>;
