import { useContext } from 'react';
import { TagContext } from './context';

const useTag = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TagContext);
  return context;
};

export default useTag;
