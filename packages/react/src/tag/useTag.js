import { useContext } from 'react';
import { TagContext } from './context';

const useTag = () => {
  const context = useContext(TagContext);
  return context;
};

export default useTag;
