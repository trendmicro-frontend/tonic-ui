import { createContext, useContext } from 'react';

const TableContext = createContext();

const TableProvider = TableContext.Provider;

const useTableContext = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TableContext);
  return context;
};

export {
  TableContext,
  TableProvider,
  useTableContext,
};
