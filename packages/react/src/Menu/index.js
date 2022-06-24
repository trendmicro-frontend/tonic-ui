import Menu from './Menu';
import MenuList from './MenuList';
import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';
import MenuDivider from './MenuDivider';
import Submenu from './Submenu';
import SubmenuList from './SubmenuList';
import SubmenuToggle from './SubmenuToggle';
import useMenu from './useMenu';
import useSubmenu from './useSubmenu';

Menu.List = MenuList;
Menu.Item = MenuItem;
Menu.Group = MenuGroup;
Menu.Divider = MenuDivider;

Submenu.List = SubmenuList;
Submenu.Toggle = SubmenuToggle;

export {
  Menu,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Submenu,
  SubmenuList,
  SubmenuToggle,
  useMenu,
  useSubmenu,
};

export default Menu;
