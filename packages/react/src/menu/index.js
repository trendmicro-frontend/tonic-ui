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
import SubmenuList from './SubmenuList';
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

Submenu.List = SubmenuList;

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
  SubmenuList,
  useMenu,
  useSubmenu,
};
