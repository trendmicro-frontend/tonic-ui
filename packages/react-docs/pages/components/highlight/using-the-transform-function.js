import { Highlight } from '@tonic-ui/react';
const transformAccents = (x) => {
  if (typeof x !== 'string') {
    return x;
  }
  // Convert to NFD (base letters + combining marks), then strip diacritics
  return x.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const App = () => (
  <Highlight
    query="cafe"
    transform={transformAccents}
  >
    Words like café, cafe, càfé, and cafè will all match when searching for cafe.
  </Highlight>
);

export default App;
