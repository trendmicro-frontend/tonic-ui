import algoliasearch from 'algoliasearch';
import { v5 as uuidv5 } from 'uuid';
import { routes } from '../config/sidebar-routes';

const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID;
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX;
const ZERO_UUID = '00000000-0000-0000-0000-000000000000';

const stateKey = Symbol('state');

const flatten = (data, options) => {
  const stack = [...data];
  const childrenKey = options?.childrenKey ?? 'children';
  const results = [];

  while (stack.length > 0) {
    const node = stack.shift();
    const { title = '', path = '', [stateKey]: state = {} } = node;
    const { level = 0, parent = null } = state;

    if (node[childrenKey]) {
      const children = node[childrenKey];
      stack.push(...children.map(child => ({
        ...child,
        [stateKey]: {
          level: level + 1,
          parent: {
            title,
            path,
          },
        },
      })));
    }

    if (title && path) {
      const object = {
        data: { title, path },
        level,
        parent,
      };
      object.objectID = uuidv5(JSON.stringify(object), ZERO_UUID);

      results.push(object);
    }
  }

  return results;
};

if (!ALGOLIA_APPLICATION_ID) {
  console.error('ALGOLIA_APPLICATION_ID is not defined.');
  process.exit(1);
}

if (!ALGOLIA_ADMIN_API_KEY) {
  console.error('ALGOLIA_ADMIN_API_KEY is not defined.');
  process.exit(1);
}

if (!ALGOLIA_INDEX) {
  console.error('ALGOLIA_INDEX is not defined. Skipping Algolia indexing because no index is available.');
  process.exit(1);
}

const objects = flatten(routes, { childrenKey: 'routes' });

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY);
client
  .initIndex(ALGOLIA_INDEX)
  .saveObjects(objects)
  .then(({ objectIDs }) => {
    console.log(`Succcessfully indexed ${objectIDs.length} objects.`);
  })
  .catch(error => {
    console.error(error);
  });
