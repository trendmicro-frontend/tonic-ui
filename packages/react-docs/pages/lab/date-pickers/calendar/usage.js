import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Divider,
  Flex,
  Input,
  LinkButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  TextLabel,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  Calendar,
} from '@tonic-ui/react-lab';
import * as dateFns from 'date-fns'
import * as dateFnsLocale from 'date-fns/locale'
import React, { useEffect, useState } from 'react';

const CodeBlock = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      backgroundColor={colorStyle.background.secondary}
      border={1}
      borderColor={colorStyle.divider}
      fontFamily="mono"
      py="3x"
      px="3x"
      whiteSpace="pre"
      {...props}
    />
  );
};

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const firstDayOfWeekOptions = [
  0, // Sunday
  1, // Monday
  2, // Tuesday
  3, // Wednesday
  4, // Thursday
  5, // Friday
  6, // Saturday
];

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const mapDateOptionToDateObject = (dateOption) => ({
  'none': null,
  'today': new Date(),
  'invalid': new Date(''),
}[dateOption]);

const disableWeekdays = (date) => {
  const day = date.getDay();
  return (day > 0) && (day < 6);
};

const disableWeekends = (date) => {
  const day = date.getDay();
  return (day === 0) || (day === 6);
};

const App = () => {
  const [error, setError] = useState();
  const [locale, setLocale] = useState('enUS');
  const [firstDayOfWeek, changeFirstDayOfWeekBy] = useSelection(0);
  const [dateOption, changeDateOptionBy] = useSelection('none');
  const [date, setDate] = useState(mapDateOptionToDateObject(dateOption));
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [shouldDisableDateOption, changeShouldDisableDateOptionBy] = useSelection('none');
  const dateFormat = 'yyyy-MM-dd';
  const displayDate = dateFns.isValid(date) ? dateFns.format(date, dateFormat) : '';

  useEffect(() => {
    setDate(mapDateOptionToDateObject(dateOption));
  }, [dateOption]);

  return (
    <>
      <FormGroup>
        <Flex
          alignItems="center"
          columnGap="2x"
        >
          <TextLabel>
            Selected date:
          </TextLabel>
          {error && (
            <Text color="red:50">{error}</Text>
          )}
          {!error && (
            <Text>{displayDate}</Text>
          )}
        </Flex>
      </FormGroup>
      <Calendar
        date={date}
        firstDayOfWeek={firstDayOfWeek}
        formatDate={(date, format) => {
          const options = {
            locale: locale && dateFnsLocale[locale],
          };
          return dateFns.format(date, format, options);
        }}
        maxDate={maxDate ? new Date(maxDate) : undefined}
        minDate={minDate ? new Date(minDate) : undefined}
        onChange={(nextDate) => {
          console.log('onChange:', nextDate);
          setDate(nextDate);
        }}
        onError={(error, value) => {
          console.log('onError:', error);
          setError(error);
        }}
        shouldDisableDate={(date) => {
          if (shouldDisableDateOption === 'weekdays') {
            return disableWeekdays(date);
          }
          if (shouldDisableDateOption === 'weekends') {
            return disableWeekends(date);
          }
          return false;
        }}
      />
      <Divider my="4x" />
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Localization
        </Text>
      </Box>
      <FormGroup>
        <Flex
          alignItems="center"
          columnGap="2x"
        >
          <TextLabel>
            Locale:
          </TextLabel>
          <Menu>
            <MenuButton variant="secondary" minWidth={100}>
              {locale && dateFnsLocale[locale].code}
            </MenuButton>
            <MenuList
              onClick={(event) => {
                const value = event.target.getAttribute('value');
                setLocale(value);
              }}
              maxHeight={240}
              minWidth={100}
              overflowY="auto"
            >
              {Object.keys(dateFnsLocale).map((locale) => (
                <MenuItem key={locale} value={locale}>
                  {dateFnsLocale[locale].code}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <LinkButton onClick={() => setLocale('enUS')}>
            Reset
          </LinkButton>
        </Flex>
      </FormGroup>
      <Flex
        direction="column"
        mb="4x"
        rowGap="3x"
      >
        <TextLabel>
          You can use the <Code>formatDate</Code> prop to return a formatted date string in the given format and locale.
        </TextLabel>
        <CodeBlock>
          {`// format\nimport format from 'date-fns/format';\n\n// locale\nimport enLocale from 'date-fns/locale/en-US'; // English (United States)\nimport deLocale from 'date-fns/locale/de'; // Deutsch\nimport esLocale from 'date-fns/locale/es'; // Español\nimport frLocale from 'date-fns/locale/fr'; // Français\nimport itLocale from 'date-fns/locale/it'; // Italiano\nimport jaLocale from 'date-fns/locale/ja'; // 日本語\nimport koLocale from 'date-fns/locale/ko'; // 한국어\nimport zhCNLocale from 'date-fns/locale/zh-CN'; // 简体中文\nimport zhTWLocale from 'date-fns/locale/zh-TW'; // 繁體中文`}
        </CodeBlock>
        <CodeBlock>
          {`// Calendar component\nformatDate={(date, format, options) => {\n  return format(date, format, { locale: enLocale });\n}}`}
        </CodeBlock>
      </Flex>
      <Divider my="4x" />
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Calendar props
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            firstDayOfWeek
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          css={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {firstDayOfWeekOptions.map(value => (
            <Button
              key={value}
              selected={value === firstDayOfWeek}
              onClick={changeFirstDayOfWeekBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            {dateOption === 'none' && `date={null}`}
            {dateOption === 'today' && `date={new Date()}`}
            {dateOption === 'invalid' && `date={new Date('')}`}
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          css={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['none', 'today', 'invalid'].map(value => (
            <Button
              key={value}
              selected={value === dateOption}
              onClick={changeDateOptionBy(value)}
              minWidth="15x"
            >
              {{
                'none': 'None',
                'today': 'Today',
                'invalid': 'Invalid Date',
              }[value]}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            minDate={minDate ? `{new Date('${minDate}'}}` : ''}
          </TextLabel>
        </Box>
        <Input
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          width="auto"
        />
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            maxDate={maxDate ? `{new Date('${maxDate}'}}` : ''}
          </TextLabel>
        </Box>
        <Input
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
          width="auto"
        />
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            shouldDisableDate
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          css={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['none', 'weekdays', 'weekends'].map(value => (
            <Button
              key={value}
              selected={value === shouldDisableDateOption}
              onClick={changeShouldDisableDateOptionBy(value)}
              minWidth="15x"
            >
              {{
                'none': 'None',
                'weekdays': 'Disable Weekdays',
                'weekends': 'Disable Weekends',
              }[value]}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
    </>
  );
};

export default App;
