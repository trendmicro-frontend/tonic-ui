import {
  Badge,
  Box,
  ButtonBase,
  Divider,
  Flex,
  Image,
  Menu,
  MenuContent,
  MenuToggle,
  Scrollbar,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { AlertIcon, ClockIcon } from '@tonic-ui/react-icons';
import { useEffectOnce, useToggle } from '@tonic-ui/react-hooks';
import { formatDistance, formatISO, startOfToday, subDays, subMinutes, subSeconds } from 'date-fns';
import { ensureString } from 'ensure-type';
import React, { useEffect } from 'react';

const BASE_PATH = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

const notifications = [
  {
    id: 1,
    seen: true,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-highlight.svg`} />
    ),
    message: (
      <Text>
        Place your highlight message here.
      </Text>
    ),
    time: startOfToday(subDays(new Date(), 2)).getTime(),
  },
  {
    id: 2,
    seen: false,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-success.svg`} />
    ),
    message: (
      <Text>
        Place your success message here.
      </Text>
    ),
    time: subSeconds(new Date(), 30).getTime(),
  },
  {
    id: 3,
    seen: false,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-error.svg`} />
    ),
    message: (
      <Text>
        Place your error message here.
      </Text>
    ),
    time: subMinutes(new Date(), 5).getTime(),
  },
  {
    id: 4,
    seen: false,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-warning.svg`} />
    ),
    message: (
      <Text>
        Place your warning message here.
      </Text>
    ),
    time: subMinutes(new Date(), 30).getTime(),
  },
  {
    id: 5,
    seen: false,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-info.svg`} />
    ),
    message: (
      <Text>
        Place your info message here.
      </Text>
    ),
    time: subMinutes(new Date(), 60).getTime(),
  },
];

const tasks = [
  {
    id: 1,
    seen: false,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-progress.svg`} />
    ),
    message: (
      <Stack spacing="1x">
        <Text fontSize="sm" lineHeight="sm">
          Place your progessive message here.
        </Text>
        <Text fontSize="xs" lineHeight="xs">
          Pending
        </Text>
      </Stack>
    ),
    time: subSeconds(new Date(), 10).getTime(),
  },
  {
    id: 2,
    seen: false,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-success.svg`} />
    ),
    message: (
      <Stack spacing="1x">
        <Text fontSize="sm" lineHeight="sm">
          Place your success message here.
        </Text>
        <Text fontSize="xs" lineHeight="xs">
          Successful
        </Text>
      </Stack>
    ),
    time: subMinutes(new Date(), 5).getTime(),
  },
  {
    id: 3,
    seen: false,
    icon: (
      <Image alt="" src={`${BASE_PATH}/images/patterns/notification/icon-notification-error.svg`} />
    ),
    message: (
      <Stack spacing="1x">
        <Text fontSize="sm" lineHeight="sm">
          Place your error message here.
        </Text>
        <Text fontSize="xs" lineHeight="xs">
          Unsuccessful
        </Text>
      </Stack>
    ),
    time: subMinutes(new Date(), 30).getTime(),
  },
];

const App = () => {
  const [colorStyle] = useColorStyle();
  const styleProps = {
    backgroundColor: colorStyle.background.primary,
    height: 480,
  };

  return (
    <Box
      {...styleProps}
    >
      <NavigationBar />
      <Box p="4x">
        <Text fontSize="xl" lineHeight="xl">
          Home
        </Text>
      </Box>
    </Box>
  );
};

const NavigationBar = (props) => {
  const [isNotificationCenterOpen, toggleIsNotificationCenterOpen] = useToggle(false);
  const [colorStyle] = useColorStyle();
  const styleProps = {
    backgroundColor: colorStyle.background.secondary,
    height: '12x',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, []);

  const notificationUnreadCount = notifications.filter(x => !x.seen).length;
  const taskUnreadCount = tasks.filter(x => !x.seen).length;
  const unreadCount = notificationUnreadCount + taskUnreadCount;

  useEffectOnce(() => {
    toggleIsNotificationCenterOpen(true);
  });

  return (
    <Flex
      {...styleProps}
      {...props}
    >
      <Flex alignItems="center" ml="5x">
        <Text fontSize="2xl" lineHeight="2xl">
          Product Name
        </Text>
        <Divider orientation="vertical" height="5x" mx="2x" />
        <Text fontSize="sm" lineHeight="sm">
          Home
        </Text>
      </Flex>
      <Flex height="100%">
        <NavItem columnGap="2x">
          <ClockIcon />
          <Text>{date.toLocaleDateString()}</Text>
          <Text>{date.toLocaleTimeString()}</Text>
        </NavItem>
        <NavItemDivider />
        <Menu
          isOpen={isNotificationCenterOpen}
          onClose={() => toggleIsNotificationCenterOpen(false)}
          onOpen={() => toggleIsNotificationCenterOpen(true)}
          closeOnBlur={false}
          placement="bottom-end"
          offset={[0, 1]}
        >
          <MenuToggle>
            <NavItem
              as={Box}
              aria-selected={isNotificationCenterOpen}
            >
              <Badge badgeContent={unreadCount}>
                <AlertIcon />
              </Badge>
            </NavItem>
          </MenuToggle>
          <MenuContent>
            <NotificationCenter
              sx={{
                width: 480,
              }}
            />
          </MenuContent>
        </Menu>
      </Flex>
    </Flex>
  );
};

const NavItem = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const styleProps = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: colorStyle.background.secondary,
    px: '4x',
    height: '100%',
    _hover: {
      backgroundColor: colorStyle.background.highlighted,
    },
    _selected: {
      backgroundColor: colorStyle.background.selected,
    },
  };

  return (
    <ButtonBase
      {...styleProps}
      {...props}
    />
  );
};

const NavItemDivider = (props) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:100',
    light: 'gray:20',
  }[colorMode];
  const styleProps = {
    borderColor,
    height: '100%',
  };

  return (
    <Divider
      orientation="vertical"
      {...styleProps}
      {...props}
    />
  );
};

const NotificationCenter = (props) => {
  const [colorStyle] = useColorStyle();
  const tabStyleProps = {
    backgroundColor: colorStyle.background.secondary,
    fontSize: 'sm',
    lineHeight: 'sm',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: '3x',
    py: '10q',
    _selected: {
      backgroundColor: colorStyle.background.tertiary,
    },
  };
  const tabPanelStyleProps = {
    backgroundColor: colorStyle.background.tertiary,
  };
  const now = new Date().getTime();
  const notificationUnreadCount = notifications.filter(x => !x.seen).length;
  const taskUnreadCount = tasks.filter(x => !x.seen).length;

  return (
    <Tabs
      orientation="horizontal"
      variant="unstyled"
      {...props}
    >
      <TabList
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <Tab {...tabStyleProps}>
          <Text>Notifications ({notificationUnreadCount})</Text>
        </Tab>
        <Tab {...tabStyleProps}>
          <Text>Tasks ({taskUnreadCount})</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          {...tabPanelStyleProps}
        >
          {notifications.length === 0 && (
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height={360}
            >
              <Box mb="3x">
                <Image alt="" src={`${BASE_PATH}/images/patterns/notification/notification-empty-content.svg`} />
              </Box>
              <Text color={colorStyle.color.tertiary}>
                No notifications to display
              </Text>
            </Flex>
          )}
          {notifications.length > 0 && (
            <Scrollbar
              height={360}
              overflowY="visible"
            >
              {notifications.map((notification) => (
                <NotificationCenterItem key={notification.id}>
                  <Flex columnGap="2x">
                    <Box
                      position="relative"
                      width="9x"
                    >
                      {!notification.seen && (
                        <Box
                          position="absolute"
                          top={15}
                          left={-10}
                          width={5}
                          height={5}
                          borderRadius="50%"
                          backgroundColor="cyan:30"
                        />
                      )}
                      {notification.icon}
                    </Box>
                    <Box>
                      <Box mb="3x">
                        {notification.message}
                      </Box>
                      {!!notification.time && (
                        <Text color={colorStyle.color.secondary}>
                          {formatDistance(notification.time, now, { addSuffix: true })}
                          {' '}
                          {`(${formatISO(notification.time)})`}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </NotificationCenterItem>
              ))}
            </Scrollbar>
          )}
        </TabPanel>
        <TabPanel
          {...tabPanelStyleProps}
        >
          {tasks.length === 0 && (
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height={360}
            >
              <Box mb="3x">
                <Image alt="" src={`${BASE_PATH}/images/patterns/notification/notification-empty-content.svg`} />
              </Box>
              <Text color={colorStyle.color.tertiary}>
                No tasks to display
              </Text>
            </Flex>
          )}
          {tasks.length > 0 && (
            <Scrollbar
              height={360}
              overflowY="visible"
            >
              {tasks.map((task) => (
                <NotificationCenterItem key={task.id}>
                  <Flex columnGap="2x">
                    <Box
                      position="relative"
                      width="9x"
                    >
                      {!task.seen && (
                        <Box
                          position="absolute"
                          top={15}
                          left={-10}
                          width={5}
                          height={5}
                          borderRadius="50%"
                          backgroundColor="cyan:30"
                        />
                      )}
                      {task.icon}
                    </Box>
                    <Box>
                      <Box mb="3x">
                        {task.message}
                      </Box>
                      {!!task.time && (
                        <Text color={colorStyle.color.secondary}>
                          {formatDistance(task.time, now, { addSuffix: true })}
                          {' '}
                          {`(${formatISO(task.time)})`}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </NotificationCenterItem>
              ))}
            </Scrollbar>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const NotificationCenterItem = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const borderColor = {
    dark: 'gray:100',
    light: 'gray:20',
  }[colorMode];
  const styleProps = {
    backgroundColor: colorStyle.background.tertiary,
    borderBottom: 1,
    borderBottomColor: borderColor,
    px: '4x',
    py: '4x',
    textAlign: 'left',
    width: '100%',
    _hover: {
      backgroundColor: colorStyle.background.highlighted,
    },
  };

  return (
    <ButtonBase
      {...styleProps}
      {...props}
    />
  );
};

export default App;
