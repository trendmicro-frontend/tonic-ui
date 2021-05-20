import { createContext } from 'react';

const DrawerContext = createContext();

const DrawerProvider = DrawerContext.Provider;

export {
  DrawerContext,
  DrawerProvider,
};
