import React from 'react';
import { useToastManager } from '@tonic-ui/react';

function UseToastManagerExample() {
  const toast = useToastManager();

  // notify with string content
  toast.notify('Hello');

  // notify with JSX content
  toast.notify(<div>Hello</div>);

  // notify with options
  toast.notify('Hello', { id: 'toast-1', duration: 5000, placement: 'top-right' });

  // close a toast by id
  toast.close('toast-id');

  // close with placement
  toast.close('toast-id', 'top-right');

  // close all toasts
  toast.closeAll();

  // close all with placements filter
  toast.closeAll({ placements: ['top', 'top-right'] });

  // find a toast by id
  const foundToast = toast.find('toast-id');
  if (foundToast) {
    const id = foundToast.id;
    const content = foundToast.content;
    const placement = foundToast.placement;
  }

  // find index
  const index = toast.findIndex('toast-id');

  // update a toast
  const updated = toast.update('toast-id', { content: 'Updated', duration: 3000 });

  // access placement
  const placement = toast.placement;

  return null;
}
