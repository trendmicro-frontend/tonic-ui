import { Image } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const imageSrc = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';

  return (
    <Image
      src={imageSrc}
      width={96}
      height={96}
    />
  );
};

export default App;
