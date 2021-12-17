import { useContext } from 'react';
import { MenuContext } from './context';

const useMenu = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(MenuContext);
  return context;
};

export default useMenu;
