import {
  Box,
  Button,
  ButtonBox,
  Divider,
  Flex,
  Link,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import { CloseSIcon } from '@tonic-ui/react-icons';
import { useState } from 'react';

const initialActions = [
  {
    id: 'immediate',
    title: 'Immediate action required',
    summary: '3 critical alerts need to be reviewed and triaged right away.',
  },
  {
    id: 'unmanaged',
    title: 'Unmanaged endpoints',
    summary: '12 endpoints have been discovered but are not yet protected.',
  },
  {
    id: 'update',
    title: 'Update required',
    summary: '8 agents are running an outdated version and should be updated.',
  },
];

const App = () => {
  const [colorStyle] = useColorStyle();
  const [actions, setActions] = useState(initialActions);
  const [selectedId, setSelectedId] = useState(initialActions[0].id);

  const selectedAction = actions.find((action) => action.id === selectedId);

  const handleDismiss = (id) => (event) => {
    // Prevent the card's onClick from firing when the dismiss button is clicked
    event.stopPropagation();
    const remaining = actions.filter((action) => action.id !== id);
    setActions(remaining);
    if (selectedId === id) {
      // Keep a selection so the detail pane stays populated
      setSelectedId(remaining[0]?.id ?? null);
    }
  };

  const handleRestore = () => {
    setActions(initialActions);
    setSelectedId(initialActions[0].id);
  };

  return (
    <Flex
      border={1}
      borderColor={colorStyle.divider}
      borderRadius="sm"
      height={200}
    >
      {/* Left pane: a list of clickable action cards */}
      <Box width={280} py="2x">
        {actions.length > 0 ? (
          actions.map((action) => {
            const isSelected = action.id === selectedId;
            return (
              // The whole card is clickable, so it is rendered as a `ButtonBox`
              // (`<div role="button">`) instead of a native `<button>`.
              <ButtonBox
                key={action.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                columnGap="2x"
                px="4x"
                py="2x"
                backgroundColor={isSelected ? colorStyle.background.selected : undefined}
                _hover={{
                  backgroundColor: isSelected
                    ? colorStyle.background.selected
                    : colorStyle.background.highlighted,
                }}
                onClick={() => setSelectedId(action.id)}
              >
                <Text>{action.title}</Text>
                {/*
                  A native `<button>` cannot be nested inside another `<button>`.
                  Because the card is a `ButtonBox`, this real `<button>` can live inside it.
                */}
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Dismiss ${action.title}`}
                  onClick={handleDismiss(action.id)}
                >
                  <CloseSIcon />
                </Button>
              </ButtonBox>
            );
          })
        ) : (
          <Flex direction="column" rowGap="3x" alignItems="flex-start" px="4x" py="2x">
            <Text color={colorStyle.color.secondary}>
              You have dismissed every action.
            </Text>
            <Button variant="secondary" size="sm" onClick={handleRestore}>
              Restore actions
            </Button>
          </Flex>
        )}
      </Box>

      <Divider orientation="vertical" />

      {/* Right pane: details for the selected action */}
      <Box flex="auto" px="4x" py="4x">
        {selectedAction ? (
          <Flex direction="column" rowGap="3x" alignItems="flex-start">
            <Text fontSize="lg" lineHeight="lg">
              {selectedAction.title}
            </Text>
            <Text color={colorStyle.color.secondary}>
              {selectedAction.summary}
            </Text>
            <Link href="#">
              View details
            </Link>
          </Flex>
        ) : (
          <Text color={colorStyle.color.secondary}>
            No action selected.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default App;
