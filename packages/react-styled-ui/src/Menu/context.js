import { createContext, useContext } from 'react';

const MenuContext = createContext();
const MenuGroupContext = createContext();

const MenuContextProvider = MenuContext.Provider;
const MenuGroupContextProvider = MenuGroupContext.Provider;

const useMenu = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(MenuContext);
  return context;
};

const useMenuGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(MenuGroupContext);
  return context;
};

export {
  MenuContext,
  MenuGroupContext,
  MenuContextProvider,
  MenuGroupContextProvider,
  useMenuGroup,
  useMenu,
};
