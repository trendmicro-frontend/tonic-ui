import { Global, css } from '@emotion/react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import {
  Box,
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
import useTrack from '../hooks/useTrack';
import OpenAIIcon from '../icons/openai';
//import x from '../utils/json-stringify';

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
    messages: [{
      type: 'apiMessage',
      message: 'Hi, how can I help you?',
    }],
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const question = userInput.trim();
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
        handleSubmit(event);
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
      size="md"
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
        marginTop="12x"
        maxHeight={`calc(100vh - ${theme?.space['12x']} - ${theme?.space['12x']})`}
        minHeight={null}
      >
        <Text
          sx={{
            px: '6x',
            py: '3x',
            fontSize: 'xl',
            lineHeight: 'xl',
          }}
        >
          Tonic One - AI Companion
        </Text>
        <Flex
          position="relative"
          alignItems="center"
          ml="6x"
          mr="6x"
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
            placeholder={loading? 'Waiting for response...' : 'Type your question...'}  
            value={userInput} 
            onChange={(event) => {
              const userInputValue = event.target.value;
              track('AICompanion', 'change_user_input', userInputValue);
              setUserInput(userInputValue);
            }}
          />
          <Box
            position="absolute"
            right="3x"
            top="2x"
          >
            <ButtonBase
              disabled={loading || !userInput}
            >
              {loading
                ? <Spinner size="xs" />
                : <Icon icon="send" color={userInput ? colorStyle.color.primary : colorStyle.color.disabled} />}
            </ButtonBase>
          </Box>
        </Flex>
        <Box
          ref={messageListRef}
          overflowY="auto"
        >
          {chatMessages.map((message, index) => {
            const backgroundColor = (message.type === 'apiMessage')
              ? colorStyle.background.secondary
              : colorStyle.background.tertiary;
            const icon = (message.type === 'apiMessage')
              ? <OpenAIIcon size={16} />
              : <Icon icon="user" />;
            //const isPending = loading && index === chatMessages.length - 1;

            return (
              <Flex
                key={index}
                sx={{
                  alignItems: 'center',
                  columnGap: '4x',
                  backgroundColor,
                  px: '6x',
                  py: '6x',
                }}
              >
                {icon}
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
            );
          })}
        </Box>
      </ModalContent>
    </Modal>
  );
});

AICompanionModal.displayName = 'AICompanionModal';

export default AICompanionModal;
