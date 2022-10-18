import { useContext } from 'react';
import { TableContext } from './context';

const useTable = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TableContext);
  return context;
};

export default useTable;
