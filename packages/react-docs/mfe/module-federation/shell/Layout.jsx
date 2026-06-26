import {
  Box,
  ButtonBox,
  Flex,
  Text,
} from '@tonic-ui/react';
import {
  TaskListOIcon,
  WindowListIcon,
} from '@tonic-ui/react-icons';

const MENU_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: WindowListIcon },
  { key: 'inventory', label: 'Inventory', icon: TaskListOIcon },
];

function SideMenuItem({ item, isActive, onSelect }) {
  const Icon = item.icon;

  return (
    <ButtonBox
      aria-current={isActive ? 'page' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '2x',
        width: '100%',
        px: '3x',
        py: '2x',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: 'sm',
        backgroundColor: isActive ? 'actions.selected' : 'transparent',
        color: isActive ? 'text.accent' : 'text.secondary',
        _hover: {
          backgroundColor: isActive ? 'actions.selectedHovered' : 'actions.hovered',
        },
      }}
      onClick={() => onSelect(item.key)}
    >
      <Icon />
      <Text>{item.label}</Text>
    </ButtonBox>
  );
}

function Layout({ label, activeView, onSelectView, children }) {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.low',
        color: 'text.primary',
      }}
    >
      <Flex
        as="header"
        sx={{
          alignItems: 'center',
          columnGap: '3x',
          px: '4x',
          py: '3x',
          borderBottom: 1,
          borderColor: 'border.secondary',
          backgroundColor: 'background.high',
        }}
      >
        <Text
          sx={{
            fontSize: 'md',
            fontWeight: 'bold',
          }}
        >
          {label}
        </Text>
      </Flex>
      <Flex flex="auto" minHeight={0}>
        <Box
          as="nav"
          sx={{
            width: 180,
            flex: 'none',
            borderRight: 1,
            borderColor: 'border.secondary',
            backgroundColor: 'background.high',
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
            }}
          >
            {MENU_ITEMS.map((item) => (
              <SideMenuItem
                key={item.key}
                item={item}
                isActive={activeView === item.key}
                onSelect={onSelectView}
              />
            ))}
          </Flex>
        </Box>
        <Box
          as="main"
          sx={{
            flex: 'auto',
            minWidth: 0,
            minHeight: 0,
            overflowY: 'auto',
          }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default Layout;
