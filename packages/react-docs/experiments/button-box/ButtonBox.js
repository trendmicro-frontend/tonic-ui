import { Box } from '@tonic-ui/react';
import { ariaAttr } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import useButtonBoxClickHandlers from './useButtonBoxClickHandlers';
import {
  useButtonBoxStyle,
} from './styles';

const ButtonBox = forwardRef((
  {
    disabled = false,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    tabIndex,
    children,
    ...rest
  },
  ref,
) => {
  const { onClick, onKeyDown, onKeyUp } = useButtonBoxClickHandlers({
    disabled,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
  });
  const styleProps = useButtonBoxStyle({ disabled });

  return (
    <Box
      ref={ref}
      role="button"
      aria-disabled={ariaAttr(disabled)}
      tabIndex={disabled ? undefined : (tabIndex ?? 0)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

ButtonBox.displayName = 'ButtonBox';

export default ButtonBox;
