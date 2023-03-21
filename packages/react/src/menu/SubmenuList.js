import React, { forwardRef } from 'react';
import SubmenuContent from './SubmenuContent';
import { useSubmenuListStyle } from './styles';
import useSubmenu from './useSubmenu';

const SubmenuList = forwardRef((props, ref) => {
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    isOpen,
    placement,
  } = { ...submenuContext };
  const styleProps = useSubmenuListStyle({ isOpen, placement });

  return (
    <SubmenuContent
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

SubmenuList.displayName = 'SubmenuList';

export default SubmenuList;
