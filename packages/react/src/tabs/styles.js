const useTabStyle = ({
  disabled,
  isActive,
  variant,
}) => {
  return {
    cursor: (() => {
      if (disabled) {
        return 'not-allowed';
      }
      if (isActive) {
        return 'default';
      }
      return 'pointer';
    })(),
  };
};

const useTabListStyle = ({
  orientation,
}) => {
  const orientationProps = {
    vertical: {
      flexDirection: 'column',
    },
    horizontal: {
      flexDirection: 'row',
    },
  }[orientation];

  return {
    display: 'flex',
    ...orientationProps,
  };
};

const useTabPanelStyle = ({
  isActive,
}) => {
  return {};
};

export {
  useTabStyle,
  useTabListStyle,
  useTabPanelStyle,
};
