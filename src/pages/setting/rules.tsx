import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React, {Key, useCallback} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Edit from "@public/assets/icons/editBlue.svg";
import Delete from "@public/assets/icons/deleteBlue.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Button from "@/components/atom/Button";

const Rules: NextPage = () => {
  const tableColumn = [
    {name: '#', uid: 'id'},
    {name: 'Тема', uid: 'theme'},
    {name: 'Состав данных', uid: 'data'},
    {name: 'Действие', uid: 'action'},
  ];
  const tableRow = [
    {
      id: 1,
      theme: 'АО НАК Казатомпром',
      data: (
        <p className="prose prose-sm text-[#979ca9]">Фильтр » поисковой запрос: <span className="text-[#4c515c]">умз</span></p>
      ),
      action: 'Үлбі металлургия зауыты'
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
      case 'data':
        return (
          <div className="py-2 px-8">
            {row.data}
          </div>
        )
      case 'action':
        return (
          <div className="py-4 px-8 flex items-center gap-x-2">
            <p className="prose prose-sm mr-2">Присвоить тег: {row.action}</p>
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
        <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Правила</p>
        <Table
          aria-label="Example table with custom cells"
          className="bg-white rounded-lg mt-8"
          bottomContent={
            <Button label="Добавить правило" onClick={() => {
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

export default Rules;
