import React from 'react';
import tmIconMap from './tmIconMap';

const tmIconSvgMap = tmIconMap.icons.reduce((prevMap, { name, paths }) => {
  return {
    ...prevMap,
    [`tmicon-${name}`]: {
      path: (
        <g>
          {paths.map((path, idx) => (
            <path
              key={`${name}-${idx}`}
              fill="currentColor"
              d={path}
            />
          ))}
        </g>
      ),
      viewBox: '0 0 16 16',
    }
  };
}, {});

export default tmIconSvgMap;
