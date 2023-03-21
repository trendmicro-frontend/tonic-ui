import Menu from './Menu';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import MenuDivider from './MenuDivider';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import MenuList from './MenuList';
import MenuToggle from './MenuToggle';
import MenuToggleIcon from './MenuToggleIcon';
import Submenu from './Submenu';
import SubmenuContent from './SubmenuContent';
import SubmenuList from './SubmenuList';
import SubmenuToggle from './SubmenuToggle';
import useMenu from './useMenu';
import useSubmenu from './useSubmenu';

Menu.Button = MenuButton;
Menu.Content = MenuContent;
Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;
Menu.Item = MenuItem;
Menu.List = MenuList;
Menu.Toggle = MenuToggle;
Menu.Toggle.Icon = MenuToggleIcon;

Submenu.Content = SubmenuContent;
Submenu.List = SubmenuList;
Submenu.Toggle = SubmenuToggle;

export {
  Menu,
  MenuButton,
  MenuContent,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuToggle,
  MenuToggleIcon,
  Submenu,
  SubmenuContent,
  SubmenuList,
  SubmenuToggle,
  useMenu,
  useSubmenu,
};
