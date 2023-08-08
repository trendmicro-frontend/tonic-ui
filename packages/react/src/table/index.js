import { ResizeHandle as TableColumnResizeHandle } from '../resize-handle';
import Table from './Table';
import TableHeader from './TableHeader';
import TableHeaderRow from './TableHeaderRow';
import TableHeaderCell from './TableHeaderCell';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableScrollbar from './TableScrollbar';

Table.Header = TableHeader;
Table.HeaderRow = TableHeaderRow;
Table.HeaderCell = TableHeaderCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export {
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableColumnResizeHandle, // alias of ResizeHandle
  TableScrollbar,
};
