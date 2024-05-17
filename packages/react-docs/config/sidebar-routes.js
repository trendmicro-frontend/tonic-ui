import {
  Text,
  Tooltip,
} from '@tonic-ui/react';
import {
  CodeIcon,
  ColorIcon,
  FileImageOIcon,
  HookIcon,
  ListOpenIcon,
  SVGIcon,
  WidgetsIcon,
  WorkspaceIcon,
} from '@tonic-ui/react-icons';
import LabIcon from '../icons/LabIcon';
import React from 'react';

const Subtitle = (props) => {
  return (
    <Text {...props} />
  );
};

export const routes = [
  {
    title: 'Getting Started',
    icon: (props) => (
      <ListOpenIcon size="4x" {...props} />
    ),
    routes: [
      { title: 'Installation', path: 'getting-started/installation' },
      { title: 'Usage', path: 'getting-started/usage' },
      { title: 'CSS Variables', path: 'getting-started/css-variables' },
      { title: 'The sx prop', path: 'getting-started/the-sx-prop' },
      { title: 'Migration From v1 to v2', path: 'getting-started/migration-v1-to-v2' },
      { title: 'Migration From v0 to v1', path: 'getting-started/migration-v0-to-v1' },
      { title: 'Security', path: 'getting-started/security' },
      { title: 'Versions', path: 'getting-started/versions' },
      { title: 'Contributing', path: 'getting-started/contributing' },
    ],
  },
  {
    title: 'Patterns',
    icon: (props) => (
      <SVGIcon viewBox="0 0 32 32" size="4x" {...props}>
        <path d="M8,20H4.73A1.9735,1.9735,0,0,0,3,19a2,2,0,0,0,0,4A1.9735,1.9735,0,0,0,4.73,22H8Z" />
        <path d="M29,9a1.9735,1.9735,0,0,0-1.73,1H24v2h3.27A1.9991,1.9991,0,1,0,29,9Z" />
        <path d="M25.4141,5,21,.5859,16.5859,5,20,8.4141V18h2V8.4141ZM21,3.4141,22.5859,5,21,6.5859,19.4141,5Z" />
        <path d="M12,23.5859V14H10v9.5859L6.5859,27,11,31.4141,15.4141,27ZM9.4141,27,11,25.4141,12.5859,27,11,28.5859Z" />
        <path d="M18,10H8.4141L5,6.5859.5859,11,5,15.4141,8.4141,12H18ZM5,12.5859,3.4141,11,5,9.4141,6.5859,11Z" />
        <path d="M13,3A2,2,0,0,0,9,3,1.9733,1.9733,0,0,0,10,4.73V8h2V4.73A1.9733,1.9733,0,0,0,13,3Z" />
        <path d="M22,27.2705V24H20v3.27a2,2,0,1,0,2,0Z" />
        <path d="M31.4141,21,27,16.5859,23.5859,20H14v2h9.5859L27,25.4141ZM27,19.4141,28.5859,21,27,22.5859,25.4141,21Z" />
      </SVGIcon>
    ),
    routes: [
      { title: 'Overview', path: 'patterns' },
      { title: 'Notification', path: 'patterns/notification' },
      { title: 'Table Display', path: 'patterns/table-display', },
    ],
  },
  {
    title: 'Styled System',
    icon: (props) => (
      <WorkspaceIcon size="4x" {...props} />
    ),
    routes: [
      { title: 'Getting Started', path: 'styled-system' },
      { title: 'Style Props', path: 'styled-system/style-props' },
      { title: 'Pseudo Style Props', path: 'styled-system/pseudo-style-props' },
      { title: 'Responsive Values', path: 'styled-system/responsive-values' },
    ],
  },
  {
    title: 'Theme',
    icon: (props) => (
      <ColorIcon size="4x" {...props} />
    ),
    routes: [
      { title: 'Getting Started', path: 'theme' },
      { title: 'Borders', path: 'theme/borders' },
      { title: 'Breakpoints', path: 'theme/breakpoints' },
      { title: 'Colors', path: 'theme/colors' },
      { title: 'Fonts', path: 'theme/fonts' },
      { title: 'Font Sizes', path: 'theme/font-sizes' },
      { title: 'Font Weights', path: 'theme/font-weights' },
      { title: 'Letter Spacings', path: 'theme/letter-spacings' },
      { title: 'Line Heights', path: 'theme/line-heights' },
      { title: 'Outlines', path: 'theme/outlines' },
      { title: 'Radii', path: 'theme/radii' },
      { title: 'Shadows', path: 'theme/shadows' },
      { title: 'Sizes', path: 'theme/sizes' },
      { title: 'Space', path: 'theme/space' },
      { title: 'zIndices', path: 'theme/z-indices' },
    ],
  },
  {
    title: 'React Components',
    icon: (props) => (
      <WidgetsIcon {...props} />
    ),
    routes: [
      { title: 'Getting Started', path: 'components' },
      { title: 'COLOR MODE', heading: true },
      { title: 'ColorModeProvider', path: 'components/color-mode' },
      { title: 'DarkMode', path: 'components/color-mode/dark-mode' },
      { title: 'LightMode', path: 'components/color-mode/light-mode' },
      { title: 'InvertedMode', path: 'components/color-mode/inverted-mode' },
      { title: 'useColorMode', path: 'components/color-mode/useColorMode' },
      { title: 'COLOR STYLE', heading: true },
      { title: 'ColorStyleProvider', path: 'components/color-style' },
      { title: 'useColorStyle', path: 'components/color-style/useColorStyle' },

      { title: 'LAYOUT', heading: true },
      { title: 'Box', path: 'components/box' },
      { title: 'Flex', path: 'components/flex' },
      { title: 'Grid', path: 'components/grid' },
      { title: 'Space', path: 'components/space' },
      { title: 'Stack', path: 'components/stack' },

      { title: 'DATA DISPLAY', heading: true },
      { title: 'Accordion', path: 'components/accordion' },
      { title: 'Badge', path: 'components/badge' },
      { title: 'Divider', path: 'components/divider' },
      { title: 'Drawer', path: 'components/drawer' },
      { title: 'Modal', path: 'components/modal' },
      { title: 'Popover', path: 'components/popover' },
      { title: 'Table', path: 'components/table' },
      { title: 'Tag', path: 'components/tag' },
      { title: 'Tooltip', path: 'components/tooltip' },
      { title: 'OverflowTooltip', path: 'components/overflow-tooltip' },

      { title: 'FEEDBACK', heading: true },
      { title: 'Alert', path: 'components/alert' },
      { title: 'Progress', path: 'components/progress' },
      { title: 'Skeleton', path: 'components/skeleton' },
      { title: 'Spinner', path: 'components/spinner' },
      { title: 'Toast', path: 'components/toast' },
      { title: 'ToastManager', path: 'components/toast-manager' },
      { title: 'useToastManager', path: 'components/toast-manager/useToastManager' },

      { title: 'FORMS', heading: true },
      {
        title: 'Button',
        path: 'components/button',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: button`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'ButtonBase',
        path: 'components/button-base',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: button`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'ButtonGroup', path: 'components/button-group' },
      {
        title: 'Checkbox',
        path: 'components/checkbox',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: input`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'CheckboxGroup', path: 'components/checkbox-group' },
      {
        title: 'Input',
        path: 'components/input',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: input`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'InputBase',
        path: 'components/input-base',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: input`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'InputControl',
        path: 'components/input-control',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: input`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'InputGroup', path: 'components/input-group' },
      {
        title: 'LinkButton',
        path: 'components/link-button',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: button`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'Radio',
        path: 'components/radio',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: input`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'RadioGroup', path: 'components/radio-group' },
      {
        title: 'SearchInput',
        path: 'components/search-input',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: input`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'Select',
        path: 'components/select',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: select`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'Switch',
        path: 'components/switch',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: input`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'Textarea',
        path: 'components/textarea',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: textarea`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },

      { title: 'MEDIA AND ICONS', heading: true },
      {
        title: 'Icon',
        path: 'components/icon',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: svg`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'Image',
        path: 'components/image',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: img`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'SVGIcon',
        path: 'components/svg-icon',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: svg`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'NAVIGATION', heading: true },
      {
        title: 'Link',
        path: 'components/link',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: a`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      {
        title: 'ButtonLink',
        path: 'components/button-link',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: a`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'Menu', path: 'components/menu' },
      { title: 'Pagination', path: 'components/pagination' },
      { title: 'usePagination', path: 'components/pagination/usePagination' },
      { title: 'Tabs', path: 'components/tabs' },
      { title: 'Tree', path: 'components/tree' },

      { title: 'TRANSITIONS', heading: true },
      { title: 'Transitions', path: 'components/transitions' },
      { title: 'Collapse', path: 'components/transitions/collapse' },
      { title: 'Fade', path: 'components/transitions/fade' },
      { title: 'Grow', path: 'components/transitions/grow' },
      { title: 'Scale', path: 'components/transitions/scale' },
      { title: 'Slide', path: 'components/transitions/slide' },
      { title: 'Zoom', path: 'components/transitions/zoom' },

      { title: 'TYPOGRAPHY', heading: true },
      {
        title: 'Code',
        path: 'components/code',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: code`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'Text', path: 'components/text' },
      {
        title: 'TextLabel',
        path: 'components/text-label',
        render: () => {
          return (
            <Tooltip label={<Subtitle>{`tag: label`}</Subtitle>}>
              <CodeIcon cursor="default" />
            </Tooltip>
          );
        },
      },
      { title: 'Truncate', path: 'components/truncate' },

      { title: 'UTILITIES', heading: true },
      { title: 'CSSBaseline', path: 'components/css-baseline' },
      { title: 'Portal', path: 'components/portal' },
      { title: 'PortalManager', path: 'components/portal-manager' },
      { title: 'usePortalManager', path: 'components/portal-manager/usePortalManager' },
      { title: 'ResizeHandle', path: 'components/resize-handle' },
      { title: 'Scrollbar', path: 'components/scrollbar' },
      { title: 'VisuallyHidden', path: 'components/visually-hidden' },
    ],
  },
  {
    title: 'React Hooks',
    icon: (props) => (
      <HookIcon size="$x" {...props} />
    ),
    routes: [
      { title: 'Getting Started', path: 'hooks' },
      { title: 'useConst', path: 'hooks/useConst' },
      { title: 'useCopyToClipboard', path: 'hooks/useCopyToClipboard' },
      { title: 'useEffectOnce', path: 'hooks/useEffectOnce' },
      { title: 'useEffectOnceWhen', path: 'hooks/useEffectOnceWhen' },
      { title: 'useEventCallback', path: 'hooks/useEventCallback' },
      { title: 'useEventListener', path: 'hooks/useEventListener' },
      { title: 'useHydrated', path: 'hooks/useHydrated' },
      { title: 'useIsomorphicEffect', path: 'hooks/useIsomorphicEffect' },
      { title: 'useLatestRef', path: 'hooks/useLatestRef' },
      { title: 'useMediaQuery', path: 'hooks/useMediaQuery' },
      { title: 'useMergeRefs', path: 'hooks/useMergeRefs' },
      { title: 'useOnce', path: 'hooks/useOnce' },
      { title: 'useOnceWhen', path: 'hooks/useOnceWhen' },
      { title: 'useOutsideClick', path: 'hooks/useOutsideClick' },
      { title: 'usePrevious', path: 'hooks/usePrevious' },
      { title: 'useToggle', path: 'hooks/useToggle' },
    ],
  },
  {
    title: 'React Icons',
    icon: (props) => (
      <FileImageOIcon size="4x" {...props} />
    ),
    routes: [
      { title: 'Getting Started', path: 'icons' },
      { title: 'SVGIcon', path: 'icons/svg-icon' },
    ],
  },
  {
    title: 'React Lab',
    icon: (props) => (
      <SVGIcon as={LabIcon} size="4x" {...props} />
    ),
    routes: [
      { title: 'Getting Started', path: 'lab' },
      { title: 'DATE PICKERS', heading: true },
      { title: 'Overview', path: 'lab/date-pickers' },
      { title: 'Calendar', path: 'lab/date-pickers/calendar' },
      { title: 'DatePicker', path: 'lab/date-pickers/date-picker' },
    ],
  },
];
