import { useContext } from 'react';
import { SubMenuContext } from './context';

const useSubMenu = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(SubMenuContext);
  return context;
};

export default useSubMenu;
