import { Global, css } from '@emotion/react';
import {
  Box,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  useTheme,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import InstantSearchInput from './InstantSearchInput';
import InstantSearchRefinementList from './InstantSearchRefinementList';

const x = (value) => JSON.stringify(value);

const InstantSearchModal = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => {
  const theme = useTheme();

  return (
    <Modal
      ref={ref}
      autoFocus
      ensureFocus
      closeOnEsc
      closeOnOutsideClick
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
      >
        <Box p="4x">
          <InstantSearchInput size="lg" placeholder="Search..." />
        </Box>
        <Divider />
        <InstantSearchRefinementList
          onChange={(hit) => {
            /**
             * The function uses the `parent` property of the `hit` object to get the title of the parent refinement,
             * and then uses this title to select a DOM element from #sidenav with a `data-title` attribute that matches the title.
             * If the DOM element has a `data-expanded` attribute with a value of "false", the function simulates a mouse click
             * on the element by creating a new MouseEvent and calling the dispatchEvent method on the element.
             */
            const parentTitle = hit?.parent?.title;
            if (parentTitle) {
              const button = document.querySelector(`#sidenav button[data-title=${x(parentTitle)}]`);
              if (button?.dataset?.expanded === 'false') {
                // Simulate a mouse click on the button
                const event = new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                });
                button.dispatchEvent(event);
              }
            }

            onClose();
          }}
        />
      </ModalContent>
    </Modal>
  );
});

InstantSearchModal.displayName = 'InstantSearchModal';

export default InstantSearchModal;
