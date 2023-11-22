import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {useRouter} from "next/router";
import React, {Key, useCallback} from "react";
import Image from "next/image";
import Edit from "@public/assets/icons/editBlue.svg";
import Delete from "@public/assets/icons/deleteBlue.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Button from "@/components/atom/Button";
import ProtectLayout from "@/components/layout/protectLayout";

const Integrations: NextPage = () => {
  const tableColumn = [
    {name: 'Аккаунт', uid: 'acc'},
    {name: 'Тип', uid: 'type'},
    {name: '', uid: 'action'},
  ];
  const tableRow = [
    {
      id: 1,
      acc: 'Aslan Abylkas (abilkasaru)',
      type: 'Пользователь',
    },
    {
      id: 2,
      acc: 'Dosik SK (mukhametkairov)',
      type: 'Пользователь',
    },
    {
      id: 3,
      acc: 'Мониторинг - QazaqGaz',
      type: 'Группа',
    },
    {
      id: 4,
      acc: 'Мониторинг - Turkentan',
      type: 'Группа',
    },
    {
      id: 5,
      acc: 'Мониторинг - БРК',
      type: 'Группа',
    },
  ];
  const router = useRouter();

  type Row = typeof tableRow[0];

  const renderCell = useCallback((row: Row, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case 'acc':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.acc}</p>
          </div>
        )
      case 'type':
        return (
          <div className="py-2 px-8">
            {row.type}
          </div>
        )
      case 'action':
        return (
          <div className="py-2 px-8">
            <button className="bg-[#ebf1fd] rounded p-2">
              <Image src={Delete} width={16} height={16} alt="icon" />
            </button>
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
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Настройка интеграция с Telegram</p>
          <Table
            aria-label="Example table with custom cells"
            className="bg-white rounded-lg mt-8"
            bottomContent={
              <Button label="Подключить группу" onClick={() => {
                console.log('asd')
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

export default Integrations;
