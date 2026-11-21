import { getTonicComponent, visitLiteralAttributes } from '../jsx-bindings.mjs';
import { forEachPossibleValue, isComposeSxCall } from './no-spread-compose-sx.mjs';

export const noResponsiveStyleArrays = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow array-valued properties in sx and __sx styles.' },
    schema: [],
    messages: {
      responsiveArray: 'Array values are not supported for individual style declarations in sx or __sx. Use an explicit media or container query for responsive styles. Arrays of whole styles are supported.',
    },
  },
  create(context) {
    const inspectReturns = (body, visit) => {
      const walk = (node) => {
        if (!node || ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'ClassDeclaration', 'ClassExpression'].includes(node.type)) {
          return;
        }
        if (node.type === 'ReturnStatement') {
          visit(node.argument);
          return;
        }
        for (const key of context.sourceCode.visitorKeys[node.type] || []) {
          const child = node[key];
          if (Array.isArray(child)) {
            child.forEach(walk);
          } else {
            walk(child);
          }
        }
      };
      walk(body);
    };

    const inspectArrayElements = (array, visitElement) => {
      for (const element of array.elements) {
        if (!element) {
          continue;
        }
        if (element.type === 'SpreadElement') {
          forEachPossibleValue(context, element.argument, (spread) => {
            if (spread.type === 'ArrayExpression') {
              inspectArrayElements(spread, visitElement);
            }
          });
        } else {
          visitElement(element);
        }
      }
    };

    const inspectObject = (object) => {
      for (const property of object.properties) {
        if (property.type === 'SpreadElement') {
          forEachPossibleValue(context, property.argument, (spread) => {
            if (spread.type === 'ObjectExpression') {
              inspectObject(spread);
            } else if (spread.type === 'ArrayExpression') {
              // Array elements become numbered property values when spread into an object.
              inspectArrayElements(spread, (element) => inspectValue(element, true, 2));
            }
          });
        } else if (property.type === 'Property' && property.kind !== 'set') {
          inspectValue(property.value, true, 2);
        }
      }
    };

    // Root arrays compose styles; arrays produced by a property or its callback throw.
    const inspectValue = (expression, isProperty, remainingCalls) => {
      forEachPossibleValue(context, expression, (value) => {
        if (value.type === 'ArrayExpression') {
          if (isProperty) {
            context.report({ node: value, messageId: 'responsiveArray' });
          } else {
            inspectArrayElements(value, (element) => inspectValue(element, false, 1));
          }
        } else if (value.type === 'ObjectExpression') {
          inspectObject(value);
        } else if (value.type === 'ArrowFunctionExpression' || value.type === 'FunctionExpression') {
          if (value.async || value.generator || remainingCalls === 0) {
            return;
          }
          const visitReturn = (returned) => inspectValue(returned, isProperty, remainingCalls - 1);
          if (value.body.type === 'BlockStatement') {
            inspectReturns(value.body, visitReturn);
          } else {
            visitReturn(value.body);
          }
        } else if (isComposeSxCall(context, value)) {
          if (isProperty) {
            context.report({ node: value, messageId: 'responsiveArray' });
          } else {
            for (const argument of value.arguments) {
              if (argument.type === 'SpreadElement') {
                forEachPossibleValue(context, argument.argument, (spread) => {
                  if (spread.type === 'ArrayExpression') {
                    inspectArrayElements(spread, (element) => inspectValue(element, false, 1));
                  }
                });
              } else {
                inspectValue(argument, false, 1);
              }
            }
          }
        }
      });
    };

    return {
      JSXOpeningElement(node) {
        if (!getTonicComponent(context, node)) {
          return;
        }
        visitLiteralAttributes(node, (name, value) => {
          if (name === 'sx' || name === '__sx') {
            inspectValue(value, false, 1);
          }
        });
      },
    };
  },
};
