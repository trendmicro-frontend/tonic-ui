import MyButton from './MyButton';
import NestedWrapper from './NestedWrapper';
import ProtectingWrapper from './ProtectingWrapper';
import NoForwardWrapper from './NoForwardWrapper';
import UsesLayoutPrimitive from './UsesLayoutPrimitive';

const App = () => (
  <>
    {/* one-hop resolution: MyButton -> Button */}
    <MyButton label="Save" sx={{width: '8x'}} />

    {/* two-hop resolution: NestedWrapper -> MyButton -> Button */}
    <NestedWrapper label="Save" sx={{width: '8x'}} />

    {/* wrapper intercepts width itself -- must stay protected */}
    <ProtectingWrapper width="8x" sx={{color: 'red'}} />

    {/* no rest element at all -- nothing forwarded, left untouched */}
    <NoForwardWrapper label="Save" width="8x" />

    {/* resolves to a Layer-1 primitive, but the WRAPPER isn't one --
        its own width should still convert */}
    <UsesLayoutPrimitive sx={{width: '8x'}} />
  </>
);

export default App;
