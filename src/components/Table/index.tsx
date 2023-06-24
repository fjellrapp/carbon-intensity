import { ReactNode } from "react";
import TableHeading from "./TableHeading";
import TableStructure from "./TableStructure";
import TableData from "./TableData";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

type Props = {
  /** The table row headings */
  tableRowHeadings: ReactNode;
  /** The table row body */
  tableRowBody: ReactNode;
  /** The onRowSelect handler */
  onRowSelect?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
};
export default function Table({ tableRowHeadings, tableRowBody }: Props) {
  return (
    <TableStructure>
      <Table.TableHeading>{tableRowHeadings}</Table.TableHeading>
      <tbody>{tableRowBody}</tbody>
    </TableStructure>
  );
}

Table.displayName = "Table";
Table.TableStructure = TableStructure;
Table.TableHeading = TableHeading;
Table.TableData = TableData;
Table.TableHead = TableHead;
Table.TableRow = TableRow;
