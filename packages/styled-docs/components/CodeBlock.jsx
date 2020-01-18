import { mdx } from '@mdx-js/react';
import * as StyledCore from '@trendmicro/react-styled-core';
import { boolean } from 'boolean';
import githubTheme from 'prism-react-renderer/themes/github';
import vsDarkTheme from 'prism-react-renderer/themes/vsDark';
import React, { useCallback, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const { Box, useColorMode } = StyledCore;

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
    light: 'gray.20', // FIXME
    dark: 'gray.70', // FIXME
  }[colorMode];

  return (
    <Box
      as={LivePreview}
      fontFamily="base"
      mt="1.25rem"
      p=".75rem"
      border={1}
      borderColor={borderColor}
      borderRadius="sm"
      {...props}
    />
  );
};

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
      py=".5rem"
      zIndex="0"
      color="gray.40"
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
  readonly,
  className,
  children,
  ...props
}) => {
  const [editorCode, setEditorCode] = useState(children.trim());
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

  if (readonly === undefined) {
    readonly = (language !== 'jsx');
  } else {
    readonly = (language !== 'jsx') || boolean(readonly);
  }

  const liveProviderProps = {
    theme,
    language,
    disabled: readonly,
    code: editorCode,
    transformCode: code => code,
    scope: {
      ...StyledCore,
      mdx,
    },
    mountStylesheet: false,
    noInline: false,
    ...props,
  };

  return (
    <LiveProvider {...liveProviderProps}>
      {!readonly && (
        <LiveCodePreview />
      )}
      <Box position="relative">
        <LiveEditor
          onChange={handleCodeChange}
          padding={20}
          style={liveEditorStyle}
        />
        {!readonly && (
          <EditableNotice />
        )}
      </Box>
      {!readonly && (
        <LiveError style={liveErrorStyle} />
      )}
    </LiveProvider>
  );
};

export default CodeBlock;
