import useColorMode from '../useColorMode';
import { baseProps, getSizeProps, getVariantProps } from './styles';

const useInputGroupAddonStyle = ({
  size,
  variant,
}) => {
  const { colorMode } = useColorMode();

  // size
  const sizeProps = getSizeProps({ size });

  // variant
  const variantProps = getVariantProps({ variant, colorMode });

  return {
    ...baseProps,
    ...sizeProps,
    ...variantProps,
  };
};

export default useInputGroupAddonStyle;
