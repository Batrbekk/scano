import { NextPage } from "next";
import { useRouter } from "next/router";
import React, {Key, useCallback, useEffect, useState} from "react";
import Navbar from "@/components/molecule/Navbar";
import Footer from "@/components/molecule/Footer";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import ProtectLayout from "@/components/layout/protectLayout";
import {getCookie, setCookie} from "cookies-next";
import {Profile} from "@/types";

const history: NextPage = () => {
  const router = useRouter();
  const token = getCookie('scano_acess_token');
  const [profile, setProfile] = useState<Profile>();

  const tableColumn = [
    {name: '#', uid: 'id'},
    {name: 'Тема', uid: 'theme'},
    {name: 'Период сбора', uid: 'period'},
    {name: 'Загружено сообщений', uid: 'message'},
    {name: 'Инициатор сбора', uid: 'author'},
    {name: 'Дата запуска', uid: 'date'},
    {name: 'Статус', uid: 'status'}
  ];
  const tableRow = [
    {
      id: 1,
      theme: 'Павлодарская область',
      period: '11.11.2011 - 22.11.2011',
      message: '301',
      author: 'Aslan Abylkas',
      date: '1.11.2011',
      status: 'Завершен'
    },
    {
      id: 2,
      theme: 'Алматы',
      period: '15.09.2022 - 25.09.2022',
      message: '245 (25%)',
      author: 'Иван Петров',
      date: '5.09.2022',
      status: 'В процессе'
    },
    {
      id: 3,
      theme: 'Астана',
      period: '10.10.2022 - 20.10.2022',
      message: '178',
      author: 'Елена Сидорова',
      date: '25.09.2022',
      status: 'Завершен'
    },
    {
      id: 4,
      theme: 'Караганда',
      period: '03.12.2022 - 15.12.2022',
      message: '412',
      author: 'Сергей Иванов',
      date: '1.12.2022',
      status: 'Завершен'
    },
    {
      id: 5,
      theme: 'Шымкент',
      period: '05.05.2023 - 15.05.2023',
      message: '567 (93%)',
      author: 'Александра Ким',
      date: '1.05.2023',
      status: 'В процессе'
    },
    {
      id: 6,
      theme: 'Актобе',
      period: '20.07.2023 - 30.07.2023',
      message: '123 (32%)',
      author: 'Алексей Попов',
      date: '10.07.2023',
      status: 'В процессе'
    },
    {
      id: 7,
      theme: 'Тараз',
      period: '15.08.2023 - 25.08.2023',
      message: '289',
      author: 'Мария Смирнова',
      date: '10.08.2023',
      status: 'Завершен'
    },
    {
      id: 8,
      theme: 'Костанай',
      period: '01.09.2023 - 10.09.2023',
      message: '376 (42%)',
      author: 'Андрей Козлов',
      date: '20.08.2023',
      status: 'В процессе'
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
      case 'theme':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.theme}</p>
          </div>
        )
      case 'period':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.period}</p>
          </div>
        )
      case 'message':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.message}</p>
          </div>
        )
      case 'author':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.author}</p>
          </div>
        )
      case 'date':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.date}</p>
          </div>
        )
      case 'status':
        return (
          <div className="py-4 px-8">
            <p className="prose prose-sm">{row.status}</p>
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  const handleData = async () => {
    try {
      const res = await fetch(
        'https://test.scano.kz/api/v1/users/me',
        {
          method: 'GET', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setCookie('profile', data);
        setProfile(data);
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <ProtectLayout>
      <div className="bg-[#F8F9FB] h-full">
        <div className="mb-6">
          {profile && (
            <Navbar email={profile.email} role={profile.role} first_name={profile.first_name}
                    last_name={profile.last_name} photo_url={profile.photo_url}/>
          )}
        </div>
        <div className="flex items-start bg-[#F8F9FB] h-[80vh]">
          <div className="w-1/6 h-full bg-white py-4">
            <div className="w-full py-2 px-4 cursor-pointer border-b" onClick={() => {
              router.push('/main/archive');
            }}>
              <p className="prose prose-lg">Архивный сбор</p>
            </div>
            <div className="bg-gray-100 w-full py-2 px-4 cursor-pointer" onClick={() => {
              router.push('/main/history');
            }}>
              <p className="prose prose-lg">История сборов</p>
            </div>
          </div>
          <div className="py-4 w-5/6 px-6 overflow-auto">
            <p className="prose prose-2xl font-semibold mb-6">История сборов</p>
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
          </div>
        </div>
        <Footer />
      </div>
    </ProtectLayout>
  )
}

export default history;
