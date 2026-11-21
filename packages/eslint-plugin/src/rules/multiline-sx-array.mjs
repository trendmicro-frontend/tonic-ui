import { getTonicComponent } from '../jsx-bindings.mjs';
import { unwrapExpression } from '../style-expressions.mjs';

export const multilineSxArray = {
  meta: {
    type: 'layout',
    docs: { description: 'Put each entry of a multiline sx or __sx array on its own line.' },
    fixable: 'whitespace',
    schema: [],
    messages: {
      multilineArray: 'Put each entry of a multiline {{prop}} array on its own line and align the closing bracket with the prop.',
    },
  },
  create(context) {
    const { sourceCode } = context;
    const leadingIndent = (line) => sourceCode.lines[line - 1].match(/^[\t ]*/)[0];

    return {
      JSXAttribute(node) {
        const prop = node.name.name;
        if ((prop !== 'sx' && prop !== '__sx') || node.value?.type !== 'JSXExpressionContainer') {
          return;
        }
        const array = unwrapExpression(node.value.expression);
        if (array?.type !== 'ArrayExpression' || array.loc.start.line === array.loc.end.line || !getTonicComponent(context, node.parent)) {
          return;
        }

        const attrIndent = leadingIndent(node.loc.start.line);
        const indent = attrIndent.length === node.loc.start.column
          ? attrIndent
          : `${leadingIndent(node.parent.loc.start.line)}  `;
        const newline = sourceCode.text[sourceCode.getIndexFromLoc({ line: array.loc.start.line + 1, column: 0 }) - 2] === '\r'
          ? '\r\n'
          : '\n';
        const edits = [];
        const align = (token, indentation) => {
          const previous = sourceCode.getTokenBefore(token, { includeComments: true });
          const lineStart = sourceCode.getIndexFromLoc({ line: token.loc.start.line, column: 0 });
          const sameLine = previous.loc.end.line === token.loc.start.line;
          const start = sameLine ? previous.range[1] : lineStart;
          const replacement = sameLine ? newline + indentation : indentation;
          if (sourceCode.text.slice(start, token.range[0]) !== replacement) {
            edits.push({ range: [start, token.range[0]], replacement });
          }
        };

        for (const element of array.elements) {
          if (element) {
            // The delimiter also finds opening parentheses omitted from the element's AST range.
            const delimiter = sourceCode.getTokenBefore(element, {
              filter: (token) => token.range[0] === array.range[0] || (token.type === 'Punctuator' && token.value === ','),
            });
            align(sourceCode.getTokenAfter(delimiter), `${indent}  `);
          }
        }
        align(sourceCode.getLastToken(array), indent);

        if (edits.length > 0) {
          context.report({
            node: array,
            messageId: 'multilineArray',
            data: { prop },
            fix: (fixer) => edits.map(({ range, replacement }) => fixer.replaceTextRange(range, replacement)),
          });
        }
      },
    };
  },
};
