import React, { createRef } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Button } from '@tonic-ui/react';

// === Popover ===
<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

// With isOpen (controlled)
<Popover isOpen onClose={() => console.log('close')}>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

// With defaultIsOpen
<Popover defaultIsOpen>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

// With onOpen callback
<Popover onOpen={() => console.log('opened')}>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

// With placement
<Popover placement="top">
  <PopoverTrigger><Button>Top</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="bottom">
  <PopoverTrigger><Button>Bottom</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="left">
  <PopoverTrigger><Button>Left</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="right">
  <PopoverTrigger><Button>Right</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="top-start">
  <PopoverTrigger><Button>top-start</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="top-end">
  <PopoverTrigger><Button>top-end</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="bottom-start">
  <PopoverTrigger><Button>bottom-start</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="bottom-end">
  <PopoverTrigger><Button>bottom-end</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="left-start">
  <PopoverTrigger><Button>left-start</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="left-end">
  <PopoverTrigger><Button>left-end</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="right-start">
  <PopoverTrigger><Button>right-start</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover placement="right-end">
  <PopoverTrigger><Button>right-end</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// With trigger modes
<Popover trigger="click">
  <PopoverTrigger>
    <Button>Click me</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Click to show</PopoverBody>
  </PopoverContent>
</Popover>;

<Popover trigger="hover" enterDelay={200} leaveDelay={100}>
  <PopoverTrigger>
    <Button>Hover me</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Appears on hover</PopoverBody>
  </PopoverContent>
</Popover>;

// With initialFocusRef
const popoverInitialFocusRef = createRef<HTMLElement>();

<Popover initialFocusRef={popoverInitialFocusRef}>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

// With offset as array tuple
<Popover offset={[0, 12]}>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

<Popover offset={[10, 20]}>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

// With returnFocusOnClose
<Popover returnFocusOnClose={false}>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>;

// With arrow prop
<Popover arrow>
  <PopoverTrigger><Button>arrow</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover arrow={false}>
  <PopoverTrigger><Button>arrow false</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// With closeOnBlur prop
<Popover closeOnBlur>
  <PopoverTrigger><Button>closeOnBlur</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover closeOnBlur={false}>
  <PopoverTrigger><Button>closeOnBlur false</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// With closeOnEsc prop
<Popover closeOnEsc>
  <PopoverTrigger><Button>closeOnEsc</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover closeOnEsc={false}>
  <PopoverTrigger><Button>closeOnEsc false</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// With disabled prop
<Popover disabled>
  <PopoverTrigger><Button>disabled</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover disabled={false}>
  <PopoverTrigger><Button>disabled false</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// With followCursor prop
<Popover followCursor>
  <PopoverTrigger><Button>followCursor</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover followCursor={false}>
  <PopoverTrigger><Button>followCursor false</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// With nextToCursor prop
<Popover nextToCursor>
  <PopoverTrigger><Button>nextToCursor</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

<Popover nextToCursor={false}>
  <PopoverTrigger><Button>nextToCursor false</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// With render prop (children as function)
<Popover>
  {(context) => (
    <>
      <PopoverTrigger>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>Context-aware content</PopoverBody>
      </PopoverContent>
    </>
  )}
</Popover>;

// === Negative tests ===
// @ts-expect-error - 'center' is not a valid placement
<Popover placement="center">
  <PopoverTrigger><Button>Invalid</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;

// @ts-expect-error - 'focus' is not a valid trigger
<Popover trigger="focus">
  <PopoverTrigger><Button>Invalid trigger</Button></PopoverTrigger>
  <PopoverContent><PopoverBody>Content</PopoverBody></PopoverContent>
</Popover>;
