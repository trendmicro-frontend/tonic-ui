import { Global, css } from '@emotion/react';
import { mdx } from '@mdx-js/react';
import * as reactComponents from '@tonic-ui/react';
import * as reactLibComponents from '@tonic-ui/react-lab';
import * as reactHooks from '@tonic-ui/react-hooks';
import * as tmicon from '@trendmicro/tmicon';
import { boolean } from 'boolean';
import update from 'immutability-helper';
import React, { useCallback, useState } from 'react';
import * as ReactBeautifulDND from 'react-beautiful-dnd';
import * as ReactDND from 'react-dnd';
import * as ReactDNDHtml5backend from 'react-dnd-html5-backend';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as ReactMovable from 'react-movable';
import * as ReactTable from 'react-table';
import { AutoSizer } from 'react-virtualized';
import useClipboard from '../hooks/useClipboard';
import { codeBlockLight, codeBlockDark } from '../prism-themes/tonic-ui';
import Code from './Code';
import FontAwesomeIcon from './FontAwesomeIcon';
import IconButton from './IconButton';
import InputTag from './InputTag';
import Lorem from './Lorem';
import SelectButton from './SelectButton';
import SkeletonBody from './SkeletonBody';
import SkeletonContent from './SkeletonContent';

const thirdPartyComponents = {
  AutoSizer,
  ReactBeautifulDND,
  ReactDND,
  ReactDNDHtml5backend,
  ReactMovable,
  update, // XXX: rename to immutableUpdate
  ...ReactTable, // XXX: rename to ReactTable.xxx
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

  className,
  children,
  ...props
}) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [colorMode] = useColorMode();
  const [editorCode, setEditorCode] = useState(children.trim());
  const {
    onCopy: copySource,
    hasCopied: hasCopiedSource,
  } = useClipboard(editorCode);
  const [isLiveEditorVisible, toggleLiveEditorVisibility] = reactHooks.useToggle(defaultExpanded);
  const resetDemo = () => {
    setEditorCode(children.trim());
    toggleLiveEditorVisibility(false);
    forceUpdate();
  };
  const handleLiveEditorChange = useCallback(newCode => {
    setEditorCode(newCode.trim());
  }, []);
  const language = className && className.replace(/language-/, '');

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
      ...reactLibComponents,
      ...reactHooks,
      ...thirdPartyComponents,
      Code,
      FontAwesomeIcon,
      InputTag,
      Lorem,
      SelectButton,
      SkeletonBody,
      SkeletonContent,
      Global,
      css,
      mdx,
      tmicons,
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

  const isEditable = !disabled;

  if (!isEditable) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveEditor
          style={liveEditorStyle}
          css={css`
            & > textarea { outline: 0; }
          `}
        />
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
            css={css`
              & > textarea { outline: 0; }
            `}
          />
        </Collapse>
      </Fade>
      <LiveError style={liveErrorStyle} />
    </LiveProvider>
  );
};

export default CodeBlock;
