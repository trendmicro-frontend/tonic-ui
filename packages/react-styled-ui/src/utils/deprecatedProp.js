const deprecatedProp = ({
  props,
  propFullName,
  propName,
  componentName = '<<anonymous>>',
}) => {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  if (typeof props[propName] !== 'undefined') {
    return new Error(
      `The prop \`${propFullName ?? propName}\` of \`${componentName}\` is deprecated and will be removed in a future release.`
    );
  }

  return null;
};

export default deprecatedProp;
