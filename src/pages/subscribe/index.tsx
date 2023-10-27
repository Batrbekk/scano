import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {useRouter} from "next/router";
import React, {Key, useCallback} from "react";
import Image from "next/image";
import Edit from "@public/assets/icons/editBlue.svg";
import Delete from "@public/assets/icons/deleteBlue.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Button from "@/components/atom/Button";

const subscribeIndex: NextPage = () => {
  const tableColumn = [
    {name: '#', uid: 'id'},
    {name: 'Тема', uid: 'theme'},
    {name: 'E-mail', uid: 'email'},
    {name: 'Содержание', uid: 'desc'},
    {name: 'Формат', uid: 'format'},
    {name: 'Периодичность', uid: 'period'},
    {name: 'Активность', uid: 'active'},
    {name: 'Действия', uid: 'action'}
  ];
  const tableRow = [
    {
      id: 1,
      theme: 'АО НАК Казатомпром',
      email: [
        'batrbekk@gmail.com',
        'guzyakzz@gmail.com',
        'apkaado@gmail.com',
        'baha1477@mail.ru',
        'asd@mail.ru'
      ],
      desc: 'Отчет по персональному фильтру',
      format: 'Word',
      period: 'Раз в неделю',
      active: 'Вкл.',
    },
    {
      id: 2,
      theme: 'АО НК QAZAQGAZ',
      email: [
        'batrbekk@gmail.com',
        'guzyakzz@gmail.com'
      ],
      desc: 'Отчет',
      format: 'Word',
      period: 'Раз в неделю',
      active: 'Вкл.',
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
      case 'email':
        return (
          <div className="py-2 px-8 flex flex-col">
            {row.email.map((item) => (
              <p className="prose prose-sm">{item}</p>
            ))}
          </div>
        )
      case 'desc':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.desc}</p>
          </div>
        )
      case 'format':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.format}</p>
          </div>
        )
      case 'period':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.period}</p>
          </div>
        )
      case 'active':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.active}</p>
          </div>
        )
      case 'action':
        return (
          <div className="py-4 px-8 flex items-center gap-x-2">
            <button className="bg-[#ebf1fd] rounded p-2">
              <Image src={Edit} width={14} height={14} alt="icon" />
            </button>
            <button className="bg-[#ebf1fd] rounded p-2">
              <Image src={Delete} width={14} height={14} alt="icon" />
            </button>
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col">
        <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Настройка оповещений</p>
        <Table
          aria-label="Example table with custom cells"
          className="bg-white rounded-lg mt-8"
          bottomContent={
            <Button label="Добавить подписку" onClick={() => {
              router.push('/subscribe/addSubscribe');
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
  )
}

export default subscribeIndex;
