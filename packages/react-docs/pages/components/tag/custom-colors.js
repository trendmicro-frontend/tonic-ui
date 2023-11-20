import { Stack, Tag, useColorMode } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const solidColors = {
    dark: [
      {
        label: 'Light gray',
        backgroundColor: 'gray:70',
        color: 'gray:20'
      },
      {
        label: 'Red',
        backgroundColor: 'red:80',
        color: 'red:20'
      },
      {
        label: 'Magenta',
        backgroundColor: 'magenta:80',
        color: 'magenta:20'
      },
      {
        label: 'Purple',
        backgroundColor: 'purple:80',
        color: 'purple:20'
      },
      {
        label: 'Blue',
        backgroundColor: 'blue:80',
        color: 'blue:20'
      },
      {
        label: 'Green',
        backgroundColor: 'green:70',
        color: 'green:20'
      },
      {
        label: 'Teal',
        backgroundColor: 'teal:70',
        color: 'teal:20'
      },
      {
        label: 'Cyan',
        backgroundColor: 'cyan:70',
        color: 'cyan:20'
      },
    ],
    light: [
      {
        label: 'Light gray',
        backgroundColor: 'gray:20',
        color: 'black:emphasis'
      },
      {
        label: 'Red',
        backgroundColor: 'red:20',
        color: 'red:100'
      },
      {
        label: 'Magenta',
        backgroundColor: 'magenta:20',
        color: 'magenta:100'
      },
      {
        label: 'Purple',
        backgroundColor: 'purple:20',
        color: 'purple:100'
      },
      {
        label: 'Blue',
        backgroundColor: 'blue:20',
        color: 'blue:100'
      },
      {
        label: 'Green',
        backgroundColor: 'green:20',
        color: 'green:100'
      },
      {
        label: 'Teal',
        backgroundColor: 'teal:20',
        color: 'teal:100'
      },
      {
        label: 'Cyan',
        backgroundColor: 'cyan:20',
        color: 'cyan:100'
      },
    ]
  }[colorMode];
  const outlineColors = {
    dark: [
      {
        label: 'Light gray',
        borderColor: 'gray:40',
        color: 'gray:40'
      },
      {
        label: 'Red',
        borderColor: 'red:50',
        color: 'red:50'
      },
      {
        label: 'Magenta',
        borderColor: 'magenta:50',
        color: 'magenta:50'
      },
      {
        label: 'Purple',
        borderColor: 'purple:50',
        color: 'purple:50'
      },
      {
        label: 'Blue',
        borderColor: 'blue:50',
        color: 'blue:50'
      },
      {
        label: 'Green',
        borderColor: 'green:50',
        color: 'green:50'
      },
      {
        label: 'Teal',
        borderColor: 'teal:50',
        color: 'teal:50'
      },
      {
        label: 'Cyan',
        borderColor: 'cyan:50',
        color: 'cyan:50'
      },
    ],
    light: [
      {
        label: 'Light gray',
        borderColor: 'gray:60',
        color: 'gray:60'
      },
      {
        label: 'Red',
        borderColor: 'red:60',
        color: 'red:60'
      },
      {
        label: 'Magenta',
        borderColor: 'magenta:60',
        color: 'magenta:60'
      },
      {
        label: 'Purple',
        borderColor: 'purple:50',
        color: 'purple:50'
      },
      {
        label: 'Blue',
        borderColor: 'blue:60',
        color: 'blue:60'
      },
      {
        label: 'Green',
        borderColor: 'green:60',
        color: 'green:60'
      },
      {
        label: 'Teal',
        borderColor: 'teal:60',
        color: 'teal:60'
      },
      {
        label: 'Cyan',
        borderColor: 'cyan:60',
        color: 'cyan:60'
      },
    ]
  }[colorMode];

  return (
    <Stack spacing="4x">
      <Stack direction="row" spacing="2x" shouldWrapChildren>
        {solidColors.map(({ backgroundColor, color, label }, index) => (
          <Tag key={label} backgroundColor={backgroundColor} color={color} variant="solid">{label}</Tag>
        ))}
      </Stack>
      <Stack direction="row" spacing="2x" shouldWrapChildren>
        {solidColors.map(({ backgroundColor, color, label }, index) => (
          <Tag key={label} backgroundColor={backgroundColor} color={color} variant="solid" borderRadius="lg">{label}</Tag>
        ))}
      </Stack>
      <Stack direction="row" spacing="2x" shouldWrapChildren>
        {outlineColors.map(({ borderColor, color, label }, index) => (
          <Tag key={label} borderColor={borderColor} color={color} variant="outline">{label}</Tag>
        ))}
      </Stack>
      <Stack direction="row" spacing="2x" shouldWrapChildren>
        {outlineColors.map(({ borderColor, color, label }, index) => (
          <Tag key={label} borderColor={borderColor} color={color} variant="outline" borderRadius="lg">{label}</Tag>
        ))}
      </Stack>
    </Stack>
  );
};

export default App;
