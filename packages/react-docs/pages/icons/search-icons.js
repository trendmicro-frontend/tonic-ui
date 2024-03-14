import {
  Box,
  Divider,
  Flex,
  Grid,
  Icon,
  OverflowTooltip,
  SearchInput,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import * as tmicon from '@trendmicro/tmicon';
import React, { useState } from 'react';

const mapKebabCaseToCapitalizedCamelCase = (str) => {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

const tmicons = tmicon.iconsets.map(group => {
  const icons = tmicon.icons.filter(({ iconset }) => iconset === group.id);
  if (icons.length === 0) {
    return null;
  }
  return { group, icons };
});

const getIcons = (keyword) => tmicons.map(({ group, icons }) => {
  const filteredIcons = icons.filter(({ iconset, name }) => (!keyword || `${name}Icon`.toLowerCase().indexOf(keyword.toLowerCase()) >= 0));
  if (filteredIcons.length === 0) {
    return null
  }
  return { group, icons: filteredIcons }
}
);

const renderIconGroup = (iconSet, keyword, showCharCode, color) => {
  if (!iconSet) {
    return null;
  }

  return (
    <Box key={iconSet.group.name}>
      <Text fontSize="xl">
        {iconSet.group.name}
      </Text>
      <Divider my="4x" />
      <Grid
        gap="4x"
        templateColumns="repeat(auto-fill, minmax(128px, 1fr));"
      >
        {iconSet.icons.map(icon => {
          const displayName = `${mapKebabCaseToCapitalizedCamelCase(icon.name)}Icon`;

          return (
            <Flex
              key={icon.code}
              flexDirection="column"
              alignItems="center"
              rowGap="2x"
            >
              <Icon icon={icon.name} size="6x" />
              <OverflowTooltip label={displayName}>
                {({ ref, style }) => (
                  <Text
                    ref={ref}
                    fontSize="xs"
                    color={color}
                    width="100%"
                    textAlign="center"
                    {...style}
                  >
                    {displayName}
                  </Text>
                )}
              </OverflowTooltip>
            </Flex>
          );
        })}
      </Grid>
    </Box>
  );
};

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [colorStyle] = useColorStyle();
  const color = colorStyle.color.secondary;

  const onChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };

  const onClearInput = (e) => {
    const keyword = '';
    setKeyword(keyword);
  };

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
        rowGap="8x"
        templateRows="1fr"
        transition="all .3s ease-in"
      >
        {getIcons(keyword).map((iconSet) => renderIconGroup(iconSet, keyword, color))}
      </Grid>
    </>
  );
};

export default App;
