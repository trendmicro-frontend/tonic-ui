import { LocaleProvider } from './LocaleProvider';
import Gomoku from './Gomoku';

function App() {
  return (
    <LocaleProvider>
      <Gomoku />
    </LocaleProvider>
  );
}

export default App;
