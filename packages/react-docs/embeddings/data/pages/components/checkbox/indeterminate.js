import { Checkbox, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [checkedItems, setCheckedItems] = useState([true, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}
      >
        Parent
      </Checkbox>
      <Stack direction="column" pl="6x" mt="1x" spacing="1x" shouldWrapChildren>
        <Checkbox
          checked={checkedItems[0]}
          onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child 1
        </Checkbox>
        <Checkbox
          checked={checkedItems[1]}
          onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child 2
        </Checkbox>
      </Stack>
    </>
  );
};

export default App;
