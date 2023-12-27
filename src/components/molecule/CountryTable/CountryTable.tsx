import React, {Key, useCallback} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";

export const CountryTable = () => {
  const tableColumn = [
    {name: '#', uid: 'id'},
    {name: 'Страна', uid: 'country'},
    {name: 'Сообщений', uid: 'message'},
    {name: '%', uid: 'percent'},
    {name: 'Позитив', uid: 'positive'},
    {name: 'Нейтрально', uid: 'neutral'},
    {name: 'Негатив', uid: 'negative'},
  ];
  const tableRow = [
    {
      id: 1,
      country: 'Казахстан',
      message: '78',
      percent: '1,89%',
      positive: '21',
      neutral: '51',
      negative: '6'
    },
    {
      id: 2,
      country: 'Россия',
      message: '78',
      percent: '1,89%',
      positive: '21',
      neutral: '51',
      negative: '6'
    },
    {
      id: 3,
      country: 'США',
      message: '78',
      percent: '1,89%',
      positive: '21',
      neutral: '51',
      negative: '6'
    },
    {
      id: 4,
      country: 'Китай',
      message: '78',
      percent: '1,89%',
      positive: '21',
      neutral: '51',
      negative: '6'
    },
    {
      id: 5,
      country: 'Грузия',
      message: '78',
      percent: '1,89%',
      positive: '21',
      neutral: '51',
      negative: '6'
    }
  ];

  type Row = typeof tableRow[0];

  const renderCell = useCallback((row: Row, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case 'id':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.id}</p>
          </div>
        )
      case 'country':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm text-[#7088c0]">{row.country}</p>
          </div>
        )
      case 'message':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.message}</p>
          </div>
        )
      case 'percent':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.percent}</p>
          </div>
        )
      case 'positive':
        return (
          <div className="py-4 px-8">
            <p className="prose prose-sm text-green-600">{row.positive}</p>
          </div>
        )
      case 'neutral':
        return (
          <div className="py-4 px-8">
            <p className="prose prose-sm">{row.neutral}</p>
          </div>
        )
      case 'negative':
        return (
          <div className="py-4 px-8">
            <p className="prose prose-sm text-red-600">{row.negative}</p>
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
          <TableRow key={item.id} className="border-b last:border-0 hover:bg-[#fcfcfd]">
            {(columnKey) => <TableCell className="p-0">{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default CountryTable;
