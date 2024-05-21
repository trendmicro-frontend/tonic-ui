import { useContext } from 'react';
import { TableGroupContext } from './context';

const useTableGroup = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TableGroupContext);
  return context;
};

export default useTableGroup;
