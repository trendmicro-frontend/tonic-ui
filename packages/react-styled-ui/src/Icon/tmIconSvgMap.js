import React from 'react';
import tmIconMap from './tmIconMap';

const tmIconSvgMap = tmIconMap.icons.reduce((prevMap, { name, paths, viewBox }) => {
  return {
    ...prevMap,
    [`tmicon-${name}`]: {
      path: (
        <g>
          {paths.map((path, idx) => (
            <path
              // eslint-disable-next-line react/no-array-index-key
              key={`${name}-${idx}`}
              d={path}
            />
          ))}
        </g>
      ),
      viewBox,
    }
  };
}, {});

export default tmIconSvgMap;
