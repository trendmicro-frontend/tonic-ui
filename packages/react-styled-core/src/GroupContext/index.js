import React from 'react';

const GroupContext = React.createContext({
  disabled: false,
  name: undefined,
  size: undefined,
  value: undefined,
  variantColor: undefined,
  onChange: (e) => {},
});

export const useGroupContext = () => React.useContext(GroupContext);

export default GroupContext;
