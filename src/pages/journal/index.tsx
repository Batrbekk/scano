import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React, {Key, useCallback} from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Button} from "@nextui-org/react";
import Calendar from "@public/assets/icons/calendar.svg";
import Image from "next/image";
import Link from "next/link";
import Export from "@public/assets/icons/export.svg";
import ProtectLayout from "@/components/layout/protectLayout";

const journalIndex: NextPage = () => {
  const themeLinks = [
    {
      name: 'АО Кселл',
      link: '#'
    },
    {
      name: 'НАК Казатомпром',
      link: '#'
    },
    {
      name: 'НК QazaqGaz',
      link: '#'
    },
    {
      name: 'ҚазТрансОйл',
      link: '#'
    },
    {
      name: 'Тау-Кен Самрук',
      link: '#'
    }
  ];
  const usersLinks = [
    {
      name: 'Aslan Abylkas',
      link: '#'
    },
    {
      name: 'Kuandyk Batyrbek',
      link: '#'
    },
    {
      name: 'Rakhimova Guzel',
      link: '#'
    },
    {
      name: 'Talapova Shyryn',
      link: '#'
    },
    {
      name: 'Absattarov Erkanat',
      link: '#'
    }
  ];

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
    <ProtectLayout>
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
              <div className="flex items-center justify-between">
                <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Журнал активности</p>
                <Button variant="light" className="flex items-center gap-x-2">
                  <Image src={Export} alt="icon" width={24} height={24} />
                  <p className="font-['Work Sans',sans-serif] prose">Экспорт</p>
                </Button>
              </div>
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
          <div className="w-[20%] bg-white py-2">
            <div className="flex items-center gap-x-4 pb-2 border-b px-4">
              <Image src={Calendar} alt="icon" />
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose font-semibold">01 мая 2023 - 12 июн 2023</p>
            </div>
            <div className="flex flex-col">
              <p className="font-['Work Sans',sans-serif] prose text-xs uppercase py-4 px-4 text-[#8c8f95]">Темы</p>
              <div className="py-2 bg-gray-200 px-4">
                <p className="font-['Work Sans',sans-serif] prose prose-sm">Все темы</p>
              </div>
              <div className="px-4 border-b pb-2">
                {themeLinks.map((link) => (
                  <div className="py-2" key={link.link}>
                    <Link href={link.link}><p className="prose prose-sm font-['Work Sans',sans-serif] text-[#6170b7]">{link.name}</p></Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-['Work Sans',sans-serif] prose text-xs uppercase py-4 px-4 text-[#8c8f95]">Пользователи</p>
              <div className="py-2 bg-gray-200 px-4">
                <p className="font-['Work Sans',sans-serif] prose prose-sm">Все пользователи</p>
              </div>
              <div className="px-4">
                {usersLinks.map((user) => (
                  <div className="py-2" key={user.link}>
                    <Link href={user.link}><p className="prose prose-sm font-['Work Sans',sans-serif] text-[#6170b7]">{user.name}</p></Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default journalIndex;
