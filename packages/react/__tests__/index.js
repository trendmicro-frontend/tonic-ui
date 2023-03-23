import * as moduleExport from '@tonic-ui/react/src';

test('should match expected exports', () => {
  const exportedComponents = [
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
    'PseudoBox', // deprecated

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

    // color-mode
    'ColorModeProvider',
    'DarkMode',
    'LightMode',
    'useColorMode',

    // color-style
    'ColorStyleProvider',
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

    // flat-button
    'FlatButton', // deprecated

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
    'PopoverBody',
    'PopoverContent',
    'PopoverFooter',
    'PopoverHeader',
    'PopoverTrigger',
    'usePopover',

    // popper
    'Popper',
    'PopperArrow',

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
    'ToggleSwitch', // deprecated

    // table
    'Table',
    'TableBody',
    'TableCell',
    'TableHeader',
    'TableHeaderCell',
    'TableHeaderRow',
    'TableRow',
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
    'useTheme',
    'withTheme', // deprecated

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
    'OverflowTooltip',

    // transitions
    'Collapse',
    'Fade',
    'Grow',
    'Scale',
    'Slide',
    'Zoom',

    // truncate
    'Truncate',

    // visually-hidden
    'VisuallyHidden',
  ];

  const exportedHooks = [
    // hooks
    'useDisclosure', // deprecated
  ];

  const exportedSettings = [
    // settings
    'colorStyle',
    'theme',
  ];

  const receivedExports = Object.keys(moduleExport);
  const expectedExports = [
    ...exportedComponents,
    ...exportedHooks,
    ...exportedSettings,
  ];

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
