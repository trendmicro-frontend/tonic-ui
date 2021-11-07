import { useContext } from 'react';
import { DrawerContext } from './context';

const useDrawer = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(DrawerContext);
  return context;
};

export default useDrawer;
