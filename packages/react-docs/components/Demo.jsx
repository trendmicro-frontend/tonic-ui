import {
  Box,
  Flex,
  Icon,
  SVGIcon,
  Tooltip,
  useColorMode,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import LZString from 'lz-string';
import { useRouter } from 'next/router';
import React from 'react';
import useClipboard from '../hooks/useClipboard';
import { createReactApp } from '../sandbox/codesandbox';
import x from '../utils/json-stringify';
import IconButton from './IconButton';

const CodeSandboxIcon = ({ size, ...rest }) => {
  return (
    <SVGIcon size={size} viewBox="0 0 1024 1024" {...rest}>
      <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
    </SVGIcon>
  );
};

const compress = (object) => {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
};

const addHiddenInput = (form, name, value) => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
};

const Demo = ({
  component: Component,
  code,
}) => {
  const router = useRouter();
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  const [isSourceVisible, toggleSourceVisible] = useToggle(false);
  const { onCopy: copySource, hasCopied: hasCopiedSource } = useClipboard(code);
  const handleClickCopySource = () => {
    copySource();
  };
  const handleClickResetDemo = () => {
  };
  const handleClickEditInCodeSandbox = () => {
    const { files } = createReactApp({
      title: 'title',
      code,
    });
    const parameters = compress({ files });              
      
    // ref: https://codesandbox.io/docs/api/#define-api                                    
    const form = document.createElement('form');                                                 
    form.method = 'POST';                           
    form.target = '_blank';               
    form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
    addHiddenInput(form, 'parameters', parameters);
    addHiddenInput(                 
      form,       
      'query',                      
      'file=/demo.js',
    );
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };
    
  return (
    <>
      <Box
        border={1}
        borderColor={borderColor}
        p="4x"
      >
        <Box
          as="pre"
          fontSize="md"
          lineHeight="md"
          m={0}
        >
          <Box as="code">
            <Component />
          </Box>
        </Box>
      </Box>
      <Flex
        columnGap="2x"
        justifyContent="flex-end"
        mb="4x"
      >
        <IconButton
          data-track={isSourceVisible
            ? `CodeBlock|hide_source|${x({ path: router.pathname })}`
            : `CodeBlock|show_source|${x({ path: router.pathname })}`
          }
          onClick={toggleSourceVisible}
        >
          <Tooltip label={isSourceVisible ? 'Hide the source' : 'Show the source'}>
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
          data-track={`CodeBlock|reset|${router.pathname}`}
          onClick={handleClickResetDemo}
        >
          <Tooltip label="Reset demo">
            <Icon icon="redo" size={{ sm: '5x', md: '4x' }} />
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
      </Flex>
    </>
  );
};

export default Demo;
