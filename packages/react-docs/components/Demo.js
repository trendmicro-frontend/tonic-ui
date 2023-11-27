import {
  Box,
  Collapse,
  Fade,
  Flex,
  Icon,
  Tooltip,
  useColorMode,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useReducer } from 'react';
import { LiveProvider, LiveEditor } from 'react-live';
import useClipboard from '../hooks/useClipboard';
import { codeBlockLight, codeBlockDark } from '../prism-themes/tonic-ui';
import { open as openInCodeSandbox } from '../sandbox/codesandbox';
import x from '../utils/json-stringify';
import CodeSandboxIcon from './CodeSandboxIcon';
import IconButton from './IconButton';

const liveEditorStyle = {
  fontFamily: '"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',
  fontSize: 14,
  overflowX: 'auto',
};

const Demo = ({
  component: Component,
  file,
  sandbox,
}) => {
  const router = useRouter();
  const [updateKey, forceUpdate] = useReducer((value) => !value, false);
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const liveProviderTheme = {
    dark: codeBlockDark,
    light: codeBlockLight,
  }[colorMode];
  const [showSourceCode, toggleShowSourceCode] = useToggle(false);
  const { onCopy: copySource, hasCopied: hasCopiedSource } = useClipboard();
  const handleClickCopySource = useCallback(() => {
    copySource(file?.data);
  }, [copySource, file?.data]);
  const handleClickEditInCodeSandbox = useCallback(() => {
    openInCodeSandbox(sandbox);
  }, [sandbox]);
  const reset = useCallback(() => {
    forceUpdate();
    toggleShowSourceCode(false);
  }, [forceUpdate, toggleShowSourceCode]);
    
  return (
    <LiveProvider
      code={file?.data}
      disabled={true}
      language="jsx"
      theme={liveProviderTheme}
    >
      <Box
        border={1}
        borderColor={borderColor}
        p="4x"
      >
        <Box
          fontSize="sm"
          lineHeight="sm"
        >
          <Fragment key={updateKey}>
            <Component />
          </Fragment>
        </Box>
      </Box>
      <Flex
        columnGap="2x"
        justifyContent="flex-end"
        mb="4x"
      >
        <IconButton
          data-track={showSourceCode
            ? `CodeBlock|hide_source|${x({ path: router.pathname })}`
            : `CodeBlock|show_source|${x({ path: router.pathname })}`
          }
          onClick={toggleShowSourceCode}
        >
          <Tooltip label={showSourceCode ? 'Hide the source' : 'Show the source'}>
            <Icon icon="code" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`CodeBlock|copy_source|${x({ path: router.pathname })}`}
          onClick={handleClickCopySource}
        >
          <Tooltip label={hasCopiedSource ? 'Copied' : 'Copy the source'}>
            <Icon icon="file-copy-o" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`CodeBlock|edit_in_codesandbox|${router.pathname}`}
          onClick={handleClickEditInCodeSandbox}
        >
          <Tooltip label="Edit in CodeSandbox">
            <CodeSandboxIcon size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`CodeBlock|reset|${router.pathname}`}
          onClick={reset}
        >
          <Tooltip label="Reset the demo">
            <Icon icon="redo" size={{ sm: '5x', md: '4x' }} />
          </Tooltip>
        </IconButton>
      </Flex>
      <Fade in={showSourceCode}>
        <Collapse in={showSourceCode} unmountOnExit={true}>
          <LiveEditor style={liveEditorStyle} />
        </Collapse>
      </Fade>
    </LiveProvider>
  );
};

Demo.displayName = 'Demo';

export default Demo;
