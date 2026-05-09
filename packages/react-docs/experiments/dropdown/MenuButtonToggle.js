import { MenuButton } from '@tonic-ui/react';
import { forwardRef } from 'react';

const MenuButtonToggle = forwardRef((props, ref) => {
  const { children, sx, ...rest } = props;

  return (
    <MenuButton
      ref={ref}
      variant="secondary"
      {...rest}
      sx={[
        {
          maxWidth: '100%',
          width: '100%',
          '> :first-of-type': {
            textAlign: 'left', // [optional] Useful when the trigger is a button to align text properly
            minWidth: 0, // Override the default `minWidth: auto` for flex items to enable text truncation
          },
        },
        sx, // Allows style overrides
      ]}
    >
      {children}
    </MenuButton>
  );
});

MenuButtonToggle.displayName = 'MenuButtonToggle';

export default MenuButtonToggle;
