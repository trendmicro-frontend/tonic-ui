import * as moduleExport from '@tonic-ui/react/src';

test('should match expected exports', () => {
  const exportedComponents = [
    // accordion
    'Accordion',
    'AccordionBody',
    'AccordionCollapse',
    'AccordionHeader',
    'AccordionItem',
    'AccordionToggle',
    'AccordionToggleIcon',
    'useAccordion',
    'useAccordionItem',

    // alert
    'Alert',
    'AlertCloseButton', // internal use only
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
    'SubmenuList',
    'SubmenuToggle',
    'useMenu',
    'useSubmenu',

    // modal
    'Modal',
    'ModalBody',
    'ModalCloseButton', // internal use only
    'ModalContainer', // internal use only
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
    'PortalProvider',
    'usePortal',

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

    // tabs
    'Tab',
    'Tabs',
    'TabList',
    'TabPanel',
    'TabPanels',
    'useTabs',

    // tag
    'Tag',
    'TagCloseButton', // internal use only

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
    'ToastCloseButton', // internal use only
    'ToastContainer', // internal use only
    'ToastController', // internal use only
    'ToastIcon', // internal use only
    'ToastMessage', // internal use only
    'ToastProvider',
    'ToastTransition', // internal use only
    'useToast',

    // tooltip
    'Tooltip',

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
