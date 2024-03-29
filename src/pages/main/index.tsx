import { NextPage } from "next";
import Image from "next/image";
import Button from "@/components/atom/Button";
import { Tooltip } from "@nextui-org/tooltip";
import Edit from "@public/assets/icons/edit.svg";
import Navbar from "@/components/molecule/Navbar";
import Footer from "@/components/molecule/Footer";
import React, {Key, useCallback, useEffect, useState} from "react";
import Pause from "@public/assets/icons/pause.svg";
import Delete from "@public/assets/icons/delete.svg";
import Structure from "@public/assets/icons/structure.png";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import InlineChart from "@/components/atom/InlineChart";
import {useRouter} from "next/router";
import {getCookie, setCookie} from "cookies-next";
import {Profile, Theme} from "@/types";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import { format } from "date-fns";
import ProtectLayout from "@/components/layout/protectLayout";
import {Spinner} from "@nextui-org/spinner";
import {Progress} from "@nextui-org/progress";

const mainIndex: NextPage = () => {
  const router = useRouter();
  const squares = [
    {
      id: 1,
      status: 'FULL'
    },
    {
      id: 2,
      status: 'FULL'
    },
    {
      id: 3,
      status: 'FULL'
    },
    {
      id: 4,
      status: 'FULL'
    },
    {
      id: 5,
      status: 'FULL'
    },
    {
      id: 6,
      status: 'TRANSPARENT'
    },
    {
      id: 7,
      status: 'TRANSPARENT'
    },
    {
      id: 8,
      status: 'TRANSPARENT'
    },
    {
      id: 9,
      status: 'TRANSPARENT'
    },
    {
      id: 10,
      status: 'TRANSPARENT'
    }
  ];
  const historyStatus = [
    {
      id: 1,
      status: 'POSITIVE',
      label: 'Позитив'
    },
    {
      id: 2,
      status: 'NEUTRAL',
      label: 'Нейтрально'
    },
    {
      id: 3,
      status: 'NEGATIVE',
      label: 'Негатив'
    }
  ];
  const tableColumn = [
    {name: '#', uid: '_id'},
    {name: 'Название', uid: 'name'},
    {name: 'Сегодня', uid: 'today'},
    {name: 'Неделя', uid: 'week'},
    {name: 'Всего', uid: 'total'}
  ];
  const links = [
    {
      label: 'Архивный сбор',
      href: '/main/archive'
    },
    {
      label: 'Добавление сообщений в тему',
      href: '/main/addMessage'
    },
    {
      label: 'Копирование настроек темы',
      href: '#'
    },
    {
      label: 'Архив отчетов',
      href: '/main/reportArchive'
    },
  ];
  const token = getCookie('scano_acess_token');
  const [profile, setProfile] = useState<Profile>();
  const [themes, setThemes] = useState<ReadonlyArray<Theme>>([]);
  const [deleteThemeId, setDeleteThemeId] = useState('');
  const [pending, setPending] = useState<boolean>(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [pause, setPause] = useState<boolean>(false);

  const renderCell = useCallback((row: Theme, columnKey: Key) => {
    const cellValue = row[columnKey as keyof Theme];

    switch (columnKey) {
      case '_id':
        return (
          <div className="py-4 px-8 flex items-center gap-x-8">
            <p className="prose prose-sm">{row._id}</p>
            <div className="rounded-xl bg-[#ebecef] py-1 px-3 w-fit">
              <p className="text-xs text-black">{row.theme_type}</p>
            </div>
          </div>
        )
      case 'name':
        return (
          <div className="flex flex-col py-4 px-8">
            <p className="text-lg text-[#4870b7] cursor-pointer" onClick={() => {
              router.push('/dashboard');
              setCookie('currentTheme', row._id);
              setCookie('currentThemeName', row.name);
            }}>{row.name}</p>
            <div className="flex items-center gap-x-4">
              <p className="prose prose-sm">Данные собираются с {format(new Date(row.created_at), 'dd/MM/yyyy')}</p>
              <div className="max-w-[72px] w-full">
                <Tooltip content={`${row.materials_count_percent} из 100`}>
                  <Progress
                    classNames={{
                      track: '!rounded !bg-[#cbcfd8]',
                      indicator: '!bg-[#60CA23] !rounded'
                    }}
                    aria-label="Loading..."
                    value={row.materials_count_percent}
                    size="md"
                  />
                </Tooltip>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-x-4">
              <Tooltip content="Редактирование темы">
                <button className="flex items-center gap-x-1" onClick={() => {updateTheme(row._id)}}>
                  <Image src={Edit} alt="icon" width={14} height={14} />
                  <p className="prose text-xs text-[#4870b7]">Редактировать</p>
                </button>
              </Tooltip>
              <button className="flex items-center gap-x-1" onClick={handlePause}>
                {pause ? (<Image src={Pause} alt="icon" width={14} height={14}/>) : (
                  <Image src={Pause} alt="icon" width={14} height={14}/>
                )}
                <p className="prose text-xs text-[#4870b7]">{pause ? 'Возобновить' : 'Остановить'} {pause}</p>
              </button>
              <Tooltip content="Удаление темы">
                <button className="flex items-center gap-x-1" onClick={() => {
                  openDeleteTheme(row._id)
                }}>
                  <Image src={Delete} alt="icon" width={14} height={14}/>
                  <p className="prose text-xs text-[#4870b7]">Удалить</p>
                </button>
              </Tooltip>
            </div>
          </div>
        )
      case 'today':
        return (
          <div className="flex flex-col py-4 px-8">
            <p className="text-lg prose">{`${row.today.total}`}</p>
            <InlineChart positive={row.today.positive} negative={row.today.negative} neutral={row.today.neutral} />
          </div>
        )
      case 'week':
        return (
          <div className="flex flex-col py-4 px-8">
            <p className="text-lg prose">{`${row.week.total}`}</p>
            <InlineChart positive={row.week.positive} negative={row.week.negative} neutral={row.week.neutral} />
          </div>
        )
      case 'total':
        return (
          <div className="flex flex-col py-4 px-8">
            <p className="text-lg prose">{`${row.total.total}`}</p>
            <InlineChart positive={row.total.positive} negative={row.total.negative} neutral={row.total.neutral} />
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

  const getTheme = async () => {
    try {
      setPending(true);
      const res = await fetch(
        'https://test.scano.kz/api/v1/themes/',
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
        setThemes(data);
        setPending(false);
        console.log(data);
      } else {
        setPending(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openDeleteTheme = (id: string) => {
    console.log(id);
    setDeleteThemeId(id);
    onOpen();
  };

  const updateTheme = (id: string) => {
    console.log(id);
    setCookie('currentTheme', id);
    router.push('setting/editTheme');
  };

  const handlePause = useCallback(() => {
    setPause(!pause);
  }, [pause]);

  const deleteTheme = async () => {
    try {
      const res = await fetch(
        `https://test.scano.kz/api/v1/themes/${deleteThemeId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        setThemes([]);
        onClose();
        getTheme();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleData();
    getTheme();
  }, []);

  return (
    <ProtectLayout>
      <div className="bg-[#F8F9FB] h-screen flex flex-col justify-between">
        <>
          <div className="mb-6">
            {profile && (
              <Navbar email={profile.email} role={profile.role} first_name={profile.first_name}
                      last_name={profile.last_name} photo_url={profile.photo_url}/>
            )}
          </div>
          <div className="mb-8 px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-x-8">
                <p className="font-semibold prose prose-xl">Темы</p>
                <div className="flex items-center gap-0.5">
                  {squares.map(item => (
                    <div className={`rounded-sm w-3 h-3 ${item.status === 'FULL' ? 'bg-[#60CA23]' : 'bg-[#cbcfd8]'}`}
                         key={item.id}/>
                  ))}
                </div>
                <Tooltip content="Добавление новой темы">
                  <Button label="Добавить новую тему" size="sm" onClick={() => {
                    router.push('setting/placeSettings');
                  }}/>
                </Tooltip>
              </div>
              <div className="flex items-center gap-x-8">
                <Tooltip content="Группировать темы">
                  <button className="flex items-center gap-x-2">
                    <Image src={Structure} alt="icon" width={14} height={14}/>
                    <p className="text-[#4c515c] prose prose-base font-['Work Sans',sans-serif]">Группировка тем</p>
                  </button>
                </Tooltip>
                <div className="flex items-center gap-x-4">
                  {historyStatus.map(item => (
                    <div className="flex items-center gap-x-2" key={item.id}>
                      <div
                        className={`rounded-full w-3 h-3 
                      ${item.status === 'POSITIVE' && 'bg-[#60CA23]'}
                      ${item.status === 'NEUTRAL' && 'bg-[#4779d0]'}
                      ${item.status === 'NEGATIVE' && 'bg-[#cf6662]'}
                    `}
                      />
                      <p
                        className="text-[#4c515c] prose prose-sm font-['Work Sans',sans-serif] font-light">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Table aria-label="Example table with custom cells" className="bg-white rounded-lg">
              <TableHeader columns={tableColumn}>
                {(column) => (
                  <TableColumn key={column.uid} className="text-left py-4 px-8">
                    {column.uid !== 'name' ? (
                      <p className="prose prose-sm">{column.name}</p>
                    ) : (
                      <div className="rounded-2xl bg-[#ebecef] py-1 px-2 w-fit">
                        <p className="prose prose-sm">{column.name}</p>
                      </div>
                    )}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={themes}
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
              >
                {(item) => (
                  <TableRow key={item._id} className="border-b hover:bg-[#fcfcfd]">
                    {(columnKey) => <TableCell className="p-0">{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mb-4 px-14 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Button label="Добавить новую тему" size="sm" onClick={() => {
                router.push('setting/placeSettings');
              }}/>
              <Button label="Поиск по архиву за год" size="sm" color="bg-[#5b85ce]"/>
            </div>
            <div className="flex items-center gap-x-2">
              {links.map((link) => (
                <a href={link.href} key={link.href}
                   className="text-[#5b85ce] prose prose-base border-r-2 pr-2 last:border-0">{link.label}</a>
              ))}
            </div>
          </div>
        </>
        <div className="mt-auto">
          <Footer/>
        </div>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Удаление темы</ModalHeader>
                <ModalBody>
                  <p>Вы уверены что хотите удалить данную тему?</p>
                </ModalBody>
                <ModalFooter>
                  <Button label="Отмена" size="sm" color="bg-[#5b85ce]" onClick={onClose}/>
                  <Button label="Удалить" size="sm" color="bg-[#cf6662]" onClick={() => deleteTheme()}/>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </ProtectLayout>
  )
}

export default mainIndex;
