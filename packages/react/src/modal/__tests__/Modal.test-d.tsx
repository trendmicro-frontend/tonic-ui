import React, { createRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@tonic-ui/react';

// === Modal ===
<Modal isOpen onClose={() => console.log('close')}>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalBody>Content</ModalBody>
  </ModalContent>
</Modal>;

// With size
<Modal isOpen onClose={() => console.log('close')} size="auto">Content</Modal>;
<Modal isOpen onClose={() => console.log('close')} size="xs">Content</Modal>;
<Modal isOpen onClose={() => console.log('close')} size="sm">Content</Modal>;
<Modal isOpen onClose={() => console.log('close')} size="md">Content</Modal>;
<Modal isOpen onClose={() => console.log('close')} size="lg">Content</Modal>;
<Modal isOpen onClose={() => console.log('close')} size="xl">Content</Modal>;
<Modal isOpen onClose={() => console.log('close')} size="full">Content</Modal>;

// With closeOnEsc
<Modal isOpen onClose={() => console.log('close')} closeOnEsc>Content</Modal>;

// With closeOnOutsideClick
<Modal isOpen onClose={() => console.log('close')} closeOnOutsideClick>Content</Modal>;

// With returnFocusOnClose
<Modal isOpen onClose={() => console.log('close')} returnFocusOnClose>Content</Modal>;

// With ensureFocus
<Modal isOpen onClose={() => console.log('close')} ensureFocus>Content</Modal>;

// With autoFocus
<Modal isOpen onClose={() => console.log('close')} autoFocus>Content</Modal>;

// With focus management refs
const initialFocusRef = createRef<HTMLElement>();
const finalFocusRef = createRef<HTMLElement>();
<Modal
  isOpen
  onClose={() => console.log('close')}
  initialFocusRef={initialFocusRef}
  finalFocusRef={finalFocusRef}
>
  <ModalContent>Content</ModalContent>
</Modal>;

// With isClosable
<Modal isOpen onClose={() => console.log('close')} isClosable>
  <ModalContent>Content</ModalContent>
</Modal>;
<Modal isOpen onClose={() => console.log('close')} isClosable={false}>
  <ModalContent>Content</ModalContent>
</Modal>;

// With scrollBehavior
<Modal isOpen onClose={() => console.log('close')} scrollBehavior="inside">
  <ModalContent>Content</ModalContent>
</Modal>;
<Modal isOpen onClose={() => console.log('close')} scrollBehavior="outside">
  <ModalContent>Content</ModalContent>
</Modal>;

// With portalProps
<Modal isOpen onClose={() => console.log('close')} portalProps={{ appendToParentPortal: false }}>
  <ModalContent>Content</ModalContent>
</Modal>;
<Modal isOpen onClose={() => console.log('close')} portalProps={{}}>
  <ModalContent>Content</ModalContent>
</Modal>;

// With closeOnInteractOutside and onInteractOutside
<Modal
  isOpen
  onClose={() => console.log('close')}
  closeOnInteractOutside
  onInteractOutside={(event) => {
    console.log('interact outside', event);
  }}
>
  <ModalContent>Content</ModalContent>
</Modal>;

// With render prop (children as function)
<Modal isOpen onClose={() => console.log('close')}>
  {(context) => (
    <ModalContent>
      <ModalHeader>Dynamic Title</ModalHeader>
      <ModalBody>Context: {JSON.stringify(context)}</ModalBody>
    </ModalContent>
  )}
</Modal>;

// StyleProps
<Modal isOpen onClose={() => console.log('close')} padding="4x">Content</Modal>;

// Ref
const modalRef = createRef<HTMLDivElement>();
<Modal ref={modalRef} isOpen onClose={() => console.log('close')}>Content</Modal>;

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Modal
<Modal ref={wrongRef} isOpen onClose={() => console.log('close')}>Content</Modal>;

// === Negative tests ===
// @ts-expect-error - 'xxl' is not a valid size
<Modal isOpen onClose={() => console.log('close')} size="xxl">
  <ModalContent>Invalid size</ModalContent>
</Modal>;

// @ts-expect-error - 'auto' is not a valid scrollBehavior
<Modal isOpen onClose={() => console.log('close')} scrollBehavior="auto">
  <ModalContent>Invalid scrollBehavior</ModalContent>
</Modal>;
