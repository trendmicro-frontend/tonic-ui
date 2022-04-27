(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6264],{3651:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return d}});var a=t(7896),o=t(59740),r=(t(2784),t(30876)),l=["components"],i={};function d(e){var n=e.components,t=(0,o.Z)(e,l);return(0,r.kt)("wrapper",(0,a.Z)({},i,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",null,"DatePicker"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"DatePicker")," let the user select a date from the calendar."),(0,r.kt)("h2",null,"Import"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  DatePicker,\n} from '@tonic-ui/react-lab';\n")),(0,r.kt)("h2",null,"Overview"),(0,r.kt)("p",null,"The following example demonstrates a simple example of the ",(0,r.kt)("inlineCode",{parentName:"p"},"DatePicker")," component."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},'<DatePicker\n  inputFormat="yyyy-MM-dd"\n  value={value}\n  onChange={(nextValue) => {\n    setValue(nextValue);\n  }}\n  onError={(error, value) => {\n    console.log(error, value);\n  }}\n  renderInput={({ error, inputProps }) => (\n    <DateInput\n      {...inputProps}\n      error={error}\n      placeholder="yyyy-MM-dd"\n      readOnly\n    />\n  )}\n/>\n')),(0,r.kt)("p",null,"Note that the ",(0,r.kt)("inlineCode",{parentName:"p"},"DateInput")," component is currently not provided by the ",(0,r.kt)("inlineCode",{parentName:"p"},"@tonic-ui/react-lab")," package. You have to write your own or refer to the following code to ",(0,r.kt)("a",{parentName:"p",href:"../../components/inputcontrol"},"get started"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"disabled",disabled:!0},"// import\nimport { InputControl, InputAdornment } from '@tonic-ui/react';\n\n// DateInput\nconst DateInput = React.forwardRef((props, ref) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <InputControl\n      ref={ref}\n      startAdornment={(\n        <InputAdornment color={colorStyle.color.secondary}>\n          <Icon icon=\"calendar\" />\n        </InputAdornment>\n      )}\n      {...props}\n    />\n  );\n});\n")),(0,r.kt)("h2",null,"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},"const CodeBlock = (props) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <Box\n      backgroundColor={colorStyle.background.secondary}\n      border={1}\n      borderColor={colorStyle.divider}\n      fontFamily=\"mono\"\n      py=\"3x\"\n      px=\"3x\"\n      whiteSpace=\"pre\"\n      {...props}\n    />\n  );\n};\n\nconst FormGroup = (props) => (\n  <Box mb=\"4x\" {...props} />\n);\n\nconst inputFormats = [\n  'yyyy-MM-dd', // ISO 8601\n  'MM/dd/yyyy', // USA\n  'dd.MM.yyyy', // Worldwide\n  'yyyy/MM/dd', // East Asia\n];\n\nconst firstDayOfWeekOptions = [\n  0, // Sunday\n  1, // Monday\n  2, // Tuesday\n  3, // Wednesday\n  4, // Thursday\n  5, // Friday\n  6, // Saturday\n];\n\nconst useSelection = (defaultValue) => {\n  const [value, setValue] = React.useState(defaultValue);\n  const changeBy = (value) => () => setValue(value);\n  return [value, changeBy];\n};\n\nconst DateInput = React.forwardRef((props, ref) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n\n  return (\n    <InputControl\n      ref={ref}\n      startAdornment={(\n        <InputAdornment color={colorStyle.color.secondary}>\n          <Icon icon=\"calendar\" />\n        </InputAdornment>\n      )}\n      {...props}\n    />\n  );\n});\n\nconst mapDateOptionToDateObject = (dateOption) => ({\n  'none': null,\n  'today': new Date(),\n  'invalid': new Date(''),\n}[dateOption]);\n\nconst disableWeekdays = (date) => {\n  const day = date.getDay();\n  return (day > 0) && (day < 6);\n};\n\nconst disableWeekends = (date) => {\n  const day = date.getDay();\n  return (day === 0) || (day === 6);\n};\n\nrender(() => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const [maxDate, setMaxDate] = React.useState('');\n  const [minDate, setMinDate] = React.useState('');\n  const [dateOption, changeDateOptionBy] = useSelection('none');\n  const [firstDayOfWeek, changeFirstDayOfWeekBy] = useSelection(0);\n  const [inputFormat, changeInputFormatBy] = useSelection(inputFormats[0]);\n  const [shouldDisableDateOption, changeShouldDisableDateOptionBy] = useSelection('none');\n  const [readOnly, toggleReadOnly] = useToggle(false);\n  const [value, setValue] = React.useState(mapDateOptionToDateObject(dateOption));\n  const [error, setError] = React.useState();\n  const displayDate = dateFns.isValid(value) ? dateFns.format(value, inputFormat) : '';\n  const [locale, setLocale] = React.useState('enUS');\n  const onChangeLocale = (event) => {\n    const value = event.target.getAttribute('value');\n    setLocale(value);\n  };\n\n  React.useEffect(() => {\n    setValue(mapDateOptionToDateObject(dateOption));\n  }, [dateOption]);\n\n  return (\n    <>\n      <FormGroup>\n        <Flex\n          alignItems=\"center\"\n          columnGap=\"2x\"\n        >\n          <TextLabel>\n            Selected date:\n          </TextLabel>\n          {error && (\n            <Text color=\"red:50\">{error}</Text>\n          )}\n          {!error && (\n            <Text>{displayDate}</Text>\n          )}\n        </Flex>\n      </FormGroup>\n      <DatePicker\n        firstDayOfWeek={firstDayOfWeek}\n        formatDate={(date, format) => {\n          const options = {\n            locale: locale && dateFnsLocale[locale],\n          };\n          return dateFns.format(date, format, options);\n        }}\n        maxDate={maxDate ? new Date(maxDate) : undefined}\n        minDate={minDate ? new Date(minDate) : undefined}\n        onChange={(nextValue) => {\n          console.log('onChange:', nextValue);\n          setValue(nextValue);\n        }}\n        onError={(error, value) => {\n          console.log('onError:', error, value);\n          setError(error);\n        }}\n        shouldDisableDate={(date) => {\n          console.log('shouldDisableDate:', date, shouldDisableDateOption);\n          if (shouldDisableDateOption === 'weekdays') {\n            return disableWeekdays(date);\n          }\n          if (shouldDisableDateOption === 'weekends') {\n            return disableWeekends(date);\n          }\n          return false;\n        }}\n        value={value}\n        inputFormat={inputFormat}\n        renderInput={({ error: inputError, inputProps }) => {\n          console.log('renderInput:', inputError, inputProps);\n          return (\n            <Box>\n              <DateInput\n                {...inputProps}\n                error={inputError}\n                placeholder={inputFormat}\n                readOnly={readOnly}\n              />\n              {inputError && (\n                <Text mt=\"1x\" color=\"red:50\">Invalid date</Text>\n              )}\n            </Box>\n          );\n        }}\n      />\n      <Divider my=\"4x\" />\n      <Box mb=\"4x\">\n        <Text fontSize=\"lg\" lineHeight=\"lg\">\n          Localization\n        </Text>\n      </Box>\n      <FormGroup>\n        <Flex\n          alignItems=\"center\"\n          columnGap=\"2x\"\n        >\n          <TextLabel>\n            Locale:\n          </TextLabel>\n          <Menu>\n            <MenuButton variant=\"secondary\" minWidth={100}>\n              {locale && dateFnsLocale[locale].code}\n            </MenuButton>\n            <MenuList\n              onClick={(event) => {\n                const value = event.target.getAttribute('value');\n                setLocale(value);\n              }}\n              maxHeight={240}\n              minWidth={100}\n              overflowY=\"auto\"\n            >\n              {Object.keys(dateFnsLocale).map((locale) => (\n                <MenuItem key={locale} value={locale}>\n                  {dateFnsLocale[locale].code}\n                </MenuItem>\n              ))}\n            </MenuList>\n          </Menu>\n          <LinkButton onClick={() => setLocale('enUS')}>\n            Reset\n          </LinkButton>\n        </Flex>\n      </FormGroup>\n      <Flex\n        direction=\"column\"\n        mb=\"4x\"\n        rowGap=\"3x\"\n      >\n        <TextLabel>\n          You can use the <Code>formatDate</Code> prop to return a formatted date string in the given format and locale.\n        </TextLabel>\n        <CodeBlock>\n          {`// format\\nimport format from 'date-fns/format';\\n\\n// locale\\nimport enLocale from 'date-fns/locale/en-US'; // English (United States)\\nimport deLocale from 'date-fns/locale/de'; // Deutsch\\nimport esLocale from 'date-fns/locale/es'; // Espa\xf1ol\\nimport frLocale from 'date-fns/locale/fr'; // Fran\xe7ais\\nimport itLocale from 'date-fns/locale/it'; // Italiano\\nimport jaLocale from 'date-fns/locale/ja'; // \u65e5\u672c\u8a9e\\nimport koLocale from 'date-fns/locale/ko'; // \ud55c\uad6d\uc5b4\\nimport zhCNLocale from 'date-fns/locale/zh-CN'; // \u7b80\u4f53\u4e2d\u6587\\nimport zhTWLocale from 'date-fns/locale/zh-TW'; // \u7e41\u9ad4\u4e2d\u6587`}\n        </CodeBlock>\n        <CodeBlock>\n          {`// DatePicker component\\nformatDate={(date, format, options) => {\\n  return format(date, format, { locale: enLocale });\\n}}`}\n        </CodeBlock>\n      </Flex>\n      <Divider my=\"4x\" />\n      <Box mb=\"4x\">\n        <Text fontSize=\"lg\" lineHeight=\"lg\">\n          DatePicker props\n        </Text>\n      </Box>\n      <FormGroup>\n        <Box mb=\"2x\">\n          <TextLabel>\n            firstDayOfWeek\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant=\"secondary\"\n          css={{\n            '> *:not(:first-of-type)': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {[0, 1, 2, 3, 4, 5, 6].map(value => (\n            <Button\n              key={value}\n              selected={value === firstDayOfWeek}\n              onClick={changeFirstDayOfWeekBy(value)}\n              minWidth=\"15x\"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <Box mb=\"2x\">\n          <TextLabel>\n            {dateOption === 'none' && `value={null}`}\n            {dateOption === 'today' && `value={new Date()}`}\n            {dateOption === 'invalid' && `value={new Date('')}`}\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant=\"secondary\"\n          css={{\n            '> *:not(:first-of-type)': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {['none', 'today', 'invalid'].map(value => (\n            <Button\n              key={value}\n              selected={value === dateOption}\n              onClick={changeDateOptionBy(value)}\n              minWidth=\"15x\"\n            >\n              {{\n                'none': 'None',\n                'today': 'Today',\n                'invalid': 'Invalid Date',\n              }[value]}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <Box mb=\"2x\">\n          <TextLabel>\n            minDate={minDate ? `{new Date('${minDate}'}}` : ''}\n          </TextLabel>\n        </Box>\n        <Input\n          type=\"date\"\n          value={minDate}\n          onChange={(e) => setMinDate(e.target.value)}\n          width=\"auto\"\n        />\n      </FormGroup>\n      <FormGroup>\n        <Box mb=\"2x\">\n          <TextLabel>\n            maxDate={maxDate ? `{new Date('${maxDate}'}}` : ''}\n          </TextLabel>\n        </Box>\n        <Input\n          type=\"date\"\n          value={maxDate}\n          onChange={(e) => setMaxDate(e.target.value)}\n          width=\"auto\"\n        />\n      </FormGroup>\n      <FormGroup>\n        <Box mb=\"2x\">\n          <TextLabel>\n            shouldDisableDate\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant=\"secondary\"\n          css={{\n            '> *:not(:first-of-type)': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {['none', 'weekdays', 'weekends'].map(value => (\n            <Button\n              key={value}\n              selected={value === shouldDisableDateOption}\n              onClick={changeShouldDisableDateOptionBy(value)}\n              minWidth=\"15x\"\n            >\n              {{\n                'none': 'None',\n                'weekdays': 'Disable Weekdays',\n                'weekends': 'Disable Weekends',\n              }[value]}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <FormGroup>\n        <Box mb=\"2x\">\n          <TextLabel>\n            inputFormat\n          </TextLabel>\n        </Box>\n        <ButtonGroup\n          variant=\"secondary\"\n          css={{\n            '> *:not(:first-of-type)': {\n              marginLeft: -1\n            }\n          }}\n        >\n          {inputFormats.map(value => (\n            <Button\n              key={value}\n              selected={value === inputFormat}\n              onClick={changeInputFormatBy(value)}\n              minWidth=\"15x\"\n            >\n              {value}\n            </Button>\n          ))}\n        </ButtonGroup>\n      </FormGroup>\n      <Divider my=\"4x\" />\n      <Box mb=\"4x\">\n        <Text fontSize=\"lg\" lineHeight=\"lg\">\n          DateInput props\n        </Text>\n      </Box>\n      <FormGroup>\n        <TextLabel display=\"flex\" alignItems=\"center\">\n          <Checkbox\n            checked={readOnly}\n            onChange={toggleReadOnly}\n          />\n          <Space width=\"2x\" />\n          <Text fontFamily=\"mono\" whiteSpace=\"nowrap\">readOnly</Text>\n        </TextLabel>\n      </FormGroup>\n    </>\n  );\n});\n")),(0,r.kt)("h3",null,"Date time range picker"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const CustomDateInput = ({\n  inputFormat = \'yyyy-MM-dd\',\n  defaultValue,\n  onChange,\n  ...rest\n}) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const [value, setValue] = React.useState(defaultValue);\n  const handleChange = (value) => {\n    setValue(value);\n    onChange(value);\n  };\n\n  return (\n    <DatePicker\n      value={value}\n      onChange={handleChange}\n      inputFormat={inputFormat}\n      renderInput={({ error, inputProps }) => {\n        const _error = !!inputProps.value && error;\n\n        return (\n          <InputControl\n            {...inputProps}\n            readOnly\n            error={_error}\n            placeholder={inputFormat}\n            borderTopRightRadius={0}\n            borderBottomRightRadius={0}\n            width={130}\n            startAdornment={(\n              <InputAdornment color={colorStyle.color.secondary}>\n                <Icon icon="calendar" />\n              </InputAdornment>\n            )}\n          />\n        );\n      }}\n      {...rest}\n    />\n  );\n};\n\nconst CustomTimeInput = ({\n  onChange,\n  ...rest\n}) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const handleTimeInputChange = (event) => {\n    const value = event.target.value;\n    onChange(value);\n  };\n\n  return (\n    <InputControl\n      onChange={handleTimeInputChange}\n      width={110}\n      borderTopLeftRadius={0}\n      borderBottomLeftRadius={0}\n      startAdornment={(\n        <InputAdornment color={colorStyle.color.secondary}>\n          <Icon icon="clock" />\n        </InputAdornment>\n      )}\n      {...rest}\n    />\n  );\n};\n\nconst DateTimePicker = ({\n  startDate: startDateProp,\n  startTime: startTimeProp,\n  endDate: endDateProp,\n  endTime: endTimeProp,\n  onApply,\n  onClose,\n}) => {\n  const inputFormat = \'yyyy-MM-dd\';\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const [startDate, setStartDate] = React.useState(startDateProp);\n  const [startTime, setStartTime] = React.useState(startTimeProp);\n  const [endDate, setEndDate] = React.useState(endDateProp);\n  const [endTime, setEndTime] = React.useState(endTimeProp);\n  const [isInvalid, setIsInvalid] = React.useState(false);\n  const isValidDate = (value) => {\n    if (value instanceof Date) {\n      return !!value.getTime();\n    }\n    // The date format is "yyyy-MM-dd"\n    const pattern = /([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))/;\n    return !!String(value).match(pattern);\n  };\n  const isValidTime = (value) => {\n    // The time format is "HH:mm:ss"\n    const pattern = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;\n    return !!String(value).match(pattern);\n  };\n  const handleStartDateChange = (value) => {\n    setStartDate(value);\n  };\n  const handleEndDateChange = (value) => {\n    setEndDate(value);\n  };\n  const handleStartTimeChange = (value) => {\n    setStartTime(value);\n  };\n  const handleEndTimeChange = (value) => {\n    setEndTime(value);\n  };\n  const handleApplyClick = () => {\n    onApply({\n      startDate,\n      startTime,\n      endDate,\n      endTime,\n    });\n  };\n\n  React.useEffect(() => {\n    const isValidStartDate = isValidDate(startDate);\n    const isValidStartTime = isValidTime(startTime);\n    const isValidEndDate = isValidDate(endDate);\n    const isValidEndTime = isValidTime(endTime);\n\n    if (!(isValidStartDate && isValidEndDate && isValidStartTime && isValidEndTime)) {\n      setIsInvalid(true);\n      return;\n    }\n\n    // if the end datetime is the earlier than the start datetime, then set the end datetime to the start datetime\n    if ((Date.parse(`${formatDate(endDate)} ${endTime}`)).valueOf() < (Date.parse(`${formatDate(startDate)} ${startTime}`)).valueOf()){\n      setEndDate(startDate);\n      setEndTime(\'23:59:59\');\n    } else {\n      setIsInvalid(false);\n    }\n  }, [startDate, startTime, endDate, endTime]);\n\n  return (\n    <Box\n      backgroundColor={colorStyle.background.tertiary}\n      position="absolute"\n      left="100%"\n      top={0}\n      px="3x"\n      py="3x"\n      borderLeft={1}\n      borderColor={colorStyle.divider}\n    >\n      <Flex\n        alignItems="center"\n        columnGap="3x"\n        mb="6x"\n      >\n        <Icon\n          icon="chevron-left"\n          color={colorStyle.color.secondary}\n        />\n        <Text fontSize="md" lineHeight="md">\n          Custom Period\n        </Text>\n      </Flex>\n      <Grid\n        templateColumns="auto 1fr"\n        alignItems="center"\n        rowGap="3x"\n        mb="3x"\n      >\n        <Text minWidth="16x">\n          From:\n        </Text>\n        <Flex>\n          <CustomDateInput\n            inputFormat={inputFormat}\n            isInvalid={!isValidDate(startDate)}\n            defaultValue={startDate}\n            onChange={handleStartDateChange}\n          />\n          <CustomTimeInput\n            isInvalid={!isValidTime(startTime)}\n            defaultValue={startTime}\n            onChange={handleStartTimeChange}\n          />\n        </Flex>\n        <Text minWidth="16x">\n          To:\n        </Text>\n        <Flex>\n          <CustomDateInput\n            inputFormat={inputFormat}\n            isInvalid={!isValidDate(endDate)}\n            value={endDate}\n            onChange={handleEndDateChange}\n          />\n          <CustomTimeInput\n            isInvalid={!isValidTime(endTime)}\n            value={endTime}\n            onChange={handleEndTimeChange}\n          />\n        </Flex>\n      </Grid>\n      <Flex justifyContent="flex-end">\n        <Grid templateColumns="1fr 1fr" columnGap="2x">\n          <Button\n            variant="primary"\n            disabled={isInvalid}\n            onClick={handleApplyClick}\n          >\n            Apply\n          </Button>\n          <Button\n            variant="secondary"\n            onClick={onClose}\n          >\n            Cancel\n          </Button>\n        </Grid>\n      </Flex>\n    </Box>\n  );\n};\n\nconst stateReducer = (prevState, nextState) => ({\n  ...prevState,\n  ...(typeof nextState === \'function\' ? nextState(prevState) : nextState),\n});\n\nconst padTo2Digits = (num) => {\n  return num.toString().padStart(2, \'0\');\n};\n\nconst formatDate = (date) => {\n  return (\n    [\n      date.getFullYear(),\n      padTo2Digits(date.getMonth() + 1),\n      padTo2Digits(date.getDate()),\n    ].join(\'-\')\n  );\n};\n\nconst formatTime = (date) => {\n  const hours = date.getHours();\n  const minutes = date.getMinutes();\n  const seconds = date.getSeconds();\n  return (\n    [\n      padTo2Digits(hours),\n      padTo2Digits(minutes),\n      padTo2Digits(seconds),\n    ].join(\':\')\n  );\n};\n\nfunction Example() {\n  const inputFormat = \'yyyy-MM-dd\';\n  const today = new Date();\n  const [state, setState] = React.useReducer(stateReducer, {\n    value: \'1d\',\n    isDateTimePickerVisible: false,\n    startDate: today,\n    startTime: \'00:00:00\',\n    endDate: today,\n    endTime: \'23:59:59\',\n  });\n  const handleMenuItemClick = (event) => {\n    const value = event.currentTarget.getAttribute(\'value\');\n    if (value === \'custom\') {\n      event.preventDefault();\n      if (!state.isDateTimePickerVisible) {\n        setState({\n          isDateTimePickerVisible: true,\n        });\n      }\n      return;\n    }\n\n    setState({\n      value,\n      isDateTimePickerVisible: false,\n    });\n  };\n  const mapValueToLabel = (value) => {\n    if (value === \'custom\') {\n      return \'Custom range\';\n    }\n    return {\n      \'1d\': \'Last 24 hours\',\n      \'7d\': \'Last 7 days\',\n      \'30d\': \'Last 30 days\',\n      \'90d\': \'Last 90 days\',\n    }[value];\n  };\n  const dateTimeRange = (() => {\n    const value = state.value;\n\n    if (value === \'custom\') {\n      return [\n        `${formatDate(state.startDate)} ${state.startTime}`,\n        `${formatDate(state.endDate)} ${state.endTime}`,\n      ];\n    }\n\n    const days = parseInt(value, 10);\n    if (days > 0) {\n      const now = new Date();\n      const date = new Date(now.setDate(now.getDate() - days));\n      return [\n        `${formatDate(date)} ${formatTime(date)}`,\n        `${formatDate(new Date())} ${formatTime(new Date())}`,\n      ];\n    }\n\n    return [];\n  })();\n\n  React.useEffect(() => {\n    if (state.value === \'custom\' && !state.isDateTimePickerVisible) {\n      setState({\n        isDateTimePickerVisible: true,\n      });\n    }\n  }, [state.value, state.isDateTimePickerVisible]);\n\n  return (\n    <>\n      <Flex mb="3x">\n        <TextLabel>Date & time range:</TextLabel>\n        <Space width="3x" />\n        <Text>{dateTimeRange[0]}</Text>\n        <Text px="1x">to</Text>\n        <Text>{dateTimeRange[1]}</Text>\n      </Flex>\n      <Menu\n        onClose={() => {\n          if (state.isDateTimePickerVisible) {\n            setState({ isDateTimePickerVisible: false });\n          }\n        }}\n      >\n        {({ closeMenu }) => (\n          <>\n            <MenuButton variant="secondary">\n              <Text>{mapValueToLabel(state.value)}</Text>\n            </MenuButton>\n            <MenuList width="max-content">\n              {state.isDateTimePickerVisible && (\n                <DateTimePicker\n                  inputFormat={inputFormat}\n                  startDate={state.startDate}\n                  startTime={state.startTime}\n                  endDate={state.endDate}\n                  endTime={state.endTime}\n                  onApply={({ startDate, startTime, endDate, endTime }) => {\n                    closeMenu();\n                    setState({\n                      value: \'custom\',\n                      startDate,\n                      startTime,\n                      endDate,\n                      endTime,\n                    });\n                  }}\n                  onClose={() => {\n                    closeMenu();\n                  }}\n                />\n              )}\n              {[\'1d\', \'7d\', \'30d\', \'90d\'].map(value => (\n                <MenuItem\n                  key={value}\n                  value={value}\n                  onClick={handleMenuItemClick}\n                >\n                  {mapValueToLabel(value)}\n                </MenuItem>\n              ))}\n              <MenuItem\n                value="custom"\n                onClick={handleMenuItemClick}\n              >\n                Custom Period\n                <Space width="2x" />\n                <Icon icon="angle-right" />\n              </MenuItem>\n            </MenuList>\n          </>\n        )}\n      </Menu>\n    </>\n  );\n}\n\nrender(<Example />);\n')),(0,r.kt)("h2",null,"Props"),(0,r.kt)("h3",null,"DatePicker"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"defaultValue"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Date ","|"," string"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"The default selected date. If the ",(0,r.kt)("inlineCode",{parentName:"td"},"defaultValue")," is a string, it will be parsed to a ",(0,r.kt)("inlineCode",{parentName:"td"},"Date")," object in accordance with the ",(0,r.kt)("inlineCode",{parentName:"td"},"inputFormat"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"firstDayOfWeek"),(0,r.kt)("td",{parentName:"tr",align:"left"},"number"),(0,r.kt)("td",{parentName:"tr",align:"left"},"0"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The first day of the week.",(0,r.kt)("br",null),"0 = Sunday",(0,r.kt)("br",null),"1 = Monday",(0,r.kt)("br",null),"2 = Tuesday",(0,r.kt)("br",null),"3 = Wednesday",(0,r.kt)("br",null),"4 = Thursday",(0,r.kt)("br",null),"5 = Friday",(0,r.kt)("br",null),"6 = Saturday")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"formatDate"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A callback called to return the formatted date string in the given format.",(0,r.kt)("br",null),(0,r.kt)("br",null),(0,r.kt)("b",null,"Signature"),(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"function(date, format, options) => void"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"date"),": The original date.",(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"format"),": The string of ",(0,r.kt)("a",{parentName:"td",href:"https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table"},"format tokens"),".",(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"options"),": An object with options.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"inputFormat"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'yyyy-MM-dd'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The default date format is ISO 8601 (",(0,r.kt)("inlineCode",{parentName:"td"},"yyyy-MM-dd"),"). You can change the input format in accordance with the locale. The input value will be parsed to a ",(0,r.kt)("inlineCode",{parentName:"td"},"Date")," object with ",(0,r.kt)("inlineCode",{parentName:"td"},"dd")," as day, ",(0,r.kt)("inlineCode",{parentName:"td"},"MM")," as month, and ",(0,r.kt)("inlineCode",{parentName:"td"},"yyyy")," as year.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"offset"),(0,r.kt)("td",{parentName:"tr",align:"left"},"[skidding, distance]"),(0,r.kt)("td",{parentName:"tr",align:"left"},"[0, 0]"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The skidding and distance of the date picker.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"minDate"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Date"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"The minimum date that can be selected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"maxDate"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Date"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"The maximum date that can be selected.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"onChange"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A callback called when the value (the selected date) changes.",(0,r.kt)("br",null),(0,r.kt)("br",null),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"function(value) => void"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"value"),": The selected date.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"onError"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"An error-first callback called when the date validation returns an error (or the date is valid after error).",(0,r.kt)("br",null),(0,r.kt)("br",null),(0,r.kt)("b",null,"Signature"),(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"function(error, value) => void"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"error"),": The error message. It will be ",(0,r.kt)("inlineCode",{parentName:"td"},"undefined")," if the date is valid after error.",(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"value"),": The selected date.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"placement"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'bottom-start'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The placement of the date picker. One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"renderInput"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"The ",(0,r.kt)("inlineCode",{parentName:"td"},"renderInput")," prop allows you to customize the rendered input.",(0,r.kt)("br",null),"The ",(0,r.kt)("inlineCode",{parentName:"td"},"props")," argument of this render prop contains props of ",(0,r.kt)("a",{parentName:"td",href:"../../components/inputcontrol"},"InputControl")," that you need to forward.",(0,r.kt)("br",null),(0,r.kt)("br",null),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"function(props) => ReactNode"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"props"),": The props of the input.",(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"returns (ReactNode)"),": The node to render as the input.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"shouldDisableDate"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Disable specific date.",(0,r.kt)("br",null),(0,r.kt)("br",null),(0,r.kt)("b",null,"Signature:"),(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"function(date) => boolean"),(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"date"),": The date to check.",(0,r.kt)("br",null),(0,r.kt)("em",{parentName:"td"},"returns (boolean)"),": Return ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," if the date will be disabled.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"value"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Date ","|"," string"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"The selected date. If the ",(0,r.kt)("inlineCode",{parentName:"td"},"value")," is a string, it will be parsed to a ",(0,r.kt)("inlineCode",{parentName:"td"},"Date")," object in accordance with the ",(0,r.kt)("inlineCode",{parentName:"td"},"inputFormat"),".")))))}d.isMDXComponent=!0},82341:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/lab/date-pickers/DatePicker",function(){return t(3651)}])}},function(e){e.O(0,[9774,2888,179],(function(){return n=82341,e(e.s=n);var n}));var n=e.O();_N_E=n}]);