import {
  Box,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  TextLabel,
  Tooltip,
} from '@tonic-ui/react';
import {
  CheckSIcon,
} from '@tonic-ui/react-icons';
import { useState } from 'react';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [placement, changePlacementBy] = useSelection('bottom-end');
  const [skidding, setSkidding] = useState(8);
  const [distance, setDistance] = useState(12);

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            placement
          </TextLabel>
        </Box>
        <Menu>
          <MenuButton
            variant="secondary"
            minWidth={150}
          >
            {placement}
          </MenuButton>
          <MenuList
            width="max-content"
            minWidth={150}
          >
            {[
              'top', 'top-start', 'top-end',
              'bottom', 'bottom-start', 'bottom-end',
              'left', 'left-start', 'left-end',
              'right', 'right-start', 'right-end',
            ].map(_placement => (
              <MenuItem
                key={_placement}
                onClick={changePlacementBy(_placement)}
              >
                <Flex columnGap="2x">
                  {placement === _placement ? <CheckSIcon /> : <Box width="4x" />}
                  {_placement}
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>skidding</TextLabel>
        </Box>
        <Flex columnGap="4x">
          <input
            aria-label="skidding"
            type="range"
            name="skidding"
            min={-48}
            max={48}
            value={skidding}
            onChange={(e) => setSkidding(Number(e.target.value))}
          />
          <Text>{skidding}</Text>
        </Flex>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>distance</TextLabel>
        </Box>
        <Flex columnGap="4x">
          <input
            aria-label="distance"
            type="range"
            name="distance"
            min={-48}
            max={48}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
          <Text>{distance}</Text>
        </Flex>
      </FormGroup>
      <Divider my="4x" />
      <Tooltip
        label="This is a tooltip"
        nextToCursor
        offset={[skidding, distance]}
        placement={placement}
      >
        <Flex
          sx={{
            backgroundColor: 'brackground.high',
            border: 1,
            borderColor: 'border.secondary',
            width: 240,
            height: 180,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Hover Me
        </Flex>
      </Tooltip>
    </>
  );
};

export default App;
