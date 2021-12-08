import system from '../core/system';

const config = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: 'flex-basis',
    scale: 'sizes',
  },
  justifySelf: true,
  alignSelf: true,
  order: true,
};

const flexbox = system(config);

export default flexbox;
