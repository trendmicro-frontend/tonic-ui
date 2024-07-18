import { DefaultPropsContext } from './context';

const DefaultPropsProvider = ({
  value,
  children,
}) => {
  return (
    <DefaultPropsContext.Provider value={value}>
      {children}
    </DefaultPropsContext.Provider>
  );
};

export default DefaultPropsProvider;
