import system from '../core/system';

const config = {
  fontFamily: {
    property: 'fontFamily',
    scale: 'fonts',
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
  },
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights',
  },
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights',
  },
  letterSpacing: {
    property: 'letterSpacing',
    scale: 'letterSpacings',
  },
  textAlign: true,
  fontStyle: true,
  lineBreak: true,
  overflowWrap: true,
  textIndent: true,
  textJustify: true,
  textTransform: true,
  textEmphasis: true,
  textOverflow: true,
  whiteSpace: true,
  wordBreak: true,
  wordSpacing: true,
};

const typography = system(config);

export default typography;
