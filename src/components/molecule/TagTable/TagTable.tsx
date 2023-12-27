import React, {Key, useCallback} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Image from "next/image";
import Plus from "@public/assets/icons/plus.svg";
import {Tooltip} from "@nextui-org/tooltip";

export const TagTable = () => {
  const tableColumn = [
    {name: '', uid: 'action'},
    {name: 'Тег', uid: 'tag'},
    {name: 'Сообщений', uid: 'message'},
    {name: '+/-', uid: 'blnc'},
  ];
  const tableRow = [
    {
      tag: 'Начальство',
      message: '78',
      blnc: '6'
    },
    {
      tag: 'Подчиненные',
      message: '78',
      blnc: '6'
    }
  ];

  type Row = typeof tableRow[0];

  const renderCell = useCallback((row: Row, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case 'action':
        return (
          <div className="py-2 px-8">
            <Tooltip content="Тег">
              <button className="flex items-center gap-x-1 bg-[#ebf1fd] p-1 rounded">
                <Image src={Plus} alt="icon" width={14} height={14} />
              </button>
            </Tooltip>
          </div>
        )
      case 'tag':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.tag}</p>
          </div>
        )
      case 'message':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.message}</p>
          </div>
        )
      case 'blnc':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.blnc}</p>
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells" className="bg-white rounded-lg">
      <TableHeader columns={tableColumn}>
        {(column) => (
          <TableColumn key={column.uid} className="text-left py-4 px-8">
            <p className="prose prose-sm font-normal">{column.name}</p>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tableRow}>
        {(item) => (
          <TableRow key={item.tag} className="border-b last:border-0 hover:bg-[#fcfcfd]">
            {(columnKey) => <TableCell className="p-0">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TagTable;
