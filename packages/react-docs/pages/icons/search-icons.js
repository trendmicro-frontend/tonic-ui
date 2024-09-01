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
  const isDeprecated = IconComponent._isDeprecated;
  const deprecatedTextColor = {
    dark: 'yellow:50',
    light: 'yellow:50',
  }[colorMode];
  const bitmapGridSize = 16;
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
            {isDeprecated
              ? <Text color={deprecatedTextColor}>{name} (deprecated)</Text>
              : <Text>{name}</Text>
            }
          </ModalHeader>
          <ModalBody px={0}>
            {isDeprecated && (
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
                {isDeprecated
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
                width={bitmapGridSize * 16}
                height={bitmapGridSize * 16}
                backgroundSize={`${bitmapGridSize * 2}px ${bitmapGridSize * 2}px`}
                backgroundColor="transparent"
                backgroundPosition={`0px 0px, 0px ${bitmapGridSize}px, ${bitmapGridSize}px -${bitmapGridSize}px, -${bitmapGridSize}px 0px`}
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
                <IconComponent size={bitmapGridSize * 16} />
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
          width={64}
          height={64}
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
        <OverflowTooltip
          label={(
            <Text fontFamily="mono">
              {isDeprecated ? `${name} (deprecated)` : name}
            </Text>
          )}
        >
          {({ ref, style }) => (
            <Text
              ref={ref}
              fontFamily="mono"
              width="100%"
              color={isDeprecated ? deprecatedTextColor : colorStyle.color.secondary}
              textAlign="center"
              {...style}
            >
              {isDeprecated ? <>{name}<br />(deprecated)</> : name}
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
    }))
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

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
