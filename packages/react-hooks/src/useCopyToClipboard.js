import { useState } from 'react';

const useCopyToClipboard = () => {
  const [value, setValue] = useState();
  const copy = async (text) => {
    if (!(navigator?.clipboard)) {
      console.error('Clipboard API is not supported in this environment.');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setValue(text);
      return true;
    } catch (error) {
      console.error('Clipboard write failed: ', error);
      setValue();
      return false;
    }
  };

  return [value, copy];
};

export default useCopyToClipboard;
