import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {useRouter} from "next/router";
import React, {Key, useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Edit from "@public/assets/icons/editBlue.svg";
import Delete from "@public/assets/icons/deleteBlue.svg";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import Button from "@/components/atom/Button";
import ProtectLayout from "@/components/layout/protectLayout";
import {getCookie, setCookie} from "cookies-next";
import {Subscription} from "@/types";

const subscribeIndex: NextPage = () => {
  const router = useRouter();
  const token = getCookie('scano_acess_token');
  const [pending, setPending] = useState<boolean>(false);
  const [subs, setSubs] = useState<ReadonlyArray<Subscription>>([]);

  const handleSubs = async () => {
    setSubs([]);
    try {
      setPending(true);
      const res = await fetch('https://scano-0df0b7c835bf.herokuapp.com/api/v1/subscriptions/' ,
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
        setSubs(data);
      } else {
        setPending(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleSubs();
  }, []);

  const tableColumn = [
    {name: 'Тема', uid: 'theme_id'},
    {name: 'E-mail', uid: 'email'},
    {name: 'Формат', uid: 'format'},
    {name: 'Заголовок', uid: 'header'},
    {name: 'Подзаголовок', uid: 'subheader'},
    {name: 'Действия', uid: 'action'}
  ];

  const renderCell = useCallback((row: Subscription, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Subscription];

    switch (columnKey) {
      case 'theme':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.theme_id}</p>
          </div>
        )
      case 'email':
        return (
          <div className="py-2 px-8 flex flex-col">
            {row.emails.map((item) => (
              <p className="prose prose-sm">{item}</p>
            ))}
          </div>
        )
      case 'format':
        return (
          <div className="py-2 px-8 flex flex-col">
            {row.file_format_types.map((item) => (
              <p className="prose prose-sm uppercase">{item}</p>
            ))}
          </div>
        )
      case 'header':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.header}</p>
          </div>
        )
      case 'subheader':
        return (
          <div className="py-2 px-8">
            <p className="prose prose-sm">{row.subheader}</p>
          </div>
        )
      case 'action':
        return (
          <div className="py-4 px-8 flex items-center gap-x-2">
          <button className="bg-[#ebf1fd] rounded p-2" onClick={() => {
            setCookie('currentSubs', row._id);
            router.push('/subscribe/editSubscribe');
          }}>
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
    <ProtectLayout>
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
            <TableBody items={subs}>
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

export default subscribeIndex;
