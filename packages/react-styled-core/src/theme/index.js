/* eslint-disable-next-line import/no-unresolved */
import { base } from '@trendmicro/styled-theme';
import icons from './icons';

const theme = {
  ...base,
  icons: {
    // `_core` is a reserved key for internal use within this package
    _core: { ...icons },
    ...base.icons,
  },
};

export default theme;
