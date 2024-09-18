import {
  Icon,
  SVGIcon,
  Text,
  Tooltip,
} from '@tonic-ui/react';
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
      <Icon
        icon="list-open"
        size="4x"
        {...props}
      />
    ),
    routes: [
      { title: 'Installation', path: 'getting-started/installation' },
      { title: 'Usage', path: 'getting-started/usage' },
      { title: 'CSS Variables', path: 'getting-started/css-variables' },
      { title: 'The sx prop', path: 'getting-started/the-sx-prop' },
      { title: 'Migration From v0.x to v1', path: 'getting-started/migration-v0x' },
      { title: 'Security', path: 'getting-started/security' },
      { title: 'Tonic UI Versions', path: 'getting-started/versions' },
    ],
  },
  {
    title: 'Contributing',
    icon: (props) => (
      <Icon icon="user-team" size="4x" {...props} />
    ),
    routes: [
      { title: 'Contributing Guidelines', path: 'contributing' },
      { title: 'Pull Request Review', path: 'contributing/pull-request-review' },
      { title: 'Publishing', path: 'contributing/publishing' },
      { title: 'React Documentation Site', path: 'contributing/react-documentation-site' },
      {
        title: 'React Components - Part 1',
        path: 'contributing/react-components-part-1',
      },
      {
        title: 'React Components - Part 2',
        path: 'contributing/react-components-part-2',
      },
    ],
  },
  {
    title: 'Migrations',
    icon: (props) => (
      <Icon icon="migrate-success" size="4x" {...props} />
    ),
    routes: [
      { title: 'Migrating from v0 to v1', path: 'migrations/migrating-from-v0-to-v1' },
    ],
  },
  {
    title: 'Patterns',
    icon: (props) => (
      <Icon
        icon="treeview"
        size="4x"
        {...props}
      />
    ),
    routes: [
      { title: 'Overview', path: 'patterns' },
      { title: 'Notification', path: 'patterns/notification' },
      { title: 'Table Display', path: 'patterns/table-display', },
    ],
  },
  {
    title: 'React Components',
    icon: (props) => (
      <Icon
        icon="app"
        size="4x"
        {...props}
      />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
              <Icon icon="code" cursor="default" />
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
      <Icon
        icon="hook"
        size="4x"
        {...props}
      />
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
    title: 'React Lab',
    icon: (props) => {
      return (
        <SVGIcon
          size="4x"
          viewBox="0 0 1000 1000"
          {...props}
        >
          <g>
            <path d="M593.3,627c0,0-46.6,59.5-106.2,0c-57.8-56-99.8,0-99.8,0L248.3,901.2c-4,14.9,4.8,30.3,19.8,34.3h462.1c14.9-4,23.8-19.3,19.8-34.3L593.3,627L593.3,627z M806.4,887.2L582.9,511.1v-0.7L582.5,290H598c23.1,0,42-18.8,42-42c0-23.2-18.8-42-42-42H374c-23.2,0-42,18.8-42,42c0,23.2,18.8,42,42,42h13.5l-0.4,220.5L193.6,887.2c-12,44.8,14.6,90.8,59.4,102.8H747C791.9,978,818.4,932,806.4,887.2z M739.6,961.9l-479.2-0.5c-29.8-8-47.5-38.7-39.5-68.5l194.6-381.4L416,262h-42c-7.7,0-14-6.3-14-14c0-7.7,6.3-14,14-14H598c7.7,0,13.9,6.3,13.9,14c0,7.7-6.2,14-13.9,14h-42l0.7,248.6l222.4,382.8C787.1,923.3,769.4,954,739.6,961.9L739.6,961.9z M513.4,164.1c0,15.5,12.5,28,28,28s28-12.5,28-28s-12.5-28-28-28S513.4,148.6,513.4,164.1z M541.5,94c23.2,0,42-18.8,42-42c0-23.2-18.8-42-42-42s-42,18.8-42,42C499.4,75.2,518.3,94,541.5,94z M429.4,164.1c15.5,0,28-12.5,28-28s-12.5-28-28-28c-15.5,0-28,12.5-28,28S413.9,164.1,429.4,164.1z"/>
          </g>
        </SVGIcon>
      );
    },
    routes: [
      { title: 'Getting Started', path: 'lab' },
      { title: 'DATE PICKERS', heading: true },
      { title: 'Overview', path: 'lab/date-pickers' },
      { title: 'Calendar', path: 'lab/date-pickers/calendar' },
      { title: 'DatePicker', path: 'lab/date-pickers/date-picker' },
    ],
  },
  {
    title: 'Styled System',
    icon: (props) => (
      <Icon
        icon="gavel"
        size="4x"
        {...props}
      />
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
    icon: (props) => {
      return (
        <SVGIcon
          size="4x"
          viewBox="0 0 325.04 325.04"
          {...props}
        >
          <g>
            <path d="M117.866,234.088c-2.956,14.532-4.875,21.558-16.092,22.458c-2.764,0.222-5.015,2.308-5.446,5.047
              c-0.432,2.738,1.069,5.416,3.631,6.477c0.721,0.298,17.877,7.308,37.921,7.309c0.003,0,0.005,0,0.007,0
              c13.968,0,25.95-3.386,35.612-10.063c11.45-7.912,19.344-20.294,23.541-36.788l-38.572-38.88
              C125.871,194.924,121.253,217.436,117.866,234.088z"/>
            <path d="M322.745,63.336c-1.037-1.046-2.887-2.293-5.806-2.293c-3.423,0-12.516,0-67.74,46.992
              c-25.509,21.706-54.92,48.559-78.314,71.41l36.603,36.894c24.061-25.009,52.129-56.355,74.451-83.258
              c14.096-16.986,24.935-31.002,32.216-41.657C323.799,77.311,328.023,68.655,322.745,63.336z"/>
            <path d="M182.595,278.479c-12.387,8.56-27.429,12.899-44.716,12.899c-22.753-0.001-41.919-7.649-44.046-8.527
              c-9.425-3.906-14.898-13.673-13.31-23.749c1.555-9.871,9.463-17.373,19.341-18.446c0.861-2.571,1.813-7.254,2.323-9.758
              c1.878-9.23,4.449-21.873,12.358-33.126c8.637-12.287,21.656-20.165,38.751-23.466c9.811-9.737,21.005-20.443,32.686-31.308
              c-5.905-1.281-11.185-5.127-14.017-10.944c-4.875-10.02-0.623-22.073,9.484-26.895c10.133-4.834,22.287-0.612,27.155,9.423
              c0.961,1.978,1.555,4.033,1.832,6.096c9.688-8.677,19.309-17.099,28.392-24.828c0.054-0.046,0.105-0.09,0.16-0.136
              c-10.209-19.536-24.849-36.845-42.687-50.098c-25.614-19.031-56.114-29.096-88.2-29.104c-0.01,0-0.017,0-0.025,0
              c-21.654,0-47.976,7.566-68.697,19.749C13.981,51.193-0.005,71.163,0,92.49c0.008,25.748,14.53,36.518,26.199,45.171
              c9.515,7.057,17.03,12.63,17.034,24.844c0.003,12.213-7.508,17.781-17.018,24.831c-11.665,8.648-26.184,19.412-26.176,45.163
              c0.006,21.324,14.001,41.299,39.406,56.244c20.736,12.198,47.072,19.78,68.73,19.786c0.015,0,0.028,0,0.042,0
              c39.305,0,76.254-15.171,104.044-42.72c20.837-20.655,34.656-46.416,40.273-74.442c-13.952,15.471-27.997,30.493-40.563,43.322
              C206.641,253.965,196.773,268.682,182.595,278.479z M111.054,77.103c2.498-10.871,13.4-17.657,24.354-15.167
              c10.939,2.478,17.793,13.282,15.313,24.138c-2.499,10.844-13.407,17.631-24.362,15.154
              C115.411,98.764,108.554,87.947,111.054,77.103z M45.054,114.152c-7.005-8.716-5.565-21.401,3.216-28.339
              c8.78-6.925,21.571-5.505,28.589,3.195c6.99,8.703,5.545,21.388-3.229,28.34C64.869,124.288,52.058,122.853,45.054,114.152z
              M55.746,247.168c-8.786-6.944-10.231-19.629-3.226-28.342c7-8.696,19.796-10.122,28.581-3.18
              c8.778,6.943,10.224,19.629,3.225,28.327C77.327,252.686,64.53,254.111,55.746,247.168z"/>
          </g>
        </SVGIcon>
      );
    },
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
];
