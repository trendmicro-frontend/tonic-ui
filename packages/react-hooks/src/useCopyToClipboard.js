import { useState } from 'react';

/**
 * A custom Hook that provides a copy method to copy text to the clipboard.
 * If anything does not work, it will output an error message and the value will be set to null.
 *
 * @returns {[string, function]} The current value and a copy method.
 */
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
