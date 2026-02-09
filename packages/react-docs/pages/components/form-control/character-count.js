import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormInput,
  FormCharacterCount,
} from '@tonic-ui/react';

const App = () => {
  const [bio, setBio] = useState('');
  const maxChars = 50;

  return (
    <FormControl>
      <FormLabel>Bio</FormLabel>
      <FormInput
        placeholder="Tell us about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <FormCharacterCount count={bio.length} maxCount={maxChars} />
    </FormControl>
  );
};

export default App;
