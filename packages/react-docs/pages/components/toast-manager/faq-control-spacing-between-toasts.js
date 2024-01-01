import { Box, Button, Divider, Flex, TextLabel, Toast, ToastManager, useToastManager } from '@tonic-ui/react';
import React, { useRef, useState } from 'react';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const ToastApp = () => {
  const counterRef = useRef(0);
  const toast = useToastManager();
  const placement = 'bottom-right';
  const isTop = placement.includes('top');

  return (
    <Button
      onClick={() => {
        const render = ({ data, onClose, placement }) => {
          return (
            <Toast isClosable onClose={onClose} minWidth={320}>
              This is a toast message #{data.index + 1}
            </Toast>
          );
        };

        // Remove the oldest toast if there are more than 3 toasts
        const toastsOfPlacement = toast.state[placement];
        if (toastsOfPlacement.length >= 3) {
          const oldestToast = isTop ? toastsOfPlacement[toastsOfPlacement.length - 1] : toastsOfPlacement[0];
          toast.close(oldestToast.id, placement);
        }

        const options = {
          placement: placement,
          duration: 30 * 1000,
          data: { // user-defined data
            index: counterRef.current++,
          },
        };
        toast(render, options);
      }}
    >
      Notify Toast
    </Button>
  );
};

const App = () => {
  const [edgeSpacing, setEdgeSpacing] = useState(16);
  const [toastSpacing, setToastSpacing] = useState(16);

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            The space to the edge of the screen
          </TextLabel>
        </Box>
        <Flex alignItems="center" columnGap="2x" mb="4x">
          <input
            type="range"
            min={0}
            max={64}
            step={4}
            onChange={(event) => {
              const value = parseInt(event.target.value);
              setEdgeSpacing(value);
            }}
            value={edgeSpacing}
          />
          {edgeSpacing}px
        </Flex>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            The space between toasts
          </TextLabel>
        </Box>
        <Flex alignItems="center" columnGap="2x" mb="4x">
          <input
            type="range"
            min={0}
            max={32}
            step={4}
            onChange={(event) => {
              const value = parseInt(event.target.value);
              setToastSpacing(value);
            }}
            value={toastSpacing}
          />
          {toastSpacing}px
        </Flex>
      </FormGroup>
      <Divider my="4x" />
      <ToastManager
        TransitionProps={{
          sx: {
            '[data-toast-placement^="top"] > &:first-of-type': {
              mt: edgeSpacing, // the space to the top edge of the screen
            },
            '[data-toast-placement^="top"] > &:not(:first-of-type)': {
              mt: toastSpacing, // the space between toasts
            },
            '[data-toast-placement^="bottom"] > &:last-of-type': {
              mb: edgeSpacing, // the space to the bottom edge of the screen
            },
            '[data-toast-placement^="bottom"] > &:not(:last-of-type)': {
              mb: toastSpacing, // the space between toasts
            },
            '[data-toast-placement$="left"] > &': {
              ml: edgeSpacing, // the space to the left edge of the screen
            },
            '[data-toast-placement$="right"] > &': {
              mr: edgeSpacing, // the space to the right edge of the screen
            },
          },
        }}
      >
        <ToastApp />
      </ToastManager>
    </>
  );
};

export default App;
