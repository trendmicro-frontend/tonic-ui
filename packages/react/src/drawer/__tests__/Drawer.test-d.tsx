import React, { createRef } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@tonic-ui/react';

// Basic usage
<Drawer isOpen onClose={() => console.log('close')}>
  <DrawerContent>
    <DrawerHeader>Title</DrawerHeader>
    <DrawerBody>Content</DrawerBody>
  </DrawerContent>
</Drawer>;

// placement prop - left
<Drawer isOpen onClose={() => console.log('close')} placement="left">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// placement prop - right
<Drawer isOpen onClose={() => console.log('close')} placement="right">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// placement prop - top
<Drawer isOpen onClose={() => console.log('close')} placement="top">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// placement prop - bottom
<Drawer isOpen onClose={() => console.log('close')} placement="bottom">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// size prop - sm
<Drawer isOpen onClose={() => console.log('close')} size="sm">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// size prop - md
<Drawer isOpen onClose={() => console.log('close')} size="md">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// size prop - lg
<Drawer isOpen onClose={() => console.log('close')} size="lg">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// size prop - full
<Drawer isOpen onClose={() => console.log('close')} size="full">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// size prop - auto
<Drawer isOpen onClose={() => console.log('close')} size="auto">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// closeOnEsc prop
<Drawer isOpen onClose={() => console.log('close')} closeOnEsc>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// closeOnOutsideClick prop
<Drawer isOpen closeOnOutsideClick onClose={() => console.log('close')}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// onInteractOutside prop - no manual type annotation
<Drawer
  isOpen
  onClose={() => console.log('close')}
  onInteractOutside={(event) => console.log(event)}
>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// isClosable prop
<Drawer isOpen onClose={() => console.log('close')} isClosable>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// isClosable prop - false
<Drawer isOpen onClose={() => console.log('close')} isClosable={false}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// backdrop prop
<Drawer isOpen onClose={() => console.log('close')} backdrop>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// ensureFocus prop
<Drawer isOpen onClose={() => console.log('close')} ensureFocus>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// autoFocus prop
<Drawer isOpen onClose={() => console.log('close')} autoFocus>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// initialFocusRef prop
const initialFocusRef = createRef<HTMLElement>();
<Drawer isOpen onClose={() => console.log('close')} initialFocusRef={initialFocusRef}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// finalFocusRef prop
const finalFocusRef = createRef<HTMLElement>();
<Drawer isOpen onClose={() => console.log('close')} finalFocusRef={finalFocusRef}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// returnFocusOnClose prop
<Drawer isOpen onClose={() => console.log('close')} returnFocusOnClose>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// closeOnInteractOutside prop
<Drawer
  isOpen
  onClose={() => console.log('close')}
  closeOnInteractOutside
  onInteractOutside={(event) => console.log('interact outside')}
>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// portalProps prop
<Drawer isOpen onClose={() => console.log('close')} portalProps={{ appendToParentPortal: false }}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// portalProps prop - empty object
<Drawer isOpen onClose={() => console.log('close')} portalProps={{}}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// All focus management props together
<Drawer
  isOpen
  onClose={() => console.log('close')}
  ensureFocus
  autoFocus
  initialFocusRef={initialFocusRef}
  finalFocusRef={finalFocusRef}
  returnFocusOnClose
>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// StyleProps
<Drawer isOpen onClose={() => console.log('close')} padding="4x">
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// Ref - HTMLDivElement
const drawerRef = createRef<HTMLDivElement>();
<Drawer ref={drawerRef} isOpen onClose={() => console.log('close')}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;

// Render prop children - no manual type annotation on context
<Drawer isOpen onClose={() => console.log('close')}>
  {(context) => (
    <DrawerContent>
      <DrawerHeader>Dynamic Header</DrawerHeader>
      <DrawerBody>Context-aware content</DrawerBody>
    </DrawerContent>
  )}
</Drawer>;

// Negative test - invalid placement
// @ts-expect-error - 'center' is not a valid placement
<Drawer isOpen onClose={() => console.log('close')} placement="center">
  <DrawerContent>Invalid placement</DrawerContent>
</Drawer>;

// Negative test - invalid size
// @ts-expect-error - 'xs' is not a valid size for Drawer
<Drawer isOpen onClose={() => console.log('close')} size="xs">
  <DrawerContent>Invalid size</DrawerContent>
</Drawer>;

// Negative test - wrong ref type
// @ts-expect-error - ref should be HTMLDivElement, not SVGSVGElement
<Drawer ref={createRef<SVGSVGElement>()} isOpen onClose={() => console.log('close')}>
  <DrawerContent>Content</DrawerContent>
</Drawer>;
