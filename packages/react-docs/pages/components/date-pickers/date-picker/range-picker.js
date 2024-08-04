import {
  Box,
  Button,
  DatePicker,
  Flex,
  Grid,
  InputAdornment,
  InputControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Space,
  Text,
  TextLabel,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { AngleRightIcon, CalendarIcon, ChevronLeftIcon, ClockIcon } from '@tonic-ui/react-icons';
import React, { useEffect, useState } from 'react';

const CustomDateInput = ({
  inputFormat = 'yyyy-MM-dd',
  defaultValue,
  onChange,
  ...rest
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [value, setValue] = useState(defaultValue);
  const handleChange = (value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <DatePicker
      closeOnSelect={true}
      value={value}
      onChange={handleChange}
      inputFormat={inputFormat}
      renderInput={({ error, inputProps }) => {
        const _error = !!inputProps.value && error;

        return (
          <InputControl
            {...inputProps}
            readOnly
            error={_error}
            placeholder={inputFormat}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            width={130}
            startAdornment={(
              <InputAdornment color={colorStyle.color.secondary}>
                <CalendarIcon />
              </InputAdornment>
            )}
          />
        );
      }}
      {...rest}
    />
  );
};

const CustomTimeInput = ({
  onChange,
  ...rest
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const handleTimeInputChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <InputControl
      onChange={handleTimeInputChange}
      width={110}
      borderTopLeftRadius={0}
      borderBottomLeftRadius={0}
      startAdornment={(
        <InputAdornment color={colorStyle.color.secondary}>
          <ClockIcon />
        </InputAdornment>
      )}
      {...rest}
    />
  );
};

const DateTimePicker = ({
  startDate: startDateProp,
  startTime: startTimeProp,
  endDate: endDateProp,
  endTime: endTimeProp,
  onApply,
  onClose,
}) => {
  const inputFormat = 'yyyy-MM-dd';
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [startDate, setStartDate] = useState(startDateProp);
  const [startTime, setStartTime] = useState(startTimeProp);
  const [endDate, setEndDate] = useState(endDateProp);
  const [endTime, setEndTime] = useState(endTimeProp);
  const [isInvalid, setIsInvalid] = useState(false);
  const isValidDate = (value) => {
    if (value instanceof Date) {
      return !!value.getTime();
    }
    // The date format is "yyyy-MM-dd"
    const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return !!String(value).match(pattern);
  };
  const isValidTime = (value) => {
    // The time format is "HH:mm:ss"
    const pattern = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
    return !!String(value).match(pattern);
  };
  const handleStartDateChange = (value) => {
    setStartDate(value);
  };
  const handleEndDateChange = (value) => {
    setEndDate(value);
  };
  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };
  const handleEndTimeChange = (value) => {
    setEndTime(value);
  };
  const handleApplyClick = () => {
    onApply({
      startDate,
      startTime,
      endDate,
      endTime,
    });
  };

  useEffect(() => {
    const isValidStartDate = isValidDate(startDate);
    const isValidStartTime = isValidTime(startTime);
    const isValidEndDate = isValidDate(endDate);
    const isValidEndTime = isValidTime(endTime);

    if (!(isValidStartDate && isValidEndDate && isValidStartTime && isValidEndTime)) {
      setIsInvalid(true);
      return;
    }

    // if the end datetime is the earlier than the start datetime, then set the end datetime to the start datetime
    if ((Date.parse(`${formatDate(endDate)} ${endTime}`)).valueOf() < (Date.parse(`${formatDate(startDate)} ${startTime}`)).valueOf()){
      setEndDate(startDate);
      setEndTime('23:59:59');
    } else {
      setIsInvalid(false);
    }
  }, [startDate, startTime, endDate, endTime]);

  return (
    <Box
      backgroundColor={colorStyle.background.tertiary}
      position="absolute"
      left="100%"
      top={0}
      px="3x"
      py="3x"
      borderLeft={1}
      borderColor={colorStyle.divider}
    >
      <Flex
        alignItems="center"
        columnGap="3x"
        mb="6x"
      >
        <ChevronLeftIcon color={colorStyle.color.secondary} />
        <Text fontSize="md" lineHeight="md">
          Custom Period
        </Text>
      </Flex>
      <Grid
        templateColumns="auto 1fr"
        alignItems="center"
        rowGap="3x"
        mb="3x"
      >
        <Text minWidth="16x">
          From:
        </Text>
        <Flex>
          <CustomDateInput
            inputFormat={inputFormat}
            isInvalid={!isValidDate(startDate)}
            defaultValue={startDate}
            onChange={handleStartDateChange}
          />
          <CustomTimeInput
            isInvalid={!isValidTime(startTime)}
            defaultValue={startTime}
            onChange={handleStartTimeChange}
          />
        </Flex>
        <Text minWidth="16x">
          To:
        </Text>
        <Flex>
          <CustomDateInput
            inputFormat={inputFormat}
            isInvalid={!isValidDate(endDate)}
            value={endDate}
            onChange={handleEndDateChange}
          />
          <CustomTimeInput
            isInvalid={!isValidTime(endTime)}
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </Flex>
      </Grid>
      <Flex justifyContent="flex-end">
        <Grid templateColumns="1fr 1fr" columnGap="2x">
          <Button
            variant="primary"
            disabled={isInvalid}
            onClick={handleApplyClick}
          >
            Apply
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
      </Flex>
    </Box>
  );
};

const stateReducer = (prevState, nextState) => ({
  ...prevState,
  ...(typeof nextState === 'function' ? nextState(prevState) : nextState),
});

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
};

