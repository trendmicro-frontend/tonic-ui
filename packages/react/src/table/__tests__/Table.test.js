import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@tonic-ui/react/src';
import React from 'react';

describe('Table', () => {
  it('should render correctly with `flexbox` layout', async () => {
    const renderOptions = {};

    const { container } = render((
      <Table layout="flexbox">
        <TableHeader>
          <TableRow>
            <TableCell>
              Header Cell 1
            </TableCell>
            <TableCell>
              Header Cell 2
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              Row 1, Cell 1
            </TableCell>
            <TableCell>
              Row 1, Cell 2
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Row 2, Cell 1
            </TableCell>
            <TableCell>
              Row 2, Cell 2
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should render correctly with `table` layout', async () => {
    const renderOptions = {};

    const { container } = render((
      <Table layout="table">
        <TableHeader>
          <TableRow>
            <TableCell>
              Header Cell 1
            </TableCell>
            <TableCell>
              Header Cell 2
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              Row 1, Cell 1
            </TableCell>
            <TableCell>
              Row 1, Cell 2
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Row 2, Cell 1
            </TableCell>
            <TableCell>
              Row 2, Cell 2
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });
});
