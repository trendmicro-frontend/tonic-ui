import { Stack, Text, useColorStyle } from '@tonic-ui/react';
import BorderedBox from '@/components/BorderedBox';
import { For } from '@/experiments/for';

const App = () => {
  const [colorStyle] = useColorStyle();

  return (
    <Stack spacing="2x">
      <For
        items={[
          { name: 'John Doe', skills: ['JavaScript', 'React', 'Node.js'] },
          { name: 'Jane Smith', skills: ['Python', 'Django', 'SQL'] },
          { name: 'Emily Johnson', skills: ['Java', 'Spring', 'AWS'] },
        ]}
      >
        {(item, index) => (
          <BorderedBox
            key={index}
            p="4x"
          >
            <Text fontWeight="semibold">{item.name}</Text>
            <Text color={colorStyle.color.secondary}>
              Skills: {item.skills.join(', ')}
            </Text>
          </BorderedBox>
        )}
      </For>
    </Stack>
  )
};

export default App;
