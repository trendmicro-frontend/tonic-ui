import useColorMode from '../useColorMode';
import { baseProps, getSizeProps, getVariantProps } from './styles';

const useInputGroupAddonStyle = ({
  size,
  variant,
}) => {
  const { colorMode } = useColorMode();
  const sizeProps = getSizeProps({ size });
  const variantProps = getVariantProps({ variant, colorMode });

  return {
    ...baseProps,
    ...sizeProps,
    ...variantProps,
  };
};

export default useInputGroupAddonStyle;
