import Menu from './Menu';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import MenuDivider from './MenuDivider';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import MenuList from './MenuList';
import MenuToggle from './MenuToggle';
import MenuToggleIcon from './MenuToggleIcon';
import SubMenu from './SubMenu';
import SubMenuList from './SubMenuList';
import useMenu from './useMenu';
import useSubMenu from './useSubMenu';

Menu.Button = MenuButton;
Menu.Content = MenuContent;
Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;
Menu.Item = MenuItem;
Menu.List = MenuList;
Menu.Toggle = MenuToggle;
Menu.Toggle.Icon = MenuToggleIcon;

SubMenu.List = SubMenuList;

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
  SubMenu,
  SubMenuList,
  useMenu,
  useSubMenu,
};
