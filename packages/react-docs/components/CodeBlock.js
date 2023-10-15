import * as TonicUIReact from '@tonic-ui/react';
import * as TonicUIReactLab from '@tonic-ui/react-lab';
import * as TonicUIReactHooks from '@tonic-ui/react-hooks';
import * as TonicUIUtils from '@tonic-ui/utils';
import { boolean } from 'boolean';
import { ensureString } from 'ensure-type';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import useClipboard from '../hooks/useClipboard';
import { codeBlockLight, codeBlockDark } from '../prism-themes/tonic-ui';
import x from '../utils/json-stringify';
import IconButton from './IconButton';

const {
  Box,
  Collapse,
  Fade,
  Flex,
  Icon,
  Tooltip,
  useColorMode,
} = TonicUIReact;

const {
  useToggle,
} = TonicUIReactHooks;

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

const LiveCodePreview = props => {
  const router = useRouter();
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
        data-track={`CodeBlock|play_around|${x({ path: router.pathname })}`}
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
  const router = useRouter();
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
  const [isLiveEditorVisible, toggleLiveEditorVisibility] = useToggle(defaultExpanded);
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
    : '';

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
      ...TonicUIReact,
      ...TonicUIReactLab,
      ...TonicUIReactHooks,
      ...TonicUIUtils,
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
      <Flex columnGap="2x" justifyContent="flex-end">
        <IconButton
          data-track={isLiveEditorVisible
            ? `CodeBlock|hide_source|${x({ path: router.pathname })}`
            : `CodeBlock|show_source|${x({ path: router.pathname })}`
          }
          onClick={toggleLiveEditorVisibility}
        >
          <Tooltip label={isLiveEditorVisible ? 'Hide the source' : 'Show the source'}>
            <Icon icon="code" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`CodeBlock|copy_source|${x({ path: router.pathname })}`}
          onClick={copySource}
        >
          <Tooltip label={hasCopiedSource ? 'Copied' : 'Copy the source'}>
            <Icon icon="file-copy-o" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`CodeBlock|reset|${router.pathname}`}
          onClick={resetDemo}
        >
          <Tooltip label="Reset the demo">
            <Icon icon="redo" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
      </Flex>
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
