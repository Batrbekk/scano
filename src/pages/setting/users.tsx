import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {useRouter} from "next/router";
import React, {Key, useCallback, useEffect, useState} from "react";
import {Avatar} from "@nextui-org/avatar";
import Image from "next/image";
import Edit from "@public/assets/icons/editBlue.svg";
import Unlock from "@public/assets/icons/unlock.svg";
import Lock from "@public/assets/icons/lock.svg";
import Delete from "@public/assets/icons/deleteBlue.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Button from "@/components/atom/Button";
import ProtectLayout from "@/components/layout/protectLayout";
import {getCookie, setCookie} from "cookies-next";
import {Spinner} from "@nextui-org/spinner";
import {Profile} from "@/types";
import {Tooltip} from "@nextui-org/tooltip";

const Users: NextPage = () => {
  const tableColumn = [
    {name: '', uid: 'avatar'},
    {name: 'Имя', uid: 'name'},
    {name: 'E-mail', uid: 'mail'},
    {name: 'Компания', uid: 'company'},
    {name: 'Права', uid: 'role'},
    {name: 'Действия', uid: 'action'}
  ];
  const router = useRouter();

  const token = getCookie('scano_acess_token');
  const [users, setUsers] = useState<ReadonlyArray<Profile>>([]);
  const [pending, setPending] = useState<boolean>(false);

  const handleUsers = async () => {
    try {
      setPending(true);
      const res = await fetch('https://scano-0df0b7c835bf.herokuapp.com/api/v1/users/' ,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (res.ok) {
        setPending(false);
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } else {
        setPending(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    handleUsers();
  }, []);

  const renderCell = useCallback((row: Profile, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Profile];

    switch (columnKey) {
      case 'avatar':
        return (
          <div className="py-2 px-8">
            <Avatar src={row.admin_id} />
          </div>
        )
      case 'name':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm text-[#6481AD]">
              {row.first_name ? (row.first_name + ' ' + row.last_name) : 'Не указано'}
            </p>
          </div>
        )
      case 'mail':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.email}</p>
          </div>
        )
      case 'company':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.company_name ? row.company_name : 'Не указано'}</p>
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
              <Tooltip content="Редактировать">
                <button className="bg-[#ebf1fd] rounded p-2" onClick={() => {
                  setCookie('currentProfile', row);
                  router.push('/setting/editProfile');
                }}>
                  <Image src={Edit} width={14} height={14} alt="icon"/>
                </button>
              </Tooltip>
            )}
            {row.role !== 'Супер администратор' && (
              <>
                {row.is_active ? (
                  <Tooltip content="Заблокировать">
                    <button className="bg-[#ebf1fd] rounded p-2">
                      <Image src={Unlock} width={14} height={14} alt="icon"/>
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip content="Разблокировать">
                    <button className="bg-[#ebf1fd] rounded p-2">
                      <Image src={Lock} width={14} height={14} alt="icon"/>
                    </button>
                  </Tooltip>
                )}
                <Tooltip content="Редактировать">
                  <button className="bg-[#ebf1fd] rounded p-2" onClick={() => {
                    setCookie('currentProfile', row);
                    router.push('/setting/editProfile');
                  }}>
                    <Image src={Edit} width={14} height={14} alt="icon"/>
                  </button>
                </Tooltip>
                <Tooltip content="Удалить">
                  <button className="bg-[#ebf1fd] rounded p-2">
                    <Image src={Delete} width={14} height={14} alt="icon"/>
                  </button>
                </Tooltip>
              </>
            )}
          </div>
        )
      default:
        return cellValue;
    }
  }, []);

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="flex flex-col" suppressHydrationWarning={true}>
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Пользователи</p>
          <Table
            aria-label="Example table with custom cells"
            className="bg-white rounded-lg mt-8"
            bottomContent={
              <Button label="Добавить пользователя" onClick={() => {
                router.push('/setting/addProfile')
              }} size="sm" classBtn="max-w-fit mt-4" color="bg-[#5b85ce]" />
            }
          >
            <TableHeader columns={tableColumn}>
              {(column) => (
                <TableColumn key={column.uid} className={`py-4 px-8 ${column.uid === 'action' ? 'text-right' : 'text-left'}`}>
                  <p className="prose prose-sm font-normal">{column.name}</p>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={users}
              isLoading={pending}
              loadingContent={
                <div className="flex items-center justify-center h-10">
                  <Spinner label="Загрузка..." />
                </div>
              }
              emptyContent={
                <p className={`${pending && ('opacity-0')}`}>
                  Нету данных...
                </p>
              }
            >
              {(item: Profile) => (
                <TableRow key={item.admin_id} className="border-b last:border-0 hover:bg-[#fcfcfd]">
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

export default Users;
