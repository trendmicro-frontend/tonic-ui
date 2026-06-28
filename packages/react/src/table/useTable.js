import { useContext } from 'react';
import { TableContext } from './context';

const useTable = () => {
  const context = useContext(TableContext);
  return context;
};

export default useTable;
