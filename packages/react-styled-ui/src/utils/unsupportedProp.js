const unsupportedProp = ({
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
      `The prop \`${propFullName ?? propName}\` of \`${componentName}\` is not supported in this release.`
    );
  }

  return null;
};

export default unsupportedProp;
