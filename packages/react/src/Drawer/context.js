import { createContext, useContext } from 'react';

const DrawerContext = createContext();

const DrawerProvider = DrawerContext.Provider;

const useDrawer = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(DrawerContext);
  return context;
};

export {
  DrawerContext,
  DrawerProvider,
  useDrawer,
};
