import {
  Badge,
  Box,
  Button,
  ButtonBox,
  Divider,
  Flex,
  Link,
  Menu,
  MenuItem,
  MenuList,
  MenuToggle,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import { MoreIcon } from '@tonic-ui/react-icons';
import { useState } from 'react';

const initialActions = [
  {
    id: 'immediate',
    title: 'Immediate action required',
    count: 3,
    badgeColor: 'red:50',
    summary: '3 critical alerts need to be reviewed and triaged right away.',
  },
  {
    id: 'unmanaged',
    title: 'Unmanaged endpoints',
    count: 12,
    badgeColor: 'yellow:50',
    summary: '12 endpoints have been discovered but are not yet protected.',
  },
  {
    id: 'update',
    title: 'Update required',
    count: 8,
    badgeColor: 'yellow:50',
    summary: '8 agents are running an outdated version and should be updated.',
  },
];

const App = () => {
  const [colorStyle] = useColorStyle();
  const [actions, setActions] = useState(initialActions);
  const [selectedId, setSelectedId] = useState(initialActions[0].id);

  const selectedAction = actions.find((action) => action.id === selectedId);

  const handleDismiss = (id) => () => {
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
                <Flex alignItems="center" columnGap="2x" minWidth={0}>
                  <Text>{action.title}</Text>
                  {/*
                    The count sits beside the title for quick recognition. Its
                    color reflects severity: red for critical, yellow for warnings.
                    Yellow needs dark text to stay legible.
                  */}
                  <Badge
                    variant="solid"
                    badgeContent={action.count}
                    backgroundColor={action.badgeColor}
                    color={action.badgeColor === 'yellow:50' ? 'black:primary' : undefined}
                  />
                </Flex>
                {/*
                  A native `<button>` cannot be nested inside another `<button>`.
                  Because the card is a `ButtonBox`, this `Menu` (whose toggle is a
                  real `<button>`) can live inside it.
                */}
                <Menu>
                  {/*
                    Stop the toggle's click on the toggle itself so it never
                    selects the card. `MenuToggle` composes this with its own
                    handler, so the menu still opens.
                  */}
                  <MenuToggle onClick={(event) => event.stopPropagation()}>
                    {({ getMenuToggleProps }) => (
                      <Button
                        {...getMenuToggleProps()}
                        variant="ghost"
                        size="sm"
                        aria-label={`More options for ${action.title}`}
                      >
                        <MoreIcon />
                      </Button>
                    )}
                  </MenuToggle>
                  <MenuList
                    // Render the menu in a portal so it can escape the pane's
                    // bounds, then stop each item's click from bubbling to the
                    // card (which would otherwise select the row).
                    portalled
                    sx={{
                      minWidth: 'max-content',
                    }}
                  >
                    {/*
                      The menu lives in the card's React tree, so a menu item's
                      click bubbles up to the card. Stop it so a menu action
                      never changes which card is selected.
                    */}
                    <MenuItem
                      onClick={(event) => {
                        event.stopPropagation();
                        // A real app would open a settings dialog for this action.
                      }}
                    >
                      Configure
                    </MenuItem>
                    <MenuItem
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDismiss(action.id)();
                      }}
                    >
                      Remove
                    </MenuItem>
                  </MenuList>
                </Menu>
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
