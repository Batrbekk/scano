import React, {Key, useCallback} from "react";
import {Tooltip} from "@nextui-org/tooltip";
import Image from "next/image";
import Plus from "@public/assets/icons/plus.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Delete from "@public/assets/icons/deleteBlue.svg";
import Edit from "@public/assets/icons/editBlue.svg";

export const TagDynamicTable = () => {
  const tableColumn = [
    {name: '', uid: 'action'},
    {name: 'Тег', uid: 'tag'},
    {name: 'Сообщений', uid: 'message'},
    {name: '%', uid: 'percentage'},
    {name: 'Аудитория', uid: 'auditory'},
    {name: 'Вовлеченность', uid: 'involve'},
    {name: 'Позитив', uid: 'positive'},
    {name: 'Нейтрально', uid: 'neutral'},
    {name: 'Негатив', uid: 'negative'},
    {name: 'Лояльность', uid: 'loyal'},
    {name: 'Действия', uid: 'act'}
  ];
  const tableRow = [
    {
      tag: 'Начальство',
      message: '78',
      percentage: '6',
      auditory: '928',
      involve: '321',
      positive: '21',
      neutral: '51',
      negative: '6',
      loyal: '2.3'
    },
    {
      tag: 'Подчиненные',
      message: '78',
      percentage: '6',
      auditory: '928',
      involve: '321',
      positive: '21',
      neutral: '51',
      negative: '6',
      loyal: '3.2'
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
      case 'percentage':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.percentage}</p>
          </div>
        )
      case 'auditory':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.auditory}</p>
          </div>
        )
      case 'involve':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.involve}</p>
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
      case 'loyal':
        return (
          <div className="py-4 px-8">
            <p className="prose prose-sm">{row.loyal}</p>
          </div>
        )
      case 'act':
        return (
          <div className="flex items-center gap-x-2 justify-end">
            <Tooltip content="Редактировать">
              <button className="bg-[#ebf1fd] rounded p-2">
                <Image src={Edit} width={14} height={14} alt="icon"/>
              </button>
            </Tooltip>
            <Tooltip content="Удалить">
              <button className="bg-[#ebf1fd] rounded p-2">
                <Image src={Delete} width={14} height={14} alt="icon"/>
              </button>
            </Tooltip>
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

export default TagDynamicTable;
