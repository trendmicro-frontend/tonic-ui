const ConditionalWrapper = ({
  children,
  condition,
  wrapper,
}) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;
