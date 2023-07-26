import { Global, css } from '@emotion/react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import {
  Box,
  Button,
  ButtonBase,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Text,
  Textarea,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import AICompanionIcon from '../icons/ai-companion';
import useTrack from '../hooks/useTrack';

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
  const [colorStyle] = useColorStyle();

  return (
    <Box
      backgroundColor={colorStyle.background.tertiary}
      border={1}
      borderColor="gray:60" // TODO: light mode
      borderRadius="circle"
      width="18x"
      height="18x"
      mb="8x"
      {...props}
    />
  );
};

const FeatureCardTitle = (props) => {
  return (
    <Text
      fontSize="sm"
      lineHeight="sm"
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
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState({
    messages: [], // { type: 'userMessage' | 'apiMessage', message: string }
    history: []
  });
  const { messages, pending, history } = messageState;
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

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

    const ctrl = new AbortController();

    fetchEventSource('/openai/api/chat', {
      method: 'POST',
      headers: {
        'Referrer-Policy': 'origin',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        history
      }),
      signal: ctrl.signal,
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
          ctrl.abort();
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
      closeOnOutsideClick
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
        <Box
          pl="6x"
          pr="12x"
          pt="4x"
          pb="3x"
        >
          <Text fontSize="xl" lineHeight="xl">
            Tonic One AI Companion
          </Text>
        </Box>
        <Box
          flex="auto"
          ref={messageListRef}
          height="100%"
          overflowY="auto"
          px="6x"
        >
          <Box mt="4x" mb="6x">
            <Text fontSize="md" lineHeight="md">
              Try out the new features to explore the full capabilities of Tonic One!
            </Text>
          </Box>
          <FeatureCards
            columnGap="4x"
            mb="6x"
          >
            <FeatureCard>
              <FeatureCardAvatar />
              <FeatureCardTitle>
                Real-time Guidance
              </FeatureCardTitle>
              <FeatureCardDescription height="14x">
                Search for any components or keywords and get real-time guidance on how to use them.
              </FeatureCardDescription>
              <Button
                variant="secondary"
                whiteSpace="normal"
                py="2x"
                textAlign="left"
                onClick={(event) => {
                  const question = 'Create an application using Tonic UI';

                  track('AICompanion', 'predefined_input', question);

                  ask(question);
                }}
              >
                Create an application using Tonic UI
              </Button>
            </FeatureCard>
            <FeatureCard>
              <FeatureCardAvatar />
              <FeatureCardTitle>
                Explore UI Patterns
              </FeatureCardTitle>
              <FeatureCardDescription height="14x">
                Explore widely used UI patterns that conform to standard UI behavior.
              </FeatureCardDescription>
              <Button
                variant="secondary"
                whiteSpace="normal"
                py="2x"
                textAlign="left"
                onClick={(event) => {
                  const question = 'Implement a toast in modal example that conforms to UI patterns';

                  track('AICompanion', 'predefined_input', question);

                  ask(question);
                }}
              >
                Implement a toast in modal example that conforms to UI patterns
              </Button>
            </FeatureCard>
            <FeatureCard>
              <FeatureCardAvatar />
              <FeatureCardTitle>
                AI-powered Enhancements
              </FeatureCardTitle>
              <FeatureCardDescription height="14x">
                Paste your code and get AI-powered suggestions to improve your code.
              </FeatureCardDescription>
              <Button
                variant="secondary"
                whiteSpace="normal"
                py="2x"
                textAlign="left"
                onClick={(event) => {
                  const question = `Enhance the code snippet using the recommended best practices.\n* Implement the \`useColorStyle\` Hook to apply color styling.\n* Utilize the \`useTheme\` Hook with pre-defined sizes for consistent sizing.\n* Leverage the \`sx\` prop for styling Tonic UI components.

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

                  ask(question);
                }}
              >
                Enhance the code snippet using the recommended best practices
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
                      <Markdown linkTarget="_blank">
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
                  }}
                >
                  <Box
                    sx={{
                      'p': {
                        margin: 0,
                      },
                    }}
                  >
                    <Markdown linkTarget="_blank">
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
            maxLength={512}
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
