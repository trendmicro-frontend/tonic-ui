import { ResizeHandle as TableColumnResizeHandle } from '../resize-handle';
import Table from './Table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableScrollbar from './TableScrollbar';

import TableHeaderRow from './deprecated/TableHeaderRow'; // deprecated
import TableHeaderCell from './deprecated/TableHeaderCell'; // deprecated

Table.Header = TableHeader;
Table.HeaderRow = TableHeaderRow; // deprecated
Table.HeaderCell = TableHeaderCell; // deprecated
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Cell = TableCell;

export {
  Table,
  TableHeader,
  TableHeaderRow, // deprecated
  TableHeaderCell, // deprecated
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableColumnResizeHandle, // alias of ResizeHandle
  TableScrollbar,
};
