import React from 'react';

const icons = {
  'angle-down': {
    path: (
      <path
        fill="currentColor"
        d="M12.5 6.5l-4.5 4.5-4.5-4.5 1-1 3.5 3.5 3.5-3.5 1 1z"
      />
    ),
    viewBox: '0 0 16 16',
  },
  'chevron-down': {
    path: (
      <path
        fill="currentColor"
        d="M8 12l-7-6.607 1.476-1.393 5.524 5.214 5.524-5.214 1.476 1.393z"
      />
    ),
    viewBox: '0 0 16 16',
  },
  'check': {
    path: (
      <g fill="currentColor">
        <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
      </g>
    ),
    viewBox: '0 0 14 14',
  },
  'minus': {
    path: (
      <g fill="currentColor">
        <rect height="18" width="18" x="3" y="3" />
      </g>
    ),
  },
  'severity-success': {
    path: (
      <path
        fill="currentColor"
        d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8v0zM7 12l-4-4 1-1 3 3 5-6 1 1z"
      />
    ),
    viewBox: '0 0 16 16',
  },
  'severity-info': {
    path: (
      <path
        fill="currentColor"
        d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8v0zM7 4h2v2h-2zM10 12h-4v-1h1v-3h-1v-1h3v4h1z"
      />
    ),
    viewBox: '0 0 16 16',
  },
  'severity-warning': {
    path: (
      <path
        fill="currentColor"
        d="M15.86 13.49l-7-12c-0.176-0.3-0.498-0.498-0.865-0.498s-0.689 0.198-0.862 0.494l-0.003 0.005-7 12c-0.088 0.146-0.14 0.322-0.14 0.51 0 0.552 0.448 1 1 1 0.003 0 0.007-0 0.010-0h13.999c0.552-0 1-0.448 1-1 0-0.188-0.052-0.364-0.142-0.515l0.003 0.005zM9 13h-2v-2h2zM9 10h-2v-5h2z"
      />
    ),
    viewBox: '0 0 16 16',
  },
  'severity-error': {
    path: (
      <path
        fill="currentColor"
        d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8v0zM11 12l-3-3-3 3-1.060-1.060 3.060-2.94-3-3 1.060-1.070 2.94 2.95 2.94-2.94 1.060 1.060-2.89 3 3 3z"
      />
    ),
    viewBox: '0 0 16 16',
  },
};

export default icons;
