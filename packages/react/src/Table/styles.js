import useColorMode from '../useColorMode';

const sizes = {
  lg: {
    px: '3x',
    py: '3x',
  },
  md: {
    px: '3x',
    py: '2x',
  },
  sm: {
    px: '3x',
    py: '1x',
  },
};

const sizeProps = ({ size }) => sizes[size];

////////////////////////////////////////////////////////////

const colorProps = {
  light: {
    color: 'black:primary',
    borderColor: 'gray:50',
  },
  dark: {
    color: 'white:primary',
    borderColor: 'gray:70',
  }
};

////////////////////////////////////////////////////////////

const useTableCellStyle = props => {
  const [colorMode] = useColorMode();
  return {
    borderBottom: 1,
    ...props.variant === 'outline' && { borderRight: 1 },
    ...colorProps[colorMode],
    ...sizeProps(props),
  };
};

////////////////////////////////////////////////////////////

const useTableHeaderCellStyle = props => {
  const [colorMode] = useColorMode();
  return {
    borderBottom: 2,
    fontWeight: 'semibold',
    ...props.variant === 'outline' && { borderRight: 1 },
    ...colorProps[colorMode],
    ...sizeProps(props),
  };
};

const useTableHeaderRowStyle = props => {
  return {
    display: 'flex',
  };
};

const useTableHeaderStyle = props => {
  return {
    overflow: 'hidden',
    flex: '0 0 auto',
  };
};

const useTableRowStyle = props => {
  return {
    display: 'flex',
  };
};

export {
  useTableCellStyle,
  useTableHeaderCellStyle,
  useTableHeaderRowStyle,
  useTableHeaderStyle,
  useTableRowStyle,
};
