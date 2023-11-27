import { useState } from 'react';

// https://stackoverflow.com/questions/48122221/working-copy-to-clipboard-function-doesnt-work-when-called-in-bootstrap-modal
const copyToClipboard = (value, context) => {
  const textField = document.createElement('textarea');
  textField.value = value;
  textField.setAttribute('readonly', '');
  textField.style.position = 'absolute';
  textField.style.left = '-9999px';

  if (context) {
    context.parentNode.insertBefore(textField, context);
  } else {
    document.body.appendChild(textField);
  }

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  textField.select();
  document.execCommand('copy');
  textField.parentNode.removeChild(textField);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

const useClipboard = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = (value, context) => {
    copyToClipboard(value, context);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1500);
  };

  return { onCopy, hasCopied };
};

export default useClipboard;
