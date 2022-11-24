import {
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionToggleIcon,
  AccordionCollapse,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, useEffect, useRef } from 'react';
import IconButton from './IconButton';
import NavLink from './NavLink';
import { routes } from '../config/sidebar-routes';
import useForkRef from '../hooks/useForkRef';

const isElementInViewport = (el) => {
  if (!el) {
    return false;
  }

  const rect = el.getBoundingClientRect();
  return (
    rect?.top >= 0 &&
    rect?.left >= 0 &&
    rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
    rect?.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
};

const BASE_PATH = ensureString(process.env.BASE_PATH);

const Sidebar = forwardRef((
  {
    onClick,
    onClose,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const nodeRef = useRef();
  const combinedRef = useForkRef(nodeRef, ref);
  const router = useRouter();
  const currentPath = ensureString(router.pathname).slice(1);
  const backgroundColor = {
    light: 'white',
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20',
    dark: 'gray:70',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];
  const logo = {
    light: 'tonic-logo-light.svg',
    dark: 'tonic-logo-dark.svg',
  }[colorMode];

  useEffect(() => {
    const sidebar = nodeRef.current;
    const el = sidebar.querySelector(`[data-path="${currentPath}"]`);
    if (el && !isElementInViewport(el)) {
      el.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }
  }, [currentPath]);

  return (
    <Box
      as="nav"
      ref={combinedRef}
      backgroundColor={backgroundColor}
      borderRight={1}
      borderRightColor={borderColor}
      pt={{
        sm: 0,
        md: '4x',
      }}
      pb="4x"
      {...rest}
    >
      <Box
        display={{
          sm: 'block',
          md: 'none',
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mb="4x"
        >
          <Box px="4x" py="2x">
            <NextLink href={'/'} legacyBehavior passHref>
              <Box
                as="a"
                display="flex"
                alignItems="center"
                flex="auto"
                fontSize="xl"
                maxWidth="100%"
                color={fontColor}
                outline="none"
                textDecoration="none"
              >
                <Image
                  alt=""
                  src={`${BASE_PATH}/images/${logo}`}
                  height="8x"
                  marginRight="2x"
              />
                <Text>Tonic UI</Text>
              </Box>
            </NextLink>
          </Box>
          <Box px="2x">
            <IconButton onClick={onClose}>
              <Icon icon="close" />
            </IconButton>
          </Box>
        </Flex>
      </Box>
      <Accordion>
        {routes.map(({ title, icon, path, routes }) => {
          const isExpanded = currentPath.startsWith(path);

          return (
            <Box
              key={path}
              data-path={path}
              mb="4x"
              _lastOfType={{
                mb: 0,
              }}
            >
              <AccordionItem
                defaultIsExpanded={isExpanded}
              >
                <AccordionToggle>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    px="3x"
                  >
                    <Flex
                      alignItems="center"
                      columnGap="2x"
                    >
                      {(typeof icon === 'function')
                        ? icon({
                            color: colorStyle?.color?.tertiary,
                            size: '4x',
                          })
                        : <Icon
                            icon={icon}
                            color={colorStyle?.color?.tertiary}
                            size="4x"
                          />
                      }
                      <Text
                        color={colorStyle?.color?.primary}
                        fontSize="sm"
                        lineHeight="sm"
                      >
                        {title}
                      </Text>
                    </Flex>
                    <AccordionToggleIcon />
                  </Flex>
                </AccordionToggle>
                <AccordionCollapse
                  TransitionProps={{
                    unmountOnExit: true,
                  }}
                >
                  {routes.map(({ heading, title, path, render }) => {
                    if (heading) {
                      return (
                        <Text
                          key={title}
                          color={colorStyle?.color?.tertiary}
                          fontSize="xs"
                          lineHeight="xs"
                          pl="9x"
                          mt="4x"
                          mb="2x"
                          textTransform="uppercase"
                          letterSpacing="0.08rem"
                          _firstOfType={{
                            mt: '2x',
                          }}
                        >
                          {title}
                        </Text>
                      );
                    }

                    const isActive = (currentPath === path);

                    return (
                      <NavLink
                        key={path}
                        data-path={path}
                        isActive={isActive}
                        href={`/${path}`}
                        onClick={onClick}
                        pl={0}
                        px="3x"
                      >
                        <Flex
                          columnGap="2x"
                          alignItems="center"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Text
                            fontSize="sm"
                            lineHeight="sm"
                            pl="9x"
                          >
                            {title}
                          </Text>
                          {(typeof render === 'function') && render()}
                        </Flex>
                      </NavLink>
                    );
                  })}
                </AccordionCollapse>
              </AccordionItem>
            </Box>
          );
        })}
      </Accordion>
    </Box>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
