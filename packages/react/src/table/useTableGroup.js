import { useContext } from 'react';
import { TableGroupContext } from './context';

const useTableGroup = () => {
  const context = useContext(TableGroupContext);
  return context;
};

export default useTableGroup;
