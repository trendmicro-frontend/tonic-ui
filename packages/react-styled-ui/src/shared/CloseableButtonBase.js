import chainedFunction from 'chained-function';
import React, { useContext } from 'react';
import ButtonBase from '../ButtonBase';
import { CloseableContext } from '../Closeable/context';

const CloseableButtonBase = ({
  children,
  onClick,
  ...rest
}) => {
  let handleClick = onClick;
  const context = useContext(CloseableContext);
  if (context) {
    const { onClose } = { ...context };
    handleClick = chainedFunction(
      onClick,
      () => onClose(),
    );
  }

  return (
    <ButtonBase
      onClick={handleClick}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

export default CloseableButtonBase;
