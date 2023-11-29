import { Global, css } from '@emotion/react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import {
  Box,
  Button,
  ButtonBase,
  Code,
  Flex,
  Icon,
  LinkButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Text,
  Textarea,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import {
  isNullish,
} from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import useClipboard from '../hooks/useClipboard';
import useTrack from '../hooks/useTrack';
import CodeSandboxIcon from '../icons/codesandbox';
import RealTimeGuidanceIcon from '../icons/real-time-guidance';
import AIPoweredEnhancementsIcon from '../icons/ai-powered-enhancements';
import ChatAssistantIcon from '../icons/chat-assistant';
import ChatGeneratingIcon from '../icons/chat-generating';
import { open as openInCodeSandbox } from '../sandbox/codesandbox';
import IconButton from './IconButton';

const BASE_PATH = ensureString(process.env.BASE_PATH);

const FeatureCards = (props) => {
  return (
    <Flex {...props} />
  );
};

const FeatureCard = (props) => {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      alignItems="center"
      border={1}
      borderColor="gray:70" // TODO: light mode
      borderRadius="md"
      py="8x"
      px="4x"
      {...props}
    />
  );
};

const FeatureCardAvatar = (props) => {
  return (
    <Box
      width="20x"
      height="20x"
      mb="8x"
      {...props}
    />
  );
};

const FeatureCardTitle = (props) => {
  return (
    <Text
      fontSize="md"
      lineHeight="md"
      mb="2x"
      {...props}
    />
  );
};

const FeatureCardDescription = (props) => {
  const [colorStyle] = useColorStyle();

  return (
    <Text
      color={colorStyle.color.secondary}
      fontSize="xs"
      lineHeight="xs"
      mb="4x"
      {...props}
    />
  );
};

const ClickableExample = (props) => {
  const backgroundColor = 'gray:80';
  const borderColor = 'gray:70';
  const hoverBackgroundColor = '#132852';
  const hoverBorderColor = 'blue:50';

  return (
    <Box
      role="button"
      sx={{
        backgroundColor,
        border: 1,
        borderColor,
        borderRadius: 'md',
        cursor: 'pointer',
        _hover: {
          backgroundColor: hoverBackgroundColor,
          borderColor: hoverBorderColor,
        },
        py: '2x',
        px: '3x',
      }}
      {...props}
    />
  );
};

const CodeBlock = ({
  code,
  language,
  ...rest
}) => {
  const [colorMode] = useColorMode();
  const ref = useRef();
  const { onCopy: copySource } = useClipboard();
  const handleClickCopySource = useCallback(() => {
    const context = ref.current;
    copySource(code, context);
  }, [code, copySource]);
  const handleClickEditInCodeSandbox = useCallback(() => {
    openInCodeSandbox({
      raw: code,
      title: 'Tonic One',
    });
  }, [code]);
  const isJavaScriptCode = language === 'js' || language === 'jsx';

  return (
    <Box>
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={language}
        style={colorMode === 'dark' ? oneDark : oneLight}
      >
        {code}
      </SyntaxHighlighter>
      <Flex
        ref={ref}
        columnGap="2x"
        justifyContent="flex-end"
        mb="4x"
      >
        {isJavaScriptCode && (
          <IconButton
            onClick={handleClickEditInCodeSandbox}
            title="Open In CodeSandbox"
          >
            <CodeSandboxIcon size={{ sm: '5x', md: '4x' }} />
          </IconButton>
        )}
        <IconButton
          onClick={handleClickCopySource}
          title="Copy Source"
        >
          <Icon icon="file-copy-o" size={{ sm: '5x', md: '4x' }} />
        </IconButton>
      </Flex>
    </Box>
  );
};

