import originalTheme from '@tonic-ui/theme';
import icons from '../shared/icons';

const theme = {
  ...originalTheme,
  config: {
    prefix: 'tonic',
    useCSSVariables: false,
  },
  icons,
};

export default theme;
