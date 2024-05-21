import {
  ButtonBase,
  Flex,
  InputAdornment,
  InputControl,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { CalendarIcon, CheckIcon, MobileIcon, ViewIcon, ViewOffIcon } from '@tonic-ui/react-icons';
import React, { useState } from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [view, setView] = useState(false);
  const toggleView = () => setView(view => !view);
  const iconColor = colorStyle.color.tertiary;

  return (
    <Flex direction="column" rowGap="4x">
      <InputControl
        placeholder="Mobile phone number"
        startAdornment={(
          <InputAdornment>
            <MobileIcon color={iconColor} />
          </InputAdornment>
        )}
      />
      <InputControl
        placeholder="yyyy-MM-dd"
        defaultValue={new Date().toISOString().substr(0, 10)}
        startAdornment={(
          <InputAdornment>
            <CalendarIcon color={iconColor} />
          </InputAdornment>
        )}
      />
      <InputControl
        placeholder="Enter the amount"
        startAdornment={(
          <InputAdornment>
            <Text width="4x" textAlign="center" color={iconColor}>$</Text>
          </InputAdornment>
        )}
        endAdornment={(
          <InputAdornment>
            <CheckIcon color="green:50" />
          </InputAdornment>
        )}
      />
      <InputControl
        type={view ? 'text' : 'password'}
        defaultValue="Revealed Password"
        placeholder="Password"
        endAdornment={(
          <InputAdornment>
            <ButtonBase onClick={toggleView}>
              {view ? <ViewIcon color={iconColor} /> : <ViewOffIcon color={iconColor} />}
            </ButtonBase>
          </InputAdornment>
        )}
      />
    </Flex>
  );
};

export default App;
