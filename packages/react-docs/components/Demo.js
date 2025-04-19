import {
  Box,
  Button,
  Collapse,
  Fade,
  Flex,
  Tooltip,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import {
  CodeIcon,
  FileCopyOIcon,
  RedoIcon,
} from '@tonic-ui/react-icons';
import {
  merge,
} from '@tonic-ui/utils';
import { useRouter } from 'next/router';
import { themes } from "prism-react-renderer"
import React, { Fragment, useEffect, useCallback, useReducer } from 'react';
import { LiveProvider, LiveEditor } from 'react-live';
import useClipboard from '../hooks/useClipboard';
import CodeSandboxIcon from '../icons/CodeSandboxIcon';
import { open as openInCodeSandbox } from '../sandbox/codesandbox';
import x from '../utils/json-stringify';
import IconButton from './IconButton';

const Demo = ({
  component: Component,
  defaultExpanded = false,
  expanded,
  file,
  sandbox,
  ...rest
}) => {
  const router = useRouter();
  const [updateKey, forceUpdate] = useReducer((value) => !value, false);
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const liveProviderTheme = {
    dark: merge(themes.vsDark, {
      plain: {
        backgroundColor: theme.colors['gray:90'],
      },
    }),
    light: merge(themes.vsLight, {
      plain: {
        backgroundColor: theme.colors['gray:10'],
      },
    }),
  }[colorMode];
  const [showSourceCode, toggleShowSourceCode] = useToggle(expanded ?? defaultExpanded);
  const { onCopy, hasCopied } = useClipboard(file?.data);
  const handleClickEditInCodeSandbox = useCallback(() => {
    openInCodeSandbox(sandbox);
  }, [sandbox]);
  const reset = useCallback(() => {
    forceUpdate();
    toggleShowSourceCode(false);
  }, [forceUpdate, toggleShowSourceCode]);

  useEffect(() => {
    const isControlled = (expanded !== undefined);
    if (isControlled && expanded !== showSourceCode) {
      toggleShowSourceCode(expanded);
    }
  }, [expanded, showSourceCode, toggleShowSourceCode]);

  if (!Component) {
    return (
      <LiveProvider
        code={file?.data}
        disabled={true}
        language="jsx"
        theme={liveProviderTheme}
      >
        <Box
          as={LiveEditor}
          sx={{
            fontFamily: 'mono',
            fontSize: 'sm',
            '& > .prism-code': {
              overflowX: 'auto',
            },
          }}
        />
      </LiveProvider>
    );
  }

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
            ? `Code|hide_source|${x({ path: router.pathname })}`
            : `Code|show_source|${x({ path: router.pathname })}`
          }
          onClick={toggleShowSourceCode}
        >
          <Tooltip label={showSourceCode ? 'Hide the source' : 'Show the source'}>
            <CodeIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`Code|copy_source|${x({ path: router.pathname })}`}
          onClick={onCopy}
        >
          <Tooltip label={hasCopied ? 'Copied' : 'Copy the source'}>
            <FileCopyOIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`Code|edit_in_codesandbox|${router.pathname}`}
          onClick={handleClickEditInCodeSandbox}
        >
          <Tooltip label="Edit in CodeSandbox">
            <CodeSandboxIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          data-track={`Code|reset|${router.pathname}`}
          onClick={reset}
        >
          <Tooltip label="Reset the demo">
            <RedoIcon />
          </Tooltip>
        </IconButton>
      </Flex>
      <Fade in={showSourceCode}>
        <Collapse in={showSourceCode} unmountOnExit={true}>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              as={LiveEditor}
              sx={{
                fontFamily: 'mono',
                fontSize: 'md',
                lineHeight: 'md',
                mb: '4x',
                '& > .prism-code': {
                  // Use `!important` to override the inline style
                  padding: `${theme?.space?.['4x']} !important`,
                  overflowX: 'auto',
                },
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={onCopy}
              sx={{
                position: 'absolute',
                right: '4x',
                top: '4x',
              }}
            >
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Box>
        </Collapse>
      </Fade>
    </LiveProvider>
  );
};

Demo.displayName = 'Demo';

export default Demo;
