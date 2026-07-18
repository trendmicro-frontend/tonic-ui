import React, { createRef } from 'react';
import { Tooltip, Button, Fade } from '@tonic-ui/react';

// === Tooltip ===
<Tooltip label="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>;

// With placement
<Tooltip label="Top" placement="top"><Button>Top</Button></Tooltip>;
<Tooltip label="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>;
<Tooltip label="Left" placement="left"><Button>Left</Button></Tooltip>;
<Tooltip label="Right" placement="right"><Button>Right</Button></Tooltip>;
<Tooltip label="Text" placement="top-start"><Button>top-start</Button></Tooltip>;
<Tooltip label="Text" placement="top-end"><Button>top-end</Button></Tooltip>;
<Tooltip label="Text" placement="bottom-start"><Button>bottom-start</Button></Tooltip>;
<Tooltip label="Text" placement="bottom-end"><Button>bottom-end</Button></Tooltip>;
<Tooltip label="Text" placement="left-start"><Button>left-start</Button></Tooltip>;
<Tooltip label="Text" placement="left-end"><Button>left-end</Button></Tooltip>;
<Tooltip label="Text" placement="right-start"><Button>right-start</Button></Tooltip>;
<Tooltip label="Text" placement="right-end"><Button>right-end</Button></Tooltip>;

// With disabled
<Tooltip label="Disabled" disabled><Button>No tooltip</Button></Tooltip>;

// With arrow
<Tooltip label="With arrow" arrow><Button>Has arrow</Button></Tooltip>;

// With delay
<Tooltip label="Delayed" enterDelay={500} leaveDelay={200}><Button>Delayed</Button></Tooltip>;

// With ReactNode label
<Tooltip label={<span>Rich <strong>HTML</strong> label</span>}><Button>Hover</Button></Tooltip>;

// With offset
<Tooltip label="Offset" offset={[10, 20]}><Button>Offset</Button></Tooltip>;

// Close behavior
<Tooltip label="Text" closeOnClick><Button>closeOnClick</Button></Tooltip>;
<Tooltip label="Text" closeOnEsc><Button>closeOnEsc</Button></Tooltip>;
<Tooltip label="Text" closeOnPointerDown><Button>closeOnPointerDown</Button></Tooltip>;

// Controlled
<Tooltip label="Text" defaultIsOpen><Button>defaultIsOpen</Button></Tooltip>;
<Tooltip label="Text" isOpen onClose={() => console.log('close')}><Button>isOpen</Button></Tooltip>;

// Cursor behavior
<Tooltip label="Text" followCursor><Button>followCursor</Button></Tooltip>;
<Tooltip label="Text" nextToCursor><Button>nextToCursor</Button></Tooltip>;

// Callbacks
<Tooltip label="Text" onClose={() => console.log('closed')}><Button>onClose</Button></Tooltip>;
<Tooltip label="Text" onOpen={() => console.log('opened')}><Button>onOpen</Button></Tooltip>;

// Focus behavior
<Tooltip label="Text" openOnFocus><Button>openOnFocus</Button></Tooltip>;

// Children wrapping
<Tooltip label="Text" shouldWrapChildren><Button>shouldWrapChildren</Button></Tooltip>;

// Custom components
<Tooltip label="Text" PopperProps={{ strategy: 'fixed' }}><Button>PopperProps</Button></Tooltip>;
<Tooltip label="Text" TooltipArrowProps={{ style: { color: 'red' } }}><Button>TooltipArrowProps</Button></Tooltip>;
<Tooltip label="Text" TransitionComponent={Fade}><Button>TransitionComponent</Button></Tooltip>;
<Tooltip label="Text" TransitionProps={{ timeout: 200 }}><Button>TransitionProps</Button></Tooltip>;

// Render prop children
<Tooltip label="Tooltip text">
  {(context) => (
    <Button>Dynamic Button</Button>
  )}
</Tooltip>;

// === Negative tests ===
// @ts-expect-error - 'center' is not a valid placement
<Tooltip label="Text" placement="center"><Button>Invalid</Button></Tooltip>;
