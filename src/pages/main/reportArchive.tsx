import {NextPage} from "next";
import Image from "next/image";
import {useRouter} from "next/router";
import React, {Key, useCallback} from "react";
import Navbar from "@/components/molecule/Navbar";
import Footer from "@/components/molecule/Footer";
import BlueDelete from "@public/assets/icons/blueDelete.svg";
import Download from "@public/assets/icons/download.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import ProtectLayout from "@/components/layout/protectLayout";

export const reportArchive: NextPage = () => {
  const router = useRouter();

  const tableColumn = [
    {name: 'Создан', uid: 'created'},
    {name: 'Тема', uid: 'theme'},
    {name: 'Период сбора', uid: 'period'},
    {name: 'Формат', uid: 'format'},
    {name: 'Создатель отчета', uid: 'author'},
    {name: 'Действия', uid: 'action'},
  ];
  const tableRow = [
    {
      created: '05.07.2023 18:06',
      theme: 'Павлодарская область',
      period: '11.11.2011 - 22.11.2011',
      format: 'DOCX',
      author: 'Aslan Abylkas',
    },
    {
      created: '15.08.2023 09:15',
      theme: 'Алматы',
      period: '01.01.2022 - 31.12.2022',
      format: 'PDF',
      author: 'Elena Ivanova',
    },
    {
      created: '25.09.2023 14:30',
      theme: 'Нур-Султан',
      period: '15.03.2023 - 30.03.2023',
      format: 'XLSX',
      author: 'Sergey Petrov',
    },
    {
      created: '10.10.2023 21:45',
      theme: 'Караганда',
      period: '05.05.2023 - 15.05.2023',
      format: 'PPT',
      author: 'Maria Kuznetsova',
    },
    {
      created: '12.11.2023 11:20',
      theme: 'Астана',
      period: '01.09.2023 - 30.09.2023',
      format: 'DOCX',
      author: 'Alexey Smirnov',
    },
    {
      created: '18.12.2023 16:55',
      theme: 'Алматы',
      period: '01.07.2023 - 31.07.2023',
      format: 'PDF',
      author: 'Anna Kovalenko',
    },
    {
      created: '20.01.2024 08:10',
      theme: 'Шымкент',
      period: '20.02.2024 - 28.02.2024',
      format: 'XLSX',
      author: 'Dmitry Ivanov',
    },
    {
      created: '01.02.2024 19:30',
      theme: 'Актобе',
      period: '10.11.2023 - 20.11.2023',
      format: 'PPT',
      author: 'Olga Petrova',
    },
    {
      created: '10.03.2024 12:15',
      theme: 'Костанай',
      period: '01.12.2023 - 31.12.2023',
      format: 'DOCX',
      author: 'Ivan Sidorov',
    },
    {
      created: '05.04.2024 07:40',
      theme: 'Уральск',
      period: '15.05.2024 - 30.05.2024',
      format: 'PDF',
      author: 'Natalia Smirnova',
    },
  ];


  type Row = typeof tableRow[0];

  const renderCell = useCallback((row: Row, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case 'created':
        return (
          <div className="py-3 px-8">
            <p className="prose prose-sm">{row.created}</p>
          </div>
        )
      case 'theme':
        return (
          <div className="py-3 px-8">
            <p className="prose prose-sm">{row.theme}</p>
          </div>
        )
      case 'period':
        return (
          <div className="py-3 px-8">
            <p className="prose prose-sm">{row.period}</p>
          </div>
        )
      case 'format':
        return (
          <div className="py-3 px-8 flex items-center gap-x-2">
            <div className="bg-[#5b85ce] rounded p-1">
              <p className="text-white text-[8px]">{row.format}</p>
            </div>
            <p className="prose prose-sm">{row.format}</p>
          </div>
        )
      case 'author':
        return (
          <div className="py-3 px-8">
            <p className="prose prose-sm">{row.author}</p>
          </div>
        )
      case 'action':
        return (
          <div className="py-3 px-8 flex items-center gap-x-4">
            <button className="bg-[#ebf1fd] rounded p-1">
              <Image src={BlueDelete} alt="icon" width={16} height={16} />
            </button>
            <button className="bg-[#ebf1fd] rounded p-1">
              <Image src={Download} alt="icon" width={16} height={16} />
            </button>
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  return (
    <ProtectLayout>
      <div className="bg-[#F8F9FB] h-full">
        <div className="mb-6">
          <Navbar />
        </div>
        <div className="flex items-start bg-[#F8F9FB]">
          <div className="py-4 px-6 w-full">
            <div className="flex items-center justify-between mb-6">
              <p className="prose prose-2xl font-semibold">Архив отчетов</p>
              <p className="prose prose-base">Отчеты хранятся не более 3-х месяцев</p>
            </div>
            <Table aria-label="Example table with custom cells" className="bg-white rounded-lg">
              <TableHeader columns={tableColumn}>
                {(column) => (
                  <TableColumn key={column.uid} className="text-left py-4 px-8">
                    {column.uid === 'created' ? (
                      <div className="rounded-2xl bg-[#ebecef] py-1 px-4 w-fit">
                        <p className="prose prose-sm font-normal">{column.name}</p>
                      </div>
                    ) : (
                      <p className="prose prose-sm font-normal">{column.name}</p>
                    )}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={tableRow}>
                {(item) => (
                  <TableRow key={item.theme} className="border-b last:border-0 hover:bg-[#fcfcfd]">
                    {(columnKey) => <TableCell className="p-0">{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectLayout>
  )
}

export default reportArchive;
