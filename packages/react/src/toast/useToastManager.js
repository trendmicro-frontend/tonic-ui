import { useContext, useRef } from 'react';
import { ToastManagerContext } from './context';

/**
 * @typedef {Object} ToastRecord
 * @property {string} id - The unique id of the toast.
 * @property {React.ReactNode} content - The content of the toast.
 * @property {string | number | boolean | null | undefined} data - User-defined data for the toast.
 * @property {number | null} duration - The duration in milliseconds, or `null` for no auto-dismiss.
 * @property {string} placement - The placement of the toast.
 */

/**
 * @typedef {Object} ToastManagerContextValue
 * @property {(id: string, placement?: string) => void} close - Close a specific toast by id.
 * @property {(options?: { placements?: string[] }) => void} closeAll - Close all toasts.
 * @property {(id: string) => ToastRecord | undefined} find - Find a toast by id.
 * @property {(id: string) => number} findIndex - Find the index of a toast by id.
 * @property {(id: string, options: { content?: React.ReactNode; data?: string | number | boolean | null; duration?: number | null }) => boolean} update - Update a toast. Returns `true` if the toast exists.
 * @property {(content: React.ReactNode | React.ElementType, options?: { id?: string; data?: string | number | boolean | null; duration?: number; placement?: string }) => string | false} notify - Create a toast and return its id, or `false` if the placement is invalid.
 * @property {string} placement - The default toast placement.
 * @property {{ [placement: string]: ToastRecord[] }} state - The current state of all toasts by placement.
 * @property {React.Dispatch<React.SetStateAction<{ [placement: string]: ToastRecord[] }>>} setState - The state setter for toast state.
 */

/**
 * A hook to access the toast manager context.
 * @returns {ToastManagerContextValue & ((content: React.ReactNode | React.ElementType, options?: { id?: string; data?: string | number | boolean | null; duration?: number; placement?: string }) => string | false)} The toast manager object. Can also be called as a function to create a toast (alias for `notify`).
 */
const useToastManager = () => {
  const createToastRef = useRef(null);
  const toastManagerRef = useRef(null);

  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ToastManagerContext);

  if (!context) {
    throw new Error('The `useToastManager` hook must be called from a descendent of the `ToastManager`.');
  }

  createToastRef.current = context.notify;

  if (!toastManagerRef.current) {
    toastManagerRef.current = function (...args) {
      return createToastRef.current?.(...args);
    };
  }

  Object.assign(toastManagerRef.current, context);

  return toastManagerRef.current;
};

export default useToastManager;
