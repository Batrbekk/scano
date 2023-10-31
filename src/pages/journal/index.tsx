import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React, {Key, useCallback} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Button} from "@nextui-org/react";

const journalIndex: NextPage = () => {
  const tableColumn = [
    {name: 'Дата', uid: 'dates'},
    {name: 'Пользователь', uid: 'user'},
    {name: 'Действие', uid: 'actions'},
  ];
  const tableRow = [
    {
      id: 1,
      dates: '24.05.2023 в 19:32',
      user: 'Aslan Abylkas',
      actions: (
        <div>
          <p className="prose prose-sm">Отредактировано оповещение по теме <b>АО КазТрансОйл</b></p>
          <ul className="list-disc">
            <li className="prose prose-sm">пришло сообщение с аудиторией более или ровно 0 человек</li>
            <li className="prose prose-sm">удалены e-mail: <b>batrbekk@gmail.com</b></li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      dates: '24.05.2023 в 19:32',
      user: 'Aslan Abylkas',
      actions: (
        <div>
          <p className="prose prose-sm">Создан новый пользователь с <b>batrbekk@gmail.com: Kuandyk Batyrbek</b></p>
          <ul className="list-disc">
            <li className="prose prose-sm">права: <b>Не администратор</b></li>
            <li className="prose prose-sm">удалены права на новые связанные аккаунты</li>
          </ul>
        </div>
      )
    },
  ];

  const tableColumnAction = [
    {name: 'Пользователь', uid: 'user'},
    {name: 'Время работы с системой', uid: 'time'},
    {name: 'График', uid: 'graphic'}
  ];
  const tableRowAction = [
    {
      id: 1,
      user: 'Aslan Abylkas',
      time: '9 часов 6 минут',
      graphic: 'по дням'
    },
    {
      id: 2,
      user: 'Aslan Abylkas',
      time: '5 часов 24 минут',
      graphic: 'по дням'
    },
  ];

  type Row = typeof tableRow[0];
  type RowAction = typeof tableRowAction[0];

  const renderCell = useCallback((row: Row, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case 'dates':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.dates}</p>
          </div>
        )
      case 'user':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.user}</p>
          </div>
        )
      case 'actions':
        return (
          <div className="py-2 px-8">
            {row.actions}
          </div>
        )
      default:
        return cellValue;
    }
  }, []);
  const renderCellAction = useCallback((row: RowAction, columnKey: Key) => {
    const cellValue = row[columnKey as keyof RowAction];

    switch (columnKey) {
      case 'user':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.user}</p>
          </div>
        )
      case 'time':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.time}</p>
          </div>
        )
      case 'graphic':
        return (
          <div className="py-2 px-4 flex justify-end">
            <Button variant="light" className="prose prose-sm text-right w-fit text-[#6481AD]">{row.graphic}</Button>
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  return (
    <MainLayout>
      <div className="flex items-start justify-between gap-x-6 pb-10">
        <div className="flex flex-col w-[80%] gap-y-8">
          <div className="flex flex-col gap-y-4">
            <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Журнал действий</p>
            <Table
              aria-label="Example table with custom cells"
              className="bg-white rounded-lg"
            >
              <TableHeader columns={tableColumn}>
                {(column) => (
                  <TableColumn key={column.uid} className="py-4 px-8 text-left">
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
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Журнал активности</p>
            <Table
              aria-label="Example table with custom cells"
              className="bg-white rounded-lg"
            >
              <TableHeader columns={tableColumnAction}>
                {(column) => (
                  <TableColumn key={column.uid} className={`py-4 px-8 ${column.name === 'График' ? 'text-right' : 'text-left'}`}>
                    <p className="prose prose-sm font-normal">{column.name}</p>
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={tableRowAction}>
                {(item) => (
                  <TableRow key={item.id} className="border-b last:border-0 hover:bg-[#fcfcfd]">
                    {(columnKey) => <TableCell className="p-0">{renderCellAction(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-[20%] bg-black rounded-lg">
          asd
        </div>
      </div>
    </MainLayout>
  )
}

export default journalIndex;
