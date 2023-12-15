import Image from "next/image";
import { NextPage } from "next";
import React, { Key, useCallback } from "react";
import Edit from '@public/assets/icons/editBlue.svg';
import MainLayout from "@/components/layout/mainLayout";
import Delete from '@public/assets/icons/deleteBlue.svg';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import Button from "@/components/atom/Button";
import {useRouter} from "next/router";
import ProtectLayout from "@/components/layout/protectLayout";
import {Tooltip} from "@nextui-org/tooltip";

const messageIndex: NextPage = () => {
  const tableColumn = [
    {name: '#', uid: 'id'},
    {name: 'Тема', uid: 'theme'},
    {name: 'Условие', uid: 'conditions'},
    {name: 'Пользователи', uid: 'users'},
    {name: 'E-mail', uid: 'email'},
    {name: 'Telegram', uid: 'telegram'},
    {name: 'Действия', uid: 'action'}
  ];
  const tableRow = [
    {
      id: 1,
      theme: 'АО НАК Казатомпром',
      conditions: 'Пришло сообщение с аудиторией более или равно 0 человек',
      users: 'Aslan',
      email: 'без уведомлений по e-mail',
      telegram: 'Мониторинг - Казатомпром',
    },
    {
      id: 2,
      theme: 'АО НК QAZAQGAZ',
      conditions: 'Пришло сообщение с аудиторией более или равно 0 человек',
      users: 'Aslan,Aruzhan',
      email: 'без уведомлений по e-mail',
      telegram: 'Мониторинг - QAZAQGAZ',
    },
  ];
  const router = useRouter();

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
      case 'theme':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.theme}</p>
          </div>
        )
      case 'conditions':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.conditions}</p>
          </div>
        )
      case 'users':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.users}</p>
          </div>
        )
      case 'email':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.email}</p>
          </div>
        )
      case 'telegram':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.telegram}</p>
          </div>
        )
      case 'action':
        return (
          <div className="py-4 px-8 flex items-center gap-x-2">
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
    <ProtectLayout>
      <MainLayout>
      <div className="flex flex-col">
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Оповещения</p>
          <Table
            aria-label="Example table with custom cells"
            className="bg-white rounded-lg mt-8"
            bottomContent={
              <Button label="Добавить оповещение" onClick={() => {
                router.push('/message/addMessage');
              }} size="sm" classBtn="max-w-fit mt-4 ml-6" />
            }
          >
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
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default messageIndex;
