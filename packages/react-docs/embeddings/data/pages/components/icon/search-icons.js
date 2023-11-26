import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Grid,
  Icon,
  SearchInput,
  Text,
  useColorMode,
} from '@tonic-ui/react';
import * as tmicon from '@trendmicro/tmicon';
import React, { useState } from 'react';

const tmicons = tmicon.iconsets.map(group => {
  const icons = tmicon.icons.filter(({ iconset }) => iconset === group.id);
  if (icons.length === 0) {
    return null;
  }
  return { group, icons };
});

const getIcons = (keyword) => tmicons.map(({ group, icons }) => {
    const filteredIcons = icons.filter(({ iconset, name }) => (!keyword || name.indexOf(keyword) >= 0));
    if (filteredIcons.length === 0) {
      return null
    }
    return { group, icons: filteredIcons }
  }
);

const FlexItem = (props) => (
  <Box {...props} />
);

const renderIconGroup = (iconSet, keyword, showCharCode, color) => {
  if (!iconSet) {
    return null;
  }

  return (
    <Box key={iconSet.group.name}>
      <FlexItem pt={iconSet.group.id !== 0 && '2x'}>
        <Text fontSize={"2xl"}>{iconSet.group.name}</Text>    
      </FlexItem>
      <Grid
        gap="2x"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr));"
        p="4x"
        pl="6x"
        pr="4x"
      >
        {iconSet.icons.map(icon => (
          <Flex flexDirection="row" alignItems="center" pb={0} pr={0} overflow="hidden" key={icon.code}>
            <FlexItem flex="initial" pr="2x">
              <Icon icon={icon.name}/>
            </FlexItem>
            <FlexItem flex="none" pr="2x">
              <Text fontSize={"md"} color={color}>
                {icon.name}
              </Text>
            </FlexItem>
            {showCharCode && <FlexItem flex="none" pr="1x" color={color}>
              <Text fontSize={"md"}>
                {`(&#x${icon.code})`}
              </Text>
            </FlexItem>
            }
            <FlexItem flex="none" pb="1x">
              {icon.new && <Badge backgroundColor="green" badgeContent={"new"} />}
            </FlexItem>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [showCharCode, setShowCharCode] = useState(false);
  const [colorMode] = useColorMode();
  const color = {
    light: 'black:secondary',
    dark: 'white:secondary',
  }[colorMode];

  const onChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };

  const onClearInput = (e) => {
    const keyword = '';
    setKeyword(keyword);
  };

  const onChecked = () => {
    setShowCharCode(!showCharCode);
  }

  return (
    <>
      <Flex flexDirection="row" alignItems="center" position="relative">
        <Box pl="4x">
          <SearchInput
            fontSize="md"
            placeholder="Search"
            onChange={onChange}
            onClearInput={onClearInput}
            width={430}
          />
        </Box>
        <Box position="absolute" right="5px">
          <Checkbox
            size="md"
            onChange={() => onChecked()}>
            Display character codes
          </Checkbox>
        </Box>
      </Flex>
      <Grid
        gap={0}
        templateRows="1fr"
        p="4x"
        transition="all .3s ease-in"
      >
        {getIcons(keyword).map((iconSet) => renderIconGroup(iconSet, keyword, showCharCode, color))}
      </Grid>
    </>
  );
};

export default App;
