import { useContext } from 'react';
import { SubmenuContext } from './context';

const useSubmenu = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(SubmenuContext);
  return context;
};

export default useSubmenu;
