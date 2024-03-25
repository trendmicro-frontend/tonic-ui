import { CloseSIcon } from '@tonic-ui/react-icons';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useTagCloseButtonStyle } from './styles';
import useTag from './useTag';

const TagCloseButton = forwardRef((
  {
    children,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const tagContext = useTag(); // context might be an undefined value
  const {
    disabled,
    // The `isClosable` prop determines whether the close button should be displayed and allows for control over its positioning
    isClosable,
    onClose,
  } = { ...tagContext };
  const styleProps = useTagCloseButtonStyle({ isClosable });

  return (
    <ButtonBase
      aria-label="Close"
      ref={ref}
      disabled={disabled}
      onClick={callEventHandlers(onClickProp, onClose)}
      {...styleProps}
      {...rest}
    >
      {children ?? <CloseSIcon size="4x" />}
    </ButtonBase>
  );
});

export default TagCloseButton;