const AICompanionModal = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => {
  const theme = useTheme();
  const [colorStyle] = useColorStyle();
  const track = useTrack();
  const abortControllerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [chatModel, setChatModel] = useState('gpt-35');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState({
    messages: [], // { type: 'userMessage' | 'apiMessage', message: string }
    history: []
  });
  const { messages, pending, history } = messageState;
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const resetState = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setUserInput('');
    setLoading(false);
    setMessageState({
      messages: [],
      history: []
    });
  };

  useEffect(() => {
    // focus on the input field when the modal opens
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  const ask = async (question, options) => {
    const { type = 'default' } = options ?? {};
    question = question.trim();

    if (question === '') {
      return;
    }

    setMessageState(state => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
      pending: undefined
    }));

    setLoading(true);
    setUserInput('');
    setMessageState(state => ({
      ...state,
      pending: '',
    }));

    abortControllerRef.current = new AbortController();
    const apiPath = BASE_PATH + `/api/tonic-one?type=${type}&model=${chatModel}`;

    fetchEventSource(apiPath, {
      method: 'POST',
      headers: {
        'Referrer-Policy': 'origin',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        history
      }),
      signal: abortControllerRef.current.signal,
      onmessage: (event) => {
        if (event.data === '[DONE]') {
          setMessageState(state => ({
            history: [
              ...state.history,
              [question, state.pending ?? ''],
            ],
            messages: [
              ...state.messages,
              {
                type: 'apiMessage',
                message: state.pending ?? '',
              },
            ],
            pending: undefined,
          }));

          setLoading(false);
          abortControllerRef.current.abort();
        } else {
          const data = JSON.parse(event.data);
          setMessageState(state => ({
            ...state,
            pending: (state.pending ?? "") + data.data,
          }));
        }
      }
    });
  };

  const handleInputKeyDown = (event) => {
    // Prevent blank submissions and allow for multiline input
    if (event.key === 'Enter' && userInput) {
      if (!event.shiftKey && userInput) {
        event.preventDefault();

        const question = userInput;
        ask(question);
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleClickReset = () => {
    resetState();
  };

  const handleChangeFileInput = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const question = ensureString(event.target.result).trim();

        track('AICompanion', 'predefined_input', question);
        resetState();

        const codeSnippet = '```\n' + question + '\n```';
        ask(codeSnippet, { type: 'copilot' });

        // Set the input value to null so that the same file can be uploaded
        fileInputRef.current.value = null;
      };
      reader.readAsText(file);
    }
  };

  const handleClickUploadCode = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const chatMessages = useMemo(() => {
    return [
      ...messages,
      ...(pending ? [{ type: 'apiMessage', message: pending }] : [])
    ];
  }, [messages, pending]);

  const handleSelectChatModel = (event) => {
    const value = event.currentTarget.value;
    if (!isNullish(value)) {
      setChatModel(value);
    }
  };

  const handleClickExampleCode1 = () => {
    const question = `
<div
  style={{
    backgroundColor: '#212121', // secondary background color
    color: '#fff',
  }}
/>
    `;

    track('AICompanion', 'predefined_input', question);
    resetState();

    const codeSnippet = '```\n' + question + '\n```';
    ask(codeSnippet, { type: 'copilot' });
  };

  const handleClickExampleCode2 = () => {
    const question = `
import { Box } from '@tonic-ui/react';
import React from 'react';

const MyComponent = (props) => {
  return (
    <Box {...props} />
  );
};

export default MyComponent;
    `;

    track('AICompanion', 'predefined_input', question);
    resetState();

    const codeSnippet = '```\n' + question + '\n```';
    ask(codeSnippet, { type: 'copilot' });
  };

  return (
    <Modal
      ref={ref}
      autoFocus
      ensureFocus
      closeOnEsc
      isClosable
      isOpen
      onClose={onClose}
      size="xl"
      {...rest}
    >
      <Global
        styles={css`
          body {
            overflow: hidden;
          }
        `}
      />
      <ModalOverlay />
      <ModalContent
        borderRadius="lg"
        mt="20x"
        maxHeight={`calc(100vh - ${theme?.sizes['20x']} - ${theme?.sizes['20x']})`}
        height="80vh"
      >
        <Flex
          pl="6x"
          pt="4x"
          pb="3x"
          pr="12x"
          justifyContent="space-between"
          columnGap="4x"
        >
          <Text fontSize="xl" lineHeight="xl">
            Tonic One – Where AI Meets UI
          </Text>
          <Flex
            mt="-2x"
            alignItems="flex-start"
            columnGap="2x"
          >
            <Menu>
              <MenuButton
                variant="secondary"
                width={100}
              >
                {chatModel === 'gpt-35' && <Text>GPT-3.5</Text>}
                {chatModel === 'gpt-4' && <Text>GPT-4</Text>}
              </MenuButton>
              <MenuList
                width="max-content"
              >
                <MenuItem
                  onClick={handleSelectChatModel}
                  value="gpt-35"
                  sx={{
                    columnGap: '2x',
                  }}
                >
                  <Icon icon={chatModel === 'gpt-35' ? 'check-s' : ''} />
                  <Text>GPT-3.5</Text>
                </MenuItem>
                <MenuItem
                  onClick={handleSelectChatModel}
                  value="gpt-4"
                  sx={{
                    columnGap: '2x',
                  }}
                >
                  <Icon icon={chatModel === 'gpt-4' ? 'check-s': ''} />
                  <Text>GPT-4</Text>
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              variant="secondary"
              onClick={handleClickReset}
              sx={{
                columnGap: '2x',
              }}
            >
              <Icon icon="edit" size="4x" />
              New Chat
            </Button>
          </Flex>
        </Flex>
        <Box
          flex="auto"
          ref={messageListRef}
          height="100%"
          overflowY="auto"
          px="6x"
        >
          <Flex
            my="4x"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="md" lineHeight="md">
              Try out the new features to explore the full capabilities of Tonic One!
            </Text>
          </Flex>
          <FeatureCards
            columnGap="4x"
            mb="6x"
          >
            <FeatureCard>
              <FeatureCardAvatar>
                <RealTimeGuidanceIcon size="20x" />
              </FeatureCardAvatar>
              <FeatureCardTitle>
                Real-time Guidance
              </FeatureCardTitle>
              <FeatureCardDescription height="14x">
                Search for any components or keywords and get real-time guidance on how to use them.
              </FeatureCardDescription>
              <Flex
                rowGap="2x"
                columnGap="2x"
                flexDirection="column"
              >
                <ClickableExample
                  onClick={(event) => {
                    const question = 'Create a simple Tonic UI application';

                    track('AICompanion', 'predefined_input', question);

                    resetState();

                    ask(question);
                  }}
                >
                  Create a simple Tonic UI application
                </ClickableExample>
                <ClickableExample
                  onClick={(event) => {
                    const question = 'Showcase the integration of the Modal and Alert components';

                    track('AICompanion', 'predefined_input', question);

                    resetState();

                    ask(question);
                  }}
                >
                  Showcase the integration of the Modal and Alert components
                </ClickableExample>
              </Flex>
            </FeatureCard>
            <FeatureCard>
              <FeatureCardAvatar>
                <AIPoweredEnhancementsIcon size="20x" />
              </FeatureCardAvatar>
              <FeatureCardTitle>
                AI-powered Enhancements
              </FeatureCardTitle>
              <FeatureCardDescription height="14x">
                Paste your code and get AI-powered suggestions to improve your code.
              </FeatureCardDescription>
              <Box
                as="input"
                type="file"
                onChange={handleChangeFileInput}
                sx={{
                  display: 'none',
                }}
                ref={fileInputRef}
              />
              <Flex mb="4x">
                <Button
                  variant="secondary"
                  onClick={handleClickUploadCode}
                  sx={{
                    columnGap: '2x',
                  }}
                >
                  <Icon icon="upload" />
                  Upload code
                </Button>
              </Flex>
              <Flex columnGap="2x">
                Examples:
                <LinkButton onClick={handleClickExampleCode1}>
                  #1
                </LinkButton>
                <LinkButton onClick={handleClickExampleCode2}>
                  #2
                </LinkButton>
              </Flex>
            </FeatureCard>
          </FeatureCards>
          {chatMessages.map((message, index) => {
            if (message.type === 'userMessage') {
              return (
                <>
                  <Flex
                    key={index}
                    sx={{
                      justifyContent: 'flex-end',
                      mb: '6x',
                    }}
                  >
                    <Flex
                      key={index}
                      sx={{
                        backgroundColor: 'gray:20', // TODO: light mode
                        border: 1,
                        borderRadius: 'lg',
                        color: 'black:emphasis', // TODO: light mode
                        px: '4x',
                        py: '2x',
                      }}
                    >
                      <Box
                        sx={{
                          'p': {
                            margin: 0,
                          },
                        }}
                      >
                        <Markdown
                          remarkPlugins={[
                            remarkGfm,
                          ]}
                        >
                          {message.message}
                        </Markdown>
                      </Box>
                    </Flex>
                  </Flex>
                  {(loading && !pending) && (
                    <Flex
                      key={index}
                      sx={{
                        justifyContent: 'flex-start',
                        columnGap: '2x',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: colorStyle.background.tertiary,
                          borderRadius: 'circle',
                          width: '10x',
                          height: '10x',
                          flex: 'none',
                        }}
                      >
                        <ChatGeneratingIcon size="10x" />
                      </Box>
                    </Flex>
                  )}
                </>
              );
            }

            return (
              <Flex
                key={index}
                sx={{
                  justifyContent: 'flex-start',
                  mb: '6x',
                  columnGap: '2x',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorStyle.background.tertiary,
                    borderRadius: 'circle',
                    width: '10x',
                    height: '10x',
                    flex: 'none',
                  }}
                >
                  <ChatAssistantIcon size="10x" />
                </Box>
                <Flex
                  sx={{
                    backgroundColor: 'inherit',
                    borderRadius: 'lg',
                    border: 1,
                    borderColor: 'gray:70', // TODO: light mode
                    columnGap: '3x',
                    px: '4x',
                    py: '2x',
                    flex: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      'p': {
                        margin: 0,
                      },
                    }}
                  >
                    <Markdown
                      components={{
                        code(props) {
                          const {children, className, ...rest} = props
                          const match = /language-(\w+)/.exec(className || '')
                          if (match) {
                            const language = match[1];
                            const code = ensureString(children).replace(/\n$/, '');

                            return (
                              <CodeBlock code={code} language={language} />
                            );
                          }

                          return (
                            <Code {...rest} className={className}>
                              {children}
                            </Code>
                          );
                        },
                      }}
                      remarkPlugins={[
                        remarkGfm,
                      ]}
                    >
                      {message.message}
                    </Markdown>
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </Box>
        <Flex
          flex="none"
          alignItems="center"
          backgroundColor={colorStyle.background.tertiary}
          borderTop={1}
          borderTopColor={colorStyle.divider}
          px="4x"
          py="4x"
          columnGap="4x"
        >
          <Textarea
            disabled={loading}
            onKeyDown={handleInputKeyDown}
            ref={inputRef}
            autoFocus={false}
            rows={1}
            maxLength={16 * 1024}
            id="userInput"
            name="userInput"
            placeholder={loading? 'Waiting for response...' : 'Type a question about Tonic UI'}
            value={userInput}
            onChange={(event) => {
              const userInputValue = event.target.value;
              track('AICompanion', 'change_user_input', userInputValue);
              setUserInput(userInputValue);
            }}
            resize="vertical"
          />
          <ButtonBase
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={loading ? 'transparent' : 'gray:60'} // TODO: light mode
            borderRadius="circle"
            width="8x"
            height="8x"
            disabled={loading || !userInput}
            onClick={() => {
              const question = userInput;
              ask(question);
            }}
          >
            {loading
              ? <Spinner size="sm" />
              : <Icon icon="send" color={userInput ? colorStyle.color.primary : colorStyle.color.disabled} />}
          </ButtonBase>
        </Flex>
      </ModalContent>
    </Modal>
  );
});

AICompanionModal.displayName = 'AICompanionModal';

export default AICompanionModal;
