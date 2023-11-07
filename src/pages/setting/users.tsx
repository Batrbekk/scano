import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {useRouter} from "next/router";
import React, {Key, useCallback} from "react";
import {Avatar} from "@nextui-org/avatar";
import Image from "next/image";
import Edit from "@public/assets/icons/editBlue.svg";
import Ban from "@public/assets/icons/ban.svg";
import Delete from "@public/assets/icons/deleteBlue.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Button from "@/components/atom/Button";

const Users: NextPage = () => {
  const tableColumn = [
    {name: '', uid: 'avatar'},
    {name: 'Имя', uid: 'name'},
    {name: 'E-mail', uid: 'mail'},
    {name: 'Компания', uid: 'company'},
    {name: 'Права', uid: 'role'},
    {name: 'Действия', uid: 'action'}
  ];
  const tableRow = [
    {
      id: 1,
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      name: 'Aslan Abylkas',
      mail: 'aslan_abylkas@gmail.com',
      company: 'Monitoring project',
      role: 'Супер администратор'
    },
    {
      id: 2,
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      name: 'Islam Erkebayev',
      mail: 'islam_erkebaev@gmail.com',
      company: 'Giliano',
      role: 'Администратор'
    },
    {
      id: 3,
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      name: 'Aruzhan Abylkas',
      mail: 'aruzhan_abylkas@gmail.com',
      company: 'Giliano',
      role: 'Администратор'
    },
    {
      id: 4,
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      name: 'Batyrbek Kuandyk',
      mail: 'batrbekk@gmail.com',
      company: 'Mycar',
      role: 'Модератор'
    },
    {
      id: 5,
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      name: 'Maksat Tulegenov',
      mail: 'maksat_tulegenov@gmail.com',
      company: 'QazaqGaz',
      role: 'Модератор'
    },
  ];
  const router = useRouter();

  type Row = typeof tableRow[0];

  const renderCell = useCallback((row: Row, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case 'avatar':
        return (
          <div className="py-2 px-8">
            <Avatar src={row.avatar} />
          </div>
        )
      case 'name':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm text-[#6481AD]">{row.name}</p>
          </div>
        )
      case 'mail':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.mail}</p>
          </div>
        )
      case 'company':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.company}</p>
          </div>
        )
      case 'role':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.role}</p>
          </div>
        )
      case 'action':
        return (
          <div className="py-4 px-8 flex items-center justify-end gap-x-2">
            {row.role === 'Супер администратор' && (
              <button className="bg-[#ebf1fd] rounded p-2">
                <Image src={Edit} width={14} height={14} alt="icon" />
              </button>
            )}
            {row.role !== 'Супер администратор' && (
              <>
                <button className="bg-[#ebf1fd] rounded p-2">
                  <Image src={Ban} width={14} height={14} alt="icon" />
                </button>
                <button className="bg-[#ebf1fd] rounded p-2">
                  <Image src={Edit} width={14} height={14} alt="icon" />
                </button>
                <button className="bg-[#ebf1fd] rounded p-2">
                  <Image src={Delete} width={14} height={14} alt="icon" />
                </button>
              </>
            )}
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col">
        <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Пользователи</p>
        <Table
          aria-label="Example table with custom cells"
          className="bg-white rounded-lg mt-8"
          bottomContent={
            <Button label="Добавить пользователя" onClick={() => {
              router.push('/setting/addProfile')
            }} size="sm" classBtn="max-w-fit mt-4 ml-6" color="bg-[#5b85ce]" />
          }
        >
          <TableHeader columns={tableColumn}>
            {(column) => (
              <TableColumn key={column.uid} className={`py-4 px-8 ${column.uid === 'action' ? 'text-right' : 'text-left'}`}>
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

export default Users;