const formatDate = (date) => {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-')
  );
};

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return (
    [
      padTo2Digits(hours),
      padTo2Digits(minutes),
      padTo2Digits(seconds),
    ].join(':')
  );
};

const App = () => {
  const inputFormat = 'yyyy-MM-dd';
  const today = new Date();
  const [state, setState] = React.useReducer(stateReducer, {
    value: '1d',
    isDateTimePickerVisible: false,
    startDate: today,
    startTime: '00:00:00',
    endDate: today,
    endTime: '23:59:59',
  });
  const handleMenuItemClick = (event) => {
    const value = event.currentTarget.getAttribute('value');
    if (value === 'custom') {
      event.preventDefault();
      if (!state.isDateTimePickerVisible) {
        setState({
          isDateTimePickerVisible: true,
        });
      }
      return;
    }

    setState({
      value,
      isDateTimePickerVisible: false,
    });
  };
  const mapValueToLabel = (value) => {
    if (value === 'custom') {
      return 'Custom range';
    }
    return {
      '1d': 'Last 24 hours',
      '7d': 'Last 7 days',
      '30d': 'Last 30 days',
      '90d': 'Last 90 days',
    }[value];
  };
  const dateTimeRange = (() => {
    const value = state.value;

    if (value === 'custom') {
      return [
        `${formatDate(state.startDate)} ${state.startTime}`,
        `${formatDate(state.endDate)} ${state.endTime}`,
      ];
    }

    const days = parseInt(value, 10);
    if (days > 0) {
      const now = new Date();
      const date = new Date(now.setDate(now.getDate() - days));
      return [
        `${formatDate(date)} ${formatTime(date)}`,
        `${formatDate(new Date())} ${formatTime(new Date())}`,
      ];
    }

    return [];
  })();

  useEffect(() => {
    if (state.value === 'custom' && !state.isDateTimePickerVisible) {
      setState({
        isDateTimePickerVisible: true,
      });
    }
  }, [state.value, state.isDateTimePickerVisible]);

  return (<>
    <Flex mb="3x">
      <TextLabel>Date & time range:</TextLabel>
      <Space width="3x" />
      <Text>{dateTimeRange[0]}</Text>
      <Text px="1x">to</Text>
      <Text>{dateTimeRange[1]}</Text>
    </Flex>
    <Menu
      onClose={() => {
        if (state.isDateTimePickerVisible) {
          setState({ isDateTimePickerVisible: false });
        }
      }}
    >
      {({ onClose }) => (
        <>
          <MenuButton variant="secondary">
            <Text>{mapValueToLabel(state.value)}</Text>
          </MenuButton>
          <MenuList width="max-content">
            {state.isDateTimePickerVisible && (
              <DateTimePicker
                inputFormat={inputFormat}
                startDate={state.startDate}
                startTime={state.startTime}
                endDate={state.endDate}
                endTime={state.endTime}
                onApply={({ startDate, startTime, endDate, endTime }) => {
                  onClose();
                  setState({
                    value: 'custom',
                    startDate,
                    startTime,
                    endDate,
                    endTime,
                  });
                }}
                onClose={() => {
                  onClose();
                }}
              />
            )}
            {['1d', '7d', '30d', '90d'].map(value => (
              <MenuItem
                key={value}
                value={value}
                onClick={handleMenuItemClick}
              >
                {mapValueToLabel(value)}
              </MenuItem>
            ))}
            <MenuItem
              value="custom"
              onClick={handleMenuItemClick}
            >
              Custom Period
              <Space width="2x" />
              <AngleRightIcon />
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  </>);
};

export default App;
