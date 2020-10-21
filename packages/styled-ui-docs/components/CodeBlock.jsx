import { css } from '@emotion/core';
import { mdx } from '@mdx-js/react';
import * as CoreComponents from '@trendmicro/react-styled-ui';
import { boolean } from 'boolean';
import update from 'immutability-helper';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import * as ReactBeautifulDND from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import * as ReactDND from 'react-dnd';
import * as ReactDNDHtml5backend from 'react-dnd-html5-backend';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Lorem from 'react-lorem-component';
import * as ReactMovable from 'react-movable';
import * as ReactTable from 'react-table';
import { AutoSizer } from 'react-virtualized';
import { codeBlockLight, codeBlockDark } from '../prism-themes/styled-ui';
import FontAwesomeIcon from './FontAwesomeIcon';
import EditableTag from './EditableTag';
import tmIconMap from '../../react-styled-ui/src/Icon/tmIconMap';
import useToast from './useToast';

const ThirdPartyComponents = {
  AutoSizer,
  Scrollbars,
  ReactBeautifulDND,
  ReactDND,
  ReactDNDHtml5backend,
  ReactMovable,
  update,
  ...ReactTable,
};
const CustomedComponents = {
  EditableTag,
};
const IconComponents = {
  FontAwesomeIcon,
};
const { PseudoBox, Box, Flex, Button, Collapse, Icon, useColorMode, useClipboard } = CoreComponents;

const liveEditorStyle = {
  fontSize: 14,
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
    top="4x"
    right="4x"
    {...props}
  />
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

  /**
   * Default is expand or collapse (Default: `false`)
   */
  expanded = false,

  className,
  children,
  ...props
}) => {
  const [editorCode, setEditorCode] = useState(children.trim());
  const { onCopy, hasCopied } = useClipboard(editorCode);
  const [expand, setExpand] = React.useState(expanded);
  const [liveEditorHeight, setLiveEditorHeight] = React.useState(false);
  const handleCollapse = () => setExpand(!expand);
  const liveEditorRef = useRef(null);
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

  const useCodeBlockTitleStyle = {
    pt: '4x',
    px: '4x',
    backgroundColor: {
      light: 'gray:10',
      dark: 'black:emphasis',
    }[colorMode],
    cursor: 'pointer',
  };

  const useCollapseBoxStyle = {
    position: 'relative',
    __after: {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: '100%',
      height: '5x',
      bottom: '0',
      background: {
        light: 'linear-gradient(360deg, rgba(242, 242, 242, 0.6) 25%, rgba(242, 242, 242, 0) 83.33%)',
        dark: 'linear-gradient(360deg, rgba(0, 0, 0, 0.6) 25%, rgba(0, 0, 0, 0) 83.33%)',
      }[colorMode],
    },
  };

  const useCollapseIconStyle = {
    transform: expand ? 'rotate(180deg)' : null,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
    cursor: 'pointer',
  };

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
      ...CustomedComponents,
      useToast,
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

  useEffect(() => {
    liveEditorRef && setLiveEditorHeight(liveEditorRef.current.clientHeight);
  }, [liveEditorRef]);

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
      <Box mt="4x" position="relative">
        {isEditable && (
          <Flex justify="space-between" onClick={handleCollapse} {...useCodeBlockTitleStyle}>
            EDITABLE EXAMPLE
            <Icon
              icon="chevron-down"
              {...useCollapseIconStyle}
            />
          </Flex>
        )}
        {(isEditable && liveEditorHeight > 84) ? (
          <PseudoBox {...useCollapseBoxStyle}>
            <Collapse startingHeight={84} isOpen={expand}>
              <Box position="relative">
                {
                  expand && (
                    <CopyButton onClick={onCopy}>
                      {hasCopied ? 'copied' : 'copy'}
                    </CopyButton>
                  )
                }
                <Box ref={liveEditorRef}>
                  <LiveEditor
                    onChange={handleCodeChange}
                    padding={20}
                    style={liveEditorStyle}
                  />
                </Box>
              </Box>
            </Collapse>
          </PseudoBox>
        ) : (
          <Box position="relative">
            <CopyButton onClick={onCopy}>
              {hasCopied ? 'copied' : 'copy'}
            </CopyButton>
            <Box ref={liveEditorRef}>
              <LiveEditor
                onChange={handleCodeChange}
                padding={20}
                style={liveEditorStyle}
              />
            </Box>
          </Box>
        )}
      </Box>
      {isEditable && (
        <LiveError style={liveErrorStyle} />
      )}
    </LiveProvider>
  );
};

export default CodeBlock;
