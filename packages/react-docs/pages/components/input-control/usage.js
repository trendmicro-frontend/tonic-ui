import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  InputControl,
  Space,
  Text,
  TextLabel,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [size, changeSizeBy] = useSelection('md');
  const [variant, changeVariantBy] = useSelection('outline');
  const [disabled, toggleDisabled] = useToggle(false);
  const [error, toggleError] = useToggle(false);
  const [readOnly, toggleReadOnly] = useToggle(false);
  const [required, toggleRequired] = useToggle(false);

  return (
    <>
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          InputControl props
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            size
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['sm', 'md', 'lg'].map(value => (
            <Button
              key={value}
              selected={value === size}
              onClick={changeSizeBy(value)}
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
            variant
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['outline', 'filled', 'flush', 'unstyled'].map(value => (
            <Button
              key={value}
              selected={value === variant}
              onClick={changeVariantBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <TextLabel display="flex" alignItems="center">
          <Checkbox
            checked={disabled}
            onChange={() => toggleDisabled()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">disabled</Text>
        </TextLabel>
      </FormGroup>
      <FormGroup>
        <TextLabel display="flex" alignItems="center">
          <Checkbox
            checked={error}
            onChange={() => toggleError()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">error</Text>
        </TextLabel>
      </FormGroup>
      <FormGroup>
        <TextLabel display="flex" alignItems="center">
          <Checkbox
            checked={readOnly}
            onChange={() => toggleReadOnly()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">readOnly</Text>
        </TextLabel>
      </FormGroup>
      <FormGroup>
        <TextLabel display="flex" alignItems="center">
          <Checkbox
            checked={required}
            onChange={() => toggleRequired()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">required</Text>
        </TextLabel>
      </FormGroup>
      <Divider my="4x" />
      <InputControl
        placeholder="Placeholder text"
        disabled={disabled}
        error={error}
        readOnly={readOnly}
        required={required}
        size={size}
        variant={variant}
      />
    </>
  );
};

export default App;
