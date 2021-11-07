import { createContext, useContext } from 'react';

const MenuContext = createContext();

const MenuContextProvider = MenuContext.Provider;

const useMenu = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(MenuContext);
  return context;
};

export {
  MenuContext,
  MenuContextProvider,
  useMenu,
};
