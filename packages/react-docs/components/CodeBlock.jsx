import { Global, css } from '@emotion/react';
import { sx } from '@tonic-ui/styled-system';
import * as reactComponents from '@tonic-ui/react';
import * as reactLabComponents from '@tonic-ui/react-lab';
import * as reactHooks from '@tonic-ui/react-hooks';
import * as utils from '@tonic-ui/utils';
import * as tmicon from '@trendmicro/tmicon';
import { boolean } from 'boolean';
import * as dateFns from 'date-fns'
import * as dateFnsLocale from 'date-fns/locale'
import { ensureString } from 'ensure-type';
import immutableUpdate from 'immutability-helper';
import React, { useCallback, useState } from 'react';
import * as rbd from 'react-beautiful-dnd';
import * as ReactDND from 'react-dnd';
import * as ReactDNDHtml5backend from 'react-dnd-html5-backend';
import ReactFocusLock from 'react-focus-lock';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as ReactMovable from 'react-movable';
import * as ReactTable from 'react-table';
import { TransitionGroup } from 'react-transition-group';
import * as ReactVirtualized from 'react-virtualized';
import useClipboard from '../hooks/useClipboard';
import { codeBlockLight, codeBlockDark } from '../prism-themes/tonic-ui';
import Code from './Code';
import FontAwesomeIcon from './FontAwesomeIcon';
import IconButton from './IconButton';
import InputTag from './InputTag';
import Lorem from './Lorem';
import SkeletonBody from './SkeletonBody';
import SkeletonContent from './SkeletonContent';

const thirdPartyComponents = {
  dateFns,
  dateFnsLocale,
  rbd,
  immutableUpdate,
  ReactDND,
  ReactDNDHtml5backend,
  ReactFocusLock,
  ReactMovable,
  ReactTable,
  ReactVirtualized,
  TransitionGroup,
};

const {
  Box,
  Collapse,
  Fade,
  Icon,
  Tooltip,
  useColorMode,
} = reactComponents;

const liveCodePreviewStyle = {
};

const liveEditorStyle = {
  fontFamily: '"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',
  fontSize: 14,
  overflowX: 'auto',
};

const liveErrorStyle = {
  fontFamily: '"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',
  fontSize: 14,
  padding: '1rem 1.5rem',
  overflowX: 'auto',
  color: 'white',
  backgroundColor: 'red',
};

const tmicons = tmicon.iconsets.map(group => {
  const icons = tmicon.icons.filter(({ iconset }) => iconset === group.id);
  if (icons.length === 0) {
    return null;
  }
  return { group, icons };
});

const LiveCodePreview = props => {
  const [colorMode] = useColorMode();
  const borderColor = {
    light: 'gray:30',
    dark: 'gray:70',
  }[colorMode];

  return (
    <Box
      border={1}
      borderColor={borderColor}
      borderRadius="sm"
      p="4x"
    >
      <Box
        as={LivePreview}
        fontFamily="base"
        fontSize="sm"
        lineHeight="sm"
        whiteSpace="normal"
        {...props}
      />
    </Box>
  );
};

const CodeBlock = ({
  /**
   * Do not evaluate and mount the inline code (Default: `false`).
   */
  noInline = false,

  /**
   * Disable editing on the `<LiveEditor />` (Default: `false`)
   */
  disabled = false,

  /**
   * Preview only (Default: `false`)
   */
  previewOnly = false,

  /**
   * Default is expand or collapse (Default: `false`)
   */
  expanded: defaultExpanded = false,

  children,
  ...props
}) => {
  const originalEditorCode = React.isValidElement(children)
    ? ensureString(children?.props?.children).trim()
    : ensureString(children).trim();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [colorMode] = useColorMode();
  const [editorCode, setEditorCode] = useState(originalEditorCode);
  const {
    onCopy: copySource,
    hasCopied: hasCopiedSource,
  } = useClipboard(editorCode);
  const [isLiveEditorVisible, toggleLiveEditorVisibility] = reactHooks.useToggle(defaultExpanded);
  const resetDemo = () => {
    setEditorCode(originalEditorCode);
    toggleLiveEditorVisibility(false);
    forceUpdate();
  };
  const handleLiveEditorChange = useCallback(newEditorCode => {
    setEditorCode(newEditorCode.trim());
  }, []);
  const language = React.isValidElement(children)
    ? ensureString(children.props.className).replace(/language-/, '')
    : null;

  noInline = boolean(noInline);

  if (disabled === undefined) {
    disabled = (language !== 'jsx');
  } else {
    disabled = (language !== 'jsx') || boolean(disabled);
  }

  const liveProviderProps = {
    theme: {
      dark: codeBlockDark,
      light: codeBlockLight,
    }[colorMode],
    language,
    noInline,
    disabled,
    code: editorCode,
    transformCode: code => code,
    scope: {
      ...reactComponents,
      ...reactLabComponents,
      ...reactHooks,
      ...utils,
      ...thirdPartyComponents,
      Code,
      FontAwesomeIcon,
      InputTag,
      Lorem,
      SkeletonBody,
      SkeletonContent,
      Global, // from '@emotion/react'
      css, // from '@emotion/react'
      sx, // from '@tonic-ui/styled-system'
      tmicons, // from '@trendmicro/tmicon'
    },
    mountStylesheet: false,
    ...props,
  };

  if (previewOnly) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview style={liveCodePreviewStyle} />
      </LiveProvider>
    );
  }

  if (disabled) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveEditor style={liveEditorStyle} />
      </LiveProvider>
    );
  }

  return (
    <LiveProvider {...liveProviderProps}>
      <LiveCodePreview style={liveCodePreviewStyle} />
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={toggleLiveEditorVisibility}>
          <Tooltip label={isLiveEditorVisible ? 'Hide the source' : 'Show the source'}>
            <Icon icon="code" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
        <IconButton onClick={copySource}>
          <Tooltip label={hasCopiedSource ? 'Copied' : 'Copy the source'}>
            <Icon icon="file-copy-o" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
        <IconButton onClick={resetDemo}>
          <Tooltip label="Reset the demo">
            <Icon icon="redo" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
      </Box>
      <Fade in={isLiveEditorVisible}>
        <Collapse in={isLiveEditorVisible} unmountOnExit={true}>
          <LiveEditor
            onChange={handleLiveEditorChange}
            style={liveEditorStyle}
          />
        </Collapse>
      </Fade>
      <LiveError style={liveErrorStyle} />
    </LiveProvider>
  );
};

export default CodeBlock;
