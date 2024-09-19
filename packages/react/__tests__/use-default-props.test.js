import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

/**
 * Example 1: with `forwardRef`
 * ```js
 * const Accordion = forwardRef((inProps, ref) => {
 *   const {
 *     children,
 *     ...rest
 *   } = useDefaultProps({ props: inProps, name: 'Accordion' });
 * ``
 *
 * Example 2: without `forwardRef`
 * ```
 * const Portal = (inProps) => {
 *   const {
 *     appendToParentPortal = false,
 *     children,
 *     containerRef,
 *   } = useDefaultProps({ props: inProps, name: 'Portal' });
 * ```
 */
test('the `name` property in `useDefaultProps` should match the component name', () => {
  const files = globSync([
    path.resolve(__dirname, '../src/*/**/*.js'),
  ], {
    'ignore': [
      path.resolve(__dirname, '../src/*/**/*.test.js'),
    ],
  }).sort(); // Sort files alphabetically

  let matchCount = 0;
  let passCount = 0;

  for (const file of files) {
    const code = fs.readFileSync(file, { encoding: 'utf-8' });

    if (code.indexOf(' useDefaultProps(') !== -1) {
      ++matchCount;
    }

    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

    traverse(ast, {
      VariableDeclarator(path) { // eslint-disable-line no-loop-func
        if (!path.node.init) {
          return;
        }

        const isForwardRef = (path.node.init.callee && path.node.init.callee.name === 'forwardRef');
        const isFunctionOrArrowFunctionExpression = (path.node.init.type === 'ArrowFunctionExpression' || path.node.init.type === 'FunctionExpression');

        if (isForwardRef || isFunctionOrArrowFunctionExpression) {
          const componentName = path.node.id.name;
          path.traverse({
            CallExpression(innerPath) {
              if (innerPath.node.callee.name === 'useDefaultProps') {
                const nameProperty = innerPath.node.arguments[0].properties.find(prop => prop.key.name === 'name');
                const namePropertyValue = nameProperty?.value?.value;
                if (!namePropertyValue) {
                  console.error(`Error: No 'name' property found in 'useDefaultProps' in file "${file}"`);
                  return;
                }

                try {
                  expect(namePropertyValue).toEqual(componentName);
                } catch (err) {
                  throw new Error(`Mismatch in file "${file}": Expected component name '${componentName}' but found '${namePropertyValue}'`);
                }

                passCount++;
              }
            }
          });
        }
      }
    });
  }

  expect(matchCount).toBeGreaterThan(0);
  expect(matchCount).toEqual(passCount);
});
