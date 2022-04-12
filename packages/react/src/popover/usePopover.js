import { useContext } from 'react';
import { PopoverContext } from './context';

const usePopover = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(PopoverContext);
  return context;
};

export default usePopover;
