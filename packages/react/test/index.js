import * as moduleExport from '../src';

test('should match expected exports', () => {
  const exportedComponents = [
    // accordion
    'Accordion',
    'AccordionBody',
    'AccordionCollapse',
    'AccordionHeader',
    'AccordionItem',
    'AccordionToggle',
    'AccordionToggleIndicator',

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
    'DrawerContent',
    'DrawerFooter',
    'DrawerHeader',
    'DrawerOverlay',

    // flat-button
    'FlatButton',

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
    'InputBase',
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
    'MenuDivider',
    'MenuGroup',
    'MenuItem',
    'MenuList',
    'MenuToggle',
    'MenuToggleIndicator',

    // modal
    'Modal',
    'ModalBody',
    'ModalContent',
    'ModalFooter',
    'ModalHeader',
    'ModalOverlay',

    // pagination
    'Pagination',
    'usePagination',

    // popover
    'Popover',
    'PopoverBody',
    'PopoverContent',
    'PopoverFooter',
    'PopoverHeader',
    'PopoverTrigger',

    // popper
    'Popper',
    'PopperArrow',

    // portal
    'Portal',

    // presence
    'Presence',
    'usePresence',

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
    'ToastMessage',
    'ToastProvider',
    'ToastTransition',
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
