import { css } from '@emotion/react';
import { mdx } from '@mdx-js/react';
import * as styledUIComponents from '@trendmicro/react-styled-ui';
import * as tmicon from '@trendmicro/tmicon';
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
import SelectableButton from './SelectableButton';
import SkeletonBody from './SkeletonBody';
import SkeletonContent from './SkeletonContent';
import useToast from './useToast';

const thirdPartyComponents = {
  AutoSizer,
  FontAwesomeIcon,
  Scrollbars,
  ReactBeautifulDND,
  ReactDND,
  ReactDNDHtml5backend,
  ReactMovable,
  update,
  ...ReactTable,
};
const {
  Box,
  Button,
  Collapse,
  Fade,
  Icon,
  PseudoBox,
  useColorMode,
  useClipboard,
} = styledUIComponents;

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
    light: 'gray:20', // FIXME
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

const CopyButton = props => (
  <Button
    fontFamily="base"
    position="absolute"
    textTransform="uppercase"
    zIndex="1"
    top="12x"
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
   * Default is expand or collapse (Default: `true`)
   */
  expanded = true,

  className,
  children,
  ...props
}) => {
  const [editorCode, setEditorCode] = useState(children.trim());
  const { onCopy, hasCopied } = useClipboard(editorCode);
  const [isExpanded, setIsExpanded] = React.useState(expanded);
  const [liveEditorHeight, setLiveEditorHeight] = React.useState(false);
  const handleCollapse = () => setIsExpanded(!isExpanded);
  const liveEditorRef = useRef(null);
  const handleCodeChange = useCallback(newCode => {
    setEditorCode(newCode.trim());
  }, []);
  const [colorMode] = useColorMode();
  const themes = {
    light: codeBlockLight,
    dark: codeBlockDark,
  };
  const theme = themes[colorMode];
  const language = className && className.replace(/language-/, '');
  const headerHeight = 16;
  const isCollapsible = liveEditorHeight > headerHeight;

  noInline = boolean(noInline);

  if (disabled === undefined) {
    disabled = (language !== 'jsx');
  } else {
    disabled = (language !== 'jsx') || boolean(disabled);
  }

  const useCodeBlockTitleStyle = {
    px: '4x',
    py: '3x',
    _hover: {
      color: {
        light: 'black:primary',
        dark: 'white:primary',
      }[colorMode],
    },
    color: {
      light: 'black:secondary',
      dark: 'white:secondary',
    }[colorMode],
    backgroundColor: {
      light: 'gray:10',
      dark: 'black:emphasis',
    }[colorMode],
    cursor: isCollapsible ? 'pointer' : 'default',
  };

  const useCollapseIconStyle = {
    transform: isExpanded ? 'rotate(180deg)' : null,
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
      ...styledUIComponents,
      ...thirdPartyComponents,
      EditableTag,
      SelectableButton,
      SkeletonBody,
      SkeletonContent,
      Lorem: (props) => (
        <Lorem
          paragraphLowerBound={1}
          paragraphUpperBound={3}
          sentenceLowerBound={3}
          sentenceUpperBound={12}
          {...props}
        />
      ),
      useToast,
      css,
      mdx,
      tmicons,
    },
    mountStylesheet: false,
    ...props,
  };

  useEffect(() => {
    liveEditorRef.current && setLiveEditorHeight(liveEditorRef.current.clientHeight);
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
          <PseudoBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            onClick={isCollapsible ? handleCollapse : undefined}
            userSelect="none"
            {...useCodeBlockTitleStyle}
          >
            EDITABLE EXAMPLE
            {isCollapsible && (
              <Icon
                icon="chevron-down"
                {...useCollapseIconStyle}
              />
            )}
          </PseudoBox>
        )}
        {(isEditable && isCollapsible) ? (
          <Fade in={isExpanded}>
            <Collapse in={isExpanded}>
              <Box>
                {
                  isExpanded && (
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
          </Fade>
        ) : (
          <Box>
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
