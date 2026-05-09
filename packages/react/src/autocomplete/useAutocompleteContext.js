import { useContext } from 'react';
import { AutocompleteContext } from './context';

const useAutocompleteContext = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }
  return useContext(AutocompleteContext);
};

export default useAutocompleteContext;
