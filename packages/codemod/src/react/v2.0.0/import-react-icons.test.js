import fs from 'fs';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './import-react-icons';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('@tonic-ui/codemod', () => {
  describe('v2.0.0', () => {
    describe('import-react-icons', () => {
      it('transforms the code to import icons from `@tonic-ui/react-icons`', () => {
        const source = fs.readFileSync(path.resolve(__dirname, '__fixtures__/source.js'), 'utf8').toString();
        const transformed = transform({ source }, { jscodeshift });
        const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/expected.js'), 'utf8').toString();
        expect(transformed.trim()).toEqual(expected.trim(), 'The transformed version should be correct');
      });
    });
  });
});
