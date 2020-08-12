import { css } from '@emotion/core';
import { mdx } from '@mdx-js/react';
import * as CoreComponents from '@trendmicro/react-styled-ui';
import { boolean } from 'boolean';
import React, { useCallback, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Lorem from 'react-lorem-component';
import * as ReactTable from 'react-table';
import { AutoSizer } from 'react-virtualized';
import { codeBlockLight, codeBlockDark } from '../prism-themes/styled-ui';
import FontAwesomeIcon from './FontAwesomeIcon';
import tmIconMap from '../../react-styled-ui/src/Icon/tmIconMap';

const ThirdPartyComponents = {
  AutoSizer,
  Scrollbars,
  ...ReactTable,
};

const IconComponents = {
  FontAwesomeIcon,
};
const { Box, Button, useColorMode, useClipboard } = CoreComponents;

const liveEditorStyle = {
  fontSize: 14,
  marginBottom: 32,
  marginTop: 32,
  overflowX: 'auto',
  fontFamily: '"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',
};

const liveErrorStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: 14,
  padding: '1rem',
  overflowX: 'auto',
  color: 'white',
  backgroundColor: 'red',
};

const tmIconList = tmIconMap.iconsets.map(group => {
  const icons = tmIconMap.icons.filter(({ iconset }) => iconset === group.id);
  if (icons.length === 0) {
    return null;
  }
  return { group, icons };
});

const LiveCodePreview = props => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray:20', // FIXME
    dark: 'gray:70',
  }[colorMode];

  return (
    <Box
      as={LivePreview}
      fontFamily="base"
      fontSize="sm"
      lineHeight="sm"
      mt="5x"
      p="4x"
      border={1}
      borderColor={borderColor}
      borderRadius="sm"
      whiteSpace="normal"
      {...props}
    />
  );
};

const CopyButton = props => (
  <Button
    fontFamily="base"
    position="absolute"
    textTransform="uppercase"
    zIndex="1"
    top="3x"
    right="4x"
    {...props}
  />
);

const EditableNotice = props => (
  <Box
    position="absolute"
    top="2x"
    zIndex="0"
    color="gray:40"
    fontFamily="base"
    fontSize="xs"
    lineHeight={1}
    fontWeight="semibold"
    pointerEvents="none"
    left="50%"
    transform="translate(-50%)"
    {...props}
  >
    EDITABLE EXAMPLE
  </Box>
);

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
    light: codeBlockLight,
    dark: codeBlockDark,
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
      ...IconComponents,
      ...CoreComponents,
      ...ThirdPartyComponents,
      Lorem: (props) => (
        <Lorem
          paragraphLowerBound={1}
          paragraphUpperBound={3}
          sentenceLowerBound={3}
          sentenceUpperBound={12}
          {...props}
        />
      ),
      css,
      mdx,
      tmIconList,
    },
    mountStylesheet: false,
    ...props,
  };

  if (previewOnly) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LivePreview />
      </LiveProvider>
    );
  }

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
