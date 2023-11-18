import { Box, Truncate } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box width="50%">
    <Truncate
      sx={{
        '--truncate-line-clamp': 3,
        whiteSpace: 'normal',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 'var(--truncate-line-clamp)',
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut purus vel libero mollis semper nec nec dui. In a ex accumsan, finibus nunc vitae, sodales lacus. Sed est risus, placerat eu lectus in, lacinia elementum nisi. Duis dignissim eros ac risus consectetur, quis gravida mauris pellentesque. Fusce eleifend lobortis nisl. Cras ut massa commodo, pellentesque purus eget, molestie odio. Vestibulum at nisi lectus. Pellentesque orci risus, commodo lobortis nunc a, pharetra mollis velit. Duis molestie diam non massa rhoncus, ut tempor sem lacinia. Nulla scelerisque tempus porttitor.
    </Truncate>
  </Box>
);

export default App;
