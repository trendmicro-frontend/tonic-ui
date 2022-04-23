const useMenuStyle = () => {
  return {
    position: 'relative',
    display: 'inline-flex',
  };
};

const useMenuContentStyle = () => {
  return {
    // No style for menu content
  };
};

const useMenuToggleStyle = () => {
  return {
    cursor: 'pointer',
    display: 'inline-flex',
  };
};

export {
  useMenuStyle,
  useMenuContentStyle,
  useMenuToggleStyle,
};
