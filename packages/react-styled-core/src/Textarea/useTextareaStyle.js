import useColorMode from '../useColorMode';
import { baseProps, getSizeProps, getVariantProps } from './styles';

const useTextareaStyle = ({
  variant,
}) => {
  const { colorMode } = useColorMode();
  const sizeProps = getSizeProps(); // use default size
  const variantProps = getVariantProps({ variant, colorMode });

  return {
    ...baseProps,
    ...sizeProps,
    ...variantProps,
  };
};

export default useTextareaStyle;
