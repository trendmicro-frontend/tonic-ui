import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Flex,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  OverflowTooltip,
  SearchInput,
  Text,
  useColorMode,
  useColorStyle,
  usePortalManager,
} from '@tonic-ui/react';
import * as icons from '@tonic-ui/react-icons';
import React, { useState } from 'react';

const Semibold = (props) => <Text display="inline-block" fontWeight="semibold" {...props} />

const IconView = ({ component: IconComponent, name, ...rest }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle();
  const portal = usePortalManager();
  const deprecatedTextColor = {
    dark: 'yellow:50',
    light: 'yellow:50',
  }[colorMode];
  const handleClick = (e) => {
    portal((onClose) => (
      <Modal
        closeOnEsc
        closeOnOutsideClick
        isClosable
        isOpen
        onClose={onClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {IconComponent._isDeprecated
              ? <Text color={deprecatedTextColor}>{name} (deprecated)</Text>
              : <Text>{name}</Text>
            }
          </ModalHeader>
          <ModalBody px={0}>
            {IconComponent._isDeprecated && (
              <Flex
                alignItems="center"
                columnGap="2x"
                px="5x"
                py="3x"
                mb="4x"
                color={deprecatedTextColor}
              >
                <Alert variant="outline" severity="warning">
                  <Text>The <Semibold>{name}</Semibold> component is deprecated and will be removed in the next major release. Use <Semibold>{IconComponent.displayName}</Semibold> instead.</Text>
                </Alert>
              </Flex>
            )}
            <Box
              backgroundColor={colorStyle.background.tertiary}
              px="5x"
              py="3x"
              mb="6x"
            >
              <Text fontFamily="mono" fontSize="md" lineHeight="md">
                {IconComponent._isDeprecated
                  ? `import { ${IconComponent.displayName} } from '@tonic-ui/react-icons';`
                  : `import { ${name} } from '@tonic-ui/react-icons';`
                }
              </Text>
            </Box>
            <Flex
              width="100%"
              justifyContent="center"
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                outline={1}
                outlineColor={colorMode === 'dark' ? 'rgb(89, 89, 89)' : 'rgb(230, 230, 230)'}
                width={160}
                height={160}
                backgroundSize="20px 20px"
                backgroundColor="transparent"
                backgroundPosition="0px 0px, 0px 10px, 10px -10px, -10px 0px"
                backgroundImage={colorMode === 'dark'
                  ? [
                      'linear-gradient(45deg, rgb(89, 89, 89) 25%, transparent 25%)',
                      'linear-gradient(-45deg, rgb(89, 89, 89) 25%, transparent 25%)',
                      'linear-gradient(45deg, transparent 75%, rgb(89, 89, 89) 75%)',
                      'linear-gradient(-45deg, transparent 75%, rgb(89, 89, 89) 75%)',
                    ].join(',')
                  : [
                      'linear-gradient(45deg, rgb(230, 230, 230) 25%, transparent 25%)',
                      'linear-gradient(-45deg, rgb(230, 230, 230) 25%, transparent 25%)',
                      'linear-gradient(45deg, transparent 75%, rgb(230, 230, 230) 75%)',
                      'linear-gradient(-45deg, transparent 75%, rgb(230, 230, 230) 75%)',
                    ].join(',')
                }
            >
                <IconComponent size={160} />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    ));
  };

  return (
    <Box {...rest}>
      <Flex
        flexDirection="column"
        alignItems="center"
        rowGap="2x"
      >
        <ButtonBase
          width={60}
          height={60}
          border={1}
          borderColor="transparent"
          borderRadius="sm"
          color={colorStyle.color.secondary}
          _hover={{
            borderColor: 'blue:60',
            color: colorStyle.color.primary,
          }}
          onClick={handleClick}
        >
          <IconComponent size="6x" />
        </ButtonBase>
        <OverflowTooltip label={name}>
          {({ ref, style }) => (
            <Text
              ref={ref}
              fontFamily="mono"
              fontSize="xs"
              width="100%"
              color={colorStyle.color.secondary}
              textAlign="center"
              {...style}
            >
              {IconComponent._isDeprecated
                ? <Text color={deprecatedTextColor}>
                    {name}<br/>(deprecated)
                  </Text>
                : name
              }
            </Text>
          )}
        </OverflowTooltip>
      </Flex>
    </Box>
  );
};

const App = () => {
  const [keyword, setKeyword] = useState('');
  const onChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };
  const onClearInput = (e) => {
    const keyword = '';
    setKeyword(keyword);
  };

  const lcKeyword = keyword.toLowerCase();
  const exclusions = ['SVGIcon', 'createSVGIcon'];
  const filteredIcons = Object.keys(icons)
    .filter(iconName => !exclusions.includes(iconName))
    .filter(iconName => {
      const lcIconName = iconName.toLowerCase();
      return !lcKeyword || lcIconName.indexOf(lcKeyword) >= 0;
    })
    .map(iconName => ({
      component: icons[iconName],
      name: iconName,
    }));

  return (
    <>
      <Box mb="8x">
        <SearchInput
          fontSize="md"
          placeholder="Search"
          onChange={onChange}
          onClearInput={onClearInput}
          width={480}
        />
      </Box>
      <Grid
        gap="4x"
        templateColumns="repeat(auto-fill, minmax(128px, 1fr));"
      >
        {filteredIcons.map(({ component, name }) => (
          <IconView
            key={name}
            component={component}
            name={name}
          />
        ))}
      </Grid>
    </>
  );
};

export default App;
