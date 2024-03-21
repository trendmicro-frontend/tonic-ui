import fs from 'fs';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from '@tonic-ui/codemod/src/react/v2.0.0/import-react-icons';

describe('@tonic-ui/codemod', () => {
  describe('react/v2.0.0/import-react-icons', () => {
    it('transforms the code to import icons from `@tonic-ui/react-icons`', () => {
      const source = fs.readFileSync(path.resolve(__dirname, '__fixtures__/source.js'), 'utf8').toString();
      const transformed = transform({ source }, { jscodeshift }).toString();
      const expected = fs.readFileSync(path.resolve(__dirname, '__fixtures__/expected.js'), 'utf8').toString();
      expect(transformed.trim()).toEqual(expected.trim(), 'The transformed version should be correct');
    });
  });
});
