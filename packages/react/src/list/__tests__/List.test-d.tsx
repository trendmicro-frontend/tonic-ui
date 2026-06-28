import React, { createRef } from 'react';
import { List, ListItem } from '@tonic-ui/react';

// === List ===
<List />;

// With as="ol"
<List as="ol" />;

// === ListItem ===
<ListItem />;

// StyleProps
<List margin="4x" />;

// Ref
const listRef = createRef<HTMLUListElement>();
<List ref={listRef} />;

const listItemRef = createRef<HTMLLIElement>();
<ListItem ref={listItemRef} />;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to List
<List ref={wrongRef} />;
