import {
  Accordion,
  AccordionItem,
  AccordionToggle,
  AccordionToggleIcon,
  AccordionContent,
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useMergeRefs,
} from '@tonic-ui/react-hooks';
import {
  CloseIcon,
} from '@tonic-ui/react-icons';
import { ensureString } from 'ensure-type';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, useEffect, useRef } from 'react';
import { routes } from '../config/sidebar-routes';
import x from '../utils/json-stringify';
import IconButton from './IconButton';
import NavLink from './NavLink';

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

const BASE_PATH = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

const Sidebar = forwardRef((
  {
    children,
    onClick,
    onClose,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const router = useRouter();
  const currentPath = ensureString(router.pathname).slice(1);
  const borderColor = {
    light: 'gray:20',
    dark: 'gray:70',
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
      id="sidenav"
      ref={combinedRef}
      backgroundColor={colorStyle.background.primary}
      borderRight={1}
      borderRightColor={borderColor}
      pt={{
        sm: 0,
        lg: '4x',
      }}
      pb="4x"
      {...rest}
    >
      <Box
        display={{
          sm: 'block',
          lg: 'none',
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mb="4x"
        >
          <NextLink href={'/'} legacyBehavior passHref>
            <Link
              background="transparent"
              color={colorStyle.color.primary}
              fontSize="xl"
              lineHeight="lg"
              outline="none"
              px="4x"
              py="2x"
              textDecoration="none"
              _active={{
                color: colorStyle.color.emphasis,
              }}
              _hover={{
                color: colorStyle.color.emphasis,
              }}
              _visited={{
                color: colorStyle.color.primary,
              }}
            >
              <Image
                alt=""
                src={`${BASE_PATH}/images/${logo}`}
                height="8x"
                  marginRight="2x"
                />
                <Text>Tonic UI</Text>
            </Link>
          </NextLink>
          <Box px="2x">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Flex>
      </Box>
      <Accordion>
        {routes.map(({ title: sectionTitle, icon, routes }) => {
          const defaultIsExpanded = routes.some((route) => {
            if (!route.path) {
              return false;
            }

            return currentPath.startsWith(route.path) || (route.path === currentPath);
          });

          return (
            <Box
              key={sectionTitle}
            >
              <AccordionItem
                key={defaultIsExpanded} // Update the key when `defaultIsExpanded` changes to ensure the component re-renders
                defaultIsExpanded={defaultIsExpanded}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionToggle
                      data-track={isExpanded
                        ? `SideMenu|close_menu_section|${x({ title: sectionTitle })}`
                        : `SideMenu|open_menu_section|${x({ title: sectionTitle })}`
                      }
                      // The following data attributes are used by the instant search to toggle and scroll to the correct accordion section
                      data-expanded={isExpanded}
                      data-title={sectionTitle}
                    >
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        py="2x"
                        px="3x"
                        _hover={{
                          backgroundColor: colorStyle.background.highlighted,
                        }}
                      >
                        <Flex
                          alignItems="center"
                          columnGap="2x"
                        >
                          {(typeof icon === 'function') && (
                            icon({
                              color: colorStyle?.color?.tertiary,
                              size: '4x',
                            })
                          )}
                          <Text
                            color={colorStyle?.color?.primary}
                            fontSize="sm"
                            lineHeight="sm"
                          >
                            {sectionTitle}
                          </Text>
                        </Flex>
                        <AccordionToggleIcon />
                      </Flex>
                    </AccordionToggle>
                    <AccordionContent
                      TransitionProps={{
                        unmountOnExit: true,
                      }}
                    >
                      {routes.map(({ heading, title, path, render }) => {
                        if (heading) {
                          return (
                            <Text
                              key={`${sectionTitle} > ${title}`}
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
                        const navigateTo = `/${path}`;

                        return (
                          <NavLink
                            key={path}
                            data-path={path}
                            data-track={`SideMenu|click_menu_item|${x({ path: navigateTo, title: [sectionTitle, title].join(' > ') })}`}
                            isActive={isActive}
                            href={navigateTo}
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
                    </AccordionContent>
                  </>
                )}
              </AccordionItem>
            </Box>
          );
        })}
      </Accordion>
      {children}
    </Box>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
