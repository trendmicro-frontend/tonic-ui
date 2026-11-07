import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  flattenSidebarRoutes,
  parseSidebarRoutes,
} from '../parse-sidebar-routes.mjs';

const source = `
import { Icon } from './icon';

export const routes = [
  {
    title: 'Getting started',
    icon: (props) => <Icon {...props} />,
    routes: [
      { title: 'Installation', path: 'getting-started/installation' },
      { title: 'HEADING', heading: true },
      { title: 'Color mode', path: 'components/color-mode' },
    ],
  },
  {
    title: 'React Components',
    routes: [
      { title: 'Color mode', path: 'components/color-mode' },
      {
        title: 'Button',
        path: 'components/button',
        render: () => <Icon />,
      },
    ],
  },
];
`;

describe('parseSidebarRoutes', () => {
  it('parses route literals without executing the module', () => {
    const routes = parseSidebarRoutes(source);

    assert.equal(routes.length, 2);
    assert.equal(routes[0].title, 'Getting started');
    assert.equal(routes[0].children.length, 3);
    assert.equal(routes[1].children[1].path, 'components/button');
  });

  it('flattens routes, skips headings, and prefers the canonical category', () => {
    const routes = flattenSidebarRoutes(parseSidebarRoutes(source));

    assert.deepEqual(routes, [
      { title: 'Installation', path: 'getting-started/installation', category: 'Getting started' },
      { title: 'Color mode', path: 'components/color-mode', category: 'React Components' },
      { title: 'Button', path: 'components/button', category: 'React Components' },
    ]);
  });

  it('fails when the routes export is missing', () => {
    assert.throws(
      () => parseSidebarRoutes('export const other = [];'),
      /Unable to find the exported `routes` array/,
    );
  });
});
