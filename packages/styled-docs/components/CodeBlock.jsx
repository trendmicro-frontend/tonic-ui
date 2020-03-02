import { css } from '@emotion/core';
import { mdx } from '@mdx-js/react';
import * as StyledCoreComponents from '@trendmicro/react-styled-core';
import { boolean } from 'boolean';
import githubTheme from 'prism-react-renderer/themes/github';
import vsDarkTheme from 'prism-react-renderer/themes/vsDark';
import React, { useCallback, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import DocsIcon from './DocsIcon';
import FontAwesomeIcon from './FontAwesomeIcon';
import TMIcon from './TMIcon';

const { Box, Button, useColorMode, useClipboard } = StyledCoreComponents;
const DocsComponents = {
  DocsIcon,
};

const liveEditorStyle = {
  fontSize: 14,
  marginBottom: 32,
  marginTop: 32,
  overflowX: 'auto',
  fontFamily: '"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',
  borderRadius: 10,
};

const liveErrorStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: 14,
  padding: '1rem',
  overflowX: 'auto',
  color: 'white',
  backgroundColor: 'red',
};

const LiveCodePreview = props => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray:20', // FIXME
    dark: 'gray:70', // FIXME
  }[colorMode];

  return (
    <Box
      as={LivePreview}
      fontFamily="base"
      mt="5x"
      p="3x"
      border={1}
      borderColor={borderColor}
      borderRadius="sm"
      {...props}
    />
  );
};

const CopyButton = props => (
  <Button
    fontFamily="base"
    position="absolute"
    textTransform="uppercase"
    top={0}
    zIndex="1"
    right="4x"
    {...props}
  />
);

const EditableNotice = props => {
  const { colorMode } = useColorMode();
  const backgroundColor = {
    light: 'rgb(246, 248, 250)', // github
    dark: 'rgb(30, 30, 30)', // vscode
  }[colorMode];

  return (
    <Box
      position="absolute"
      width="100%"
      top="-1.25rem"
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      backgroundColor={backgroundColor}
      py="2x"
      zIndex="0"
      color="gray:40"
      fontFamily="base"
      fontSize="xs"
      lineHeight="xs"
      fontWeight="semibold"
      textAlign="center"
      pointerEvents="none"
      {...props}
    >
      EDITABLE EXAMPLE
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

  className,
  children,
  ...props
}) => {
  const [editorCode, setEditorCode] = useState(children.trim());
  const { onCopy, hasCopied } = useClipboard(editorCode);
  const handleCodeChange = useCallback(newCode => {
    setEditorCode(newCode.trim());
  }, []);
  const { colorMode } = useColorMode();
  const themes = {
    light: githubTheme,
    dark: vsDarkTheme,
  };
  const theme = themes[colorMode];
  const language = className && className.replace(/language-/, '');

  noInline = boolean(noInline);

  if (disabled === undefined) {
    disabled = (language !== 'jsx');
  } else {
    disabled = (language !== 'jsx') || boolean(disabled);
  }

  const liveProviderProps = {
    theme,
    language,
    noInline,
    disabled,
    code: editorCode,
    transformCode: code => code,
    scope: {
      ...StyledCoreComponents,
      ...DocsComponents,
      FontAwesomeIcon,
      TMIcon,
      css,
      mdx,
    },
    mountStylesheet: false,
    ...props,
  };

  const isEditable = !disabled;

  return (
    <LiveProvider {...liveProviderProps}>
      {isEditable && (
        <LiveCodePreview />
      )}
      <Box position="relative">
        <LiveEditor
          onChange={handleCodeChange}
          padding={20}
          style={liveEditorStyle}
        />
        <CopyButton onClick={onCopy}>
          {hasCopied ? 'copied' : 'copy'}
        </CopyButton>
        {isEditable && (
          <EditableNotice />
        )}
      </Box>
      {isEditable && (
        <LiveError style={liveErrorStyle} />
      )}
    </LiveProvider>
  );
};

export default CodeBlock;
