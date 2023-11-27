import { Global, css } from '@emotion/react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import {
  Box,
  Button,
  ButtonBase,
  Code,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import useClipboard from '../hooks/useClipboard';
import AICompanionIcon from '../icons/ai-companion';
import useTrack from '../hooks/useTrack';
import CodeSandboxIcon from '../icons/codesandbox';
import RealTimeGuidanceSVG from '../icons/real-time-guidance.svg';
import AIPoweredEnhancementsSVG from '../icons/ai-powered-enhancements.svg';
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
  const { onCopy: copySource } = useClipboard(code);
  const handleClickCopySource = useCallback(() => {
    const context = ref.current;
    copySource(code, context);
  }, [copySource]);
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

  const ask = async (question) => {
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
    const apiPath = BASE_PATH + '/api/chat';

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

  const chatMessages = useMemo(() => {
    return [
      ...messages,
      ...(pending ? [{ type: 'apiMessage', message: pending }] : [])
    ];
  }, [messages, pending]);

  return (
    <Modal
      ref={ref}
      autoFocus
      ensureFocus
      closeOnEsc
      isClosable
      isOpen
      onClose={onClose}
      size="lg"
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
          >
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
                <RealTimeGuidanceSVG />
              </FeatureCardAvatar>
              <FeatureCardTitle>
                Real-time Guidance
              </FeatureCardTitle>
              <FeatureCardDescription height="14x">
                Search for any components or keywords and get real-time guidance on how to use them.
              </FeatureCardDescription>
              <Stack spacing="2x">
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
              </Stack>
            </FeatureCard>
            <FeatureCard>
              <FeatureCardAvatar>
                <AIPoweredEnhancementsSVG />
              </FeatureCardAvatar>
              <FeatureCardTitle>
                AI-powered Enhancements
              </FeatureCardTitle>
              <FeatureCardDescription height="14x">
                Paste your code and get AI-powered suggestions to improve your code.
              </FeatureCardDescription>
              <Button
                variant="secondary"
                onClick={(event) => {
                  const question = `Enhance the code with the recommended best practices.\n* Implement the \`useColorStyle\` Hook to apply color styling.\n* Utilize the \`useTheme\` Hook with pre-defined sizes for consistent sizing.\n* Leverage the \`sx\` prop for styling Tonic UI components.

\`\`\`jsx
<Box
  style={{
    width: '8x',
    height: '8x',
    backgroundColor: 'gray:90', // secondary background
  }}
/>
\`\`\`
                  `;

                  track('AICompanion', 'predefined_input', question);

                  resetState();

                  ask(question);
                }}
                sx={{
                  columnGap: '2x',
                }}
              >
                <Icon icon="upload" />
                Upload your code
              </Button>
            </FeatureCard>
          </FeatureCards>
          {chatMessages.map((message, index) => {
            if (message.type === 'userMessage') {
              return (
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
                  <AICompanionIcon size="8x" />
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
