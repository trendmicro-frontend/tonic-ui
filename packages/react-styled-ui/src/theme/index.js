import { base } from '@trendmicro/styled-ui-theme';
import icons from './icons';

const theme = {
  ...base,
  icons: {
    ...base?.icons,
    ...icons,
  },
};

export default theme;
