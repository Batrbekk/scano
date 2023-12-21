import Image from "next/image";
import { NextPage } from "next";
import React, {Key, useCallback, useEffect, useState} from "react";
import Edit from '@public/assets/icons/editBlue.svg';
import MainLayout from "@/components/layout/mainLayout";
import Delete from '@public/assets/icons/deleteBlue.svg';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import Button from "@/components/atom/Button";
import {useRouter} from "next/router";
import ProtectLayout from "@/components/layout/protectLayout";
import {Tooltip} from "@nextui-org/tooltip";
import {Notification} from "@/types";
import {getCookie, setCookie} from "cookies-next";
import {Spinner} from "@nextui-org/spinner";

const messageIndex: NextPage = () => {
  const tableColumn = [
    {name: 'Тема', uid: 'theme'},
    {name: 'Создано', uid: 'conditions'},
    {name: 'Пользователь', uid: 'users'},
    {name: 'E-mail', uid: 'email'},
    {name: 'Telegram', uid: 'telegram'},
    {name: 'Действия', uid: 'action'}
  ];
  const router = useRouter();

  const token = getCookie('scano_acess_token');
  const [notif, setNotif] = useState<ReadonlyArray<Notification>>([]);
  const [pending, setPending] = useState<boolean>(false);

  const handleNotif = async () => {
    setNotif([]);
    try {
      setPending(true);
      const res = await fetch('https://scano-0df0b7c835bf.herokuapp.com/api/v1/notification_plans/' ,
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
        setNotif(data);
      } else {
        setPending(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotif = async (id: string) => {
    try {
      setNotif([]);
      setPending(true);
      const res = await fetch(`https://scano-0df0b7c835bf.herokuapp.com/api/v1/notification_plans/${id}` ,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (res.ok) {
        handleNotif();
        setPending(false);
      } else {
        setPending(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleNotif();
  }, []);


  const renderCell = useCallback((row: Notification, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Notification];

    switch (columnKey) {
      case 'theme':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.theme_id}</p>
          </div>
        )
      case 'conditions':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.created_at}</p>
          </div>
        )
      case 'users':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.admin_id}</p>
          </div>
        )
      case 'email':
        return (
          <div className="py-2 px-8 flex flex-col gap-y-1">
            {row.email_list.length > 0 ? (
              row.email_list.map((item) => (
                <p key={item} className="prose prose-sm">{item}</p>
              ))
            ) : (
              <p className="prose prose-sm">Пусто</p>
            )}
          </div>
        )
      case 'telegram':
        return (
          <div className="py-2 px-8">
            {row.telegram_channel_ids.length > 0 ? (
              row.telegram_channel_ids.map((item) => (
                <p key={item} className="prose prose-sm">{item}</p>
              ))
            ) : (
              <p className="prose prose-sm">Пусто</p>
            )}
          </div>
        )
      case 'action':
        return (
          <div className="py-4 px-8 flex items-center gap-x-2">
            <Tooltip content="Редактировать">
              <button className="bg-[#ebf1fd] rounded p-2" onClick={() => {
                setCookie('currentNotifId', row._id);
                router.push('/message/editMessage');
              }}>
                <Image src={Edit} width={14} height={14} alt="icon"/>
              </button>
            </Tooltip>
            <Tooltip content="Удалить">
              <button className="bg-[#ebf1fd] rounded p-2" onClick={() => {
                deleteNotif(row._id);
              }}>
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
            <TableBody
              isLoading={pending}
              loadingContent={
                <div className="flex items-center justify-center h-10">
                  <Spinner label="Загрузка..." color="success" />
                </div>
              }
              emptyContent={
                <p className={`${pending && ('opacity-0')}`}>
                  Нету данных...
                </p>
              }
              items={notif}
            >
              {(item) => (
                <TableRow key={item._id} className="border-b last:border-0 hover:bg-[#fcfcfd]">
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
