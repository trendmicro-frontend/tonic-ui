import { useContext } from 'react';
import { TreeItemContext } from './context';

const useTreeItem = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TreeItemContext);
  return context;
};

export default useTreeItem;
