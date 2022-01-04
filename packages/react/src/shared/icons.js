import * as tmicon from '@trendmicro/tmicon';
import React from 'react';

const icons = tmicon.icons.reduce((acc, { name, paths, viewBox }) => {
  return {
    ...acc,
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

export default icons;
