import * as moduleExport from '@tonic-ui/react/src';

test('should match expected exports', () => {
  const expectedExports = [
    // deprecated
    'PseudoBox',
    'FlatButton',
    'ToggleSwitch',
    'useDisclosure',
    'withTheme',

    // accordion
    'Accordion',
    'AccordionBody',
    'AccordionContent',
    'AccordionHeader',
    'AccordionItem',
    'AccordionToggle',
    'AccordionToggleIcon',
    'useAccordion',
    'useAccordionItem',
    'AccordionCollapse', // alias of AccordionContent

    // alert
    'Alert',
    'AlertCloseButton',
    'AlertIcon',
    'AlertMessage',

    // badge
    'Badge',

    // box
    'Box',
    'ControlBox',

    // button
    'Button',
    'ButtonBase',
    'ButtonGroup',
    'ButtonLink',
    'useButtonGroup',

    // checkbox
    'Checkbox',
    'CheckboxGroup',
    'useCheckboxGroup',

    // code
    'Code',

    // color-mode
    'ColorModeProvider',
    'DarkMode',
    'InvertedMode',
    'LightMode',
    'useColorMode',

    // color-style
    'ColorStyleProvider',
    'colorStyle',
    'useColorStyle',

    // css-baseline
    'CSSBaseline',

    // divider
    'Divider',

    // drawer
    'Drawer',
    'DrawerBody',
    'DrawerCloseButton',
    'DrawerContainer',
    'DrawerContent',
    'DrawerFooter',
    'DrawerHeader',
    'DrawerOverlay',
    'useDrawer',

    // flex
    'Flex',

    // grid
    'Grid',

    // icon
    'Icon',
    'SVGIcon',

    // image
    'Image',

    // input
    'Input',
    'InputAdornment',
    'InputBase',
    'InputControl',
    'InputGroup',
    'InputGroupAddon',
    'InputGroupAppend',
    'InputGroupPrepend',
    'useInputGroup',

    // link
    'Link',
    'LinkButton',

    // menu
    'Menu',
    'MenuButton',
    'MenuContent',
    'MenuDivider',
    'MenuGroup',
    'MenuItem',
    'MenuList',
    'MenuToggle',
    'MenuToggleIcon',
    'Submenu',
    'SubmenuContent',
    'SubmenuList',
    'SubmenuToggle',
    'useMenu',
    'useSubmenu',

    // modal
    'Modal',
    'ModalBody',
    'ModalCloseButton',
    'ModalContainer',
    'ModalContent',
    'ModalFooter',
    'ModalHeader',
    'ModalOverlay',
    'useModal',

    // pagination
    'Pagination',
    'PaginationItem',
    'usePagination',

    // popover
    'Popover',
    'PopoverArrow',
    'PopoverBody',
    'PopoverContent',
    'PopoverFooter',
    'PopoverHeader',
    'PopoverTrigger',
    'usePopover',

    // popper
    'Popper',
    'PopperArrow', // removed

    // portal
    'Portal',
    'PortalManager',
    'usePortalManager',

    // progress
    'LinearProgress',

    // provider
    'TonicProvider',

    // radio
    'Radio',
    'RadioGroup',
    'useRadioGroup',

    // resize-handle
    'ResizeHandle',

    // search-input
    'SearchInput',

    // scrollbar
    'Scrollbar',

    // select
    'Select',
    'Option',
    'OptionGroup',

    // skeleton
    'Skeleton',

    // space
    'Space',

    // spinner
    'Spinner',

    // stack
    'Stack',

    // switch
    'Switch',

    // table
    'Table',
    'TableHeader',
    'TableHeaderCell',
    'TableHeaderRow',
    'TableBody',
    'TableRow',
    'TableCell',
    'TableColumnResizeHandle', // alias of ResizeHandle
    'TableScrollbar',

    // tabs
    'Tab',
    'Tabs',
    'TabList',
    'TabPanel',
    'TabPanels',
    'useTabs',

    // tag
    'Tag',
    'TagCloseButton',

    // text
    'Text',
    'TextLabel',

    // textarea
    'Textarea',

    // theme
    'ThemeProvider',
    'theme',
    'useTheme',

    // toast
    'Toast',
    'ToastCloseButton',
    'ToastContainer',
    'ToastController',
    'ToastIcon',
    'ToastManager',
    'ToastMessage',
    'ToastTransition',
    'useToastManager',
    'ToastProvider', // alias of ToastManager
    'useToast', // alias of useToastManager

    // tooltip
    'Tooltip',
    'TooltipArrow',
    'TooltipContent',
    'TooltipTrigger',
    'OverflowTooltip',

    // transitions
    'Collapse',
    'Fade',
    'Grow',
    'Scale',
    'Slide',
    'Zoom',

    // treeview
    'TreeNode',
    'TreeView',
    'useTreeNode',
    'useTreeView',

    // truncate
    'Truncate',

    // visually-hidden
    'VisuallyHidden',
  ];
  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
