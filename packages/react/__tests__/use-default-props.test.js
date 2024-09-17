const fs = require('node:fs');
const { globSync } = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

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
    'src/*/**/*.js',
  ], {
    'ignore': [
      'src/*/**/__tests__/**/*.js',
    ],
  }).sort(); // Sort files alphabetically

  for (const file of files) {
    const code = fs.readFileSync(file, { encoding: 'utf-8' });
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

    traverse(ast, {
      VariableDeclarator(path) {
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
              }
            }
          });
        }
      }
    });
  }
});
