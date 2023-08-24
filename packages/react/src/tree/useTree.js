import { useContext } from 'react';
import { TreeContext } from './context';

const useTree = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TreeContext);
  return context;
};

export default useTree;
