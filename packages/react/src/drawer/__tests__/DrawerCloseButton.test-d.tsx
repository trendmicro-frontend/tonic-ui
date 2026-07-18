import React, { createRef } from 'react';
import { DrawerCloseButton } from '@tonic-ui/react';

// Basic usage
<DrawerCloseButton />;

// onClick prop
<DrawerCloseButton onClick={() => console.log('close')} />;

// Ref - HTMLButtonElement
const closeButtonRef = createRef<HTMLButtonElement>();
<DrawerCloseButton ref={closeButtonRef} />;

// StyleProps
<DrawerCloseButton size="sm" />;

<DrawerCloseButton color="gray.dark" />;

// Negative test - wrong ref type
// @ts-expect-error - ref should be HTMLButtonElement, not SVGSVGElement
<DrawerCloseButton ref={createRef<SVGSVGElement>()} />;
