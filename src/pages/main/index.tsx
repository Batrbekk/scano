import { NextPage } from "next";
import Image from "next/image";
import Button from "@/components/atom/Button";
import Select from "@/components/atom/Select";
import Edit from "@public/assets/icons/edit.svg";
import Navbar from "@/components/molecule/Navbar";
import Footer from "@/components/molecule/Footer";
import {Key, useCallback, useEffect, useState} from "react";
import Pause from "@public/assets/icons/pause.svg";
import Delete from "@public/assets/icons/delete.svg";
import Structure from "@public/assets/icons/structure.png";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import InlineChart from "@/components/atom/InlineChart";
import {router} from "next/client";
import {useRouter} from "next/router";
import {getCookie, setCookie} from "cookies-next";
import {Profile} from "@/types";

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
  const options = ['Все группы', 'option2', 'option3'];
  const tableColumn = [
    {name: '#', uid: 'id'},
    {name: 'Название', uid: 'name'},
    {name: 'Сегодня', uid: 'today'},
    {name: 'Неделя', uid: 'week'},
    {name: 'Всего', uid: 'total'}
  ];
  const tableRow = [
    {
      id: 1,
      type: 'CM',
      name: 'АО Кселл',
      date: '19.06.21',
      today: {
        positive: 0,
        neutral: 0,
        negative: 0,
        total: 0
      },
      week: {
        positive: 6,
        neutral: 19,
        negative: 1,
        total: 26,
      },
      total: {
        positive: 999,
        neutral: 6,
        negative: 2,
        total: 1007
      },
    },
    {
      id: 2,
      type: 'CM',
      name: 'ООО Прогресс',
      date: '20.06.21',
      today: {
        positive: 0,
        neutral: 1,
        negative: 0,
        total: 1
      },
      week: {
        positive: 10,
        neutral: 12,
        negative: 5,
        total: 27,
      },
      total: {
        positive: 1000,
        neutral: 5,
        negative: 10,
        total: 1015
      },
    },
    {
      id: 3,
      type: 'CM',
      name: 'ЗАО Развитие',
      date: '21.06.21',
      today: {
        positive: 0,
        neutral: 1,
        negative: 1,
        total: 2
      },
      week: {
        positive: 15,
        neutral: 5,
        negative: 8,
        total: 28,
      },
      total: {
        positive: 988,
        neutral: 4,
        negative: 31,
        total: 1023
      },
    },
    {
      id: 4,
      type: 'CM',
      name: 'ОАО Перспектива',
      date: '22.06.21',
      today: {
        positive: 1,
        neutral: 1,
        negative: 1,
        total: 3
      },
      week: {
        positive: 14,
        neutral: 7,
        negative: 8,
        total: 29,
      },
      total: {
        positive: 999,
        neutral: 3,
        negative: 29,
        total: 1031
      },
    },
    {
      id: 5,
      type: 'CM',
      name: 'ИП Старт',
      date: '23.06.21',
      today: {
        positive: 1,
        neutral: 2,
        negative: 1,
        total: 4
      },
      week: {
        positive: 12,
        neutral: 15,
        negative: 3,
        total: 30,
      },
      total: {
        positive: 998,
        neutral: 6,
        negative: 35,
        total: 1039
      },
    },
    {
      id: 6,
      type: 'CM',
      name: 'ООО Успех',
      date: '24.06.21',
      today: {
        positive: 2,
        neutral: 1,
        negative: 2,
        total: 5
      },
      week: {
        positive: 11,
        neutral: 13,
        negative: 7,
        total: 31,
      },
      total: {
        positive: 999,
        neutral: 11,
        negative: 37,
        total: 1047
      },
    },
    {
      id: 7,
      type: 'CM',
      name: 'АО Процветание',
      date: '25.06.21',
      today: {
        positive: 4,
        neutral: 0,
        negative: 2,
        total: 6
      },
      week: {
        positive: 8,
        neutral: 16,
        negative: 8,
        total: 32,
      },
      total: {
        positive: 999,
        neutral: 4,
        negative: 52,
        total: 1055
      },
    },
    {
      id: 8,
      type: 'CM',
      name: 'ЗАО Рост',
      date: '26.06.21',
      today: {
        positive: 7,
        neutral: 0,
        negative: 0,
        total: 7
      },
      week: {
        positive: 19,
        neutral: 3,
        negative: 11,
        total: 33,
      },
      total: {
        positive: 1000,
        neutral: 2,
        negative: 61,
        total: 1063
      },
    },
    {
      id: 9,
      type: 'CM',
      name: 'ООО Благополучие',
      date: '27.06.21',
      today: {
        positive: 2,
        neutral: 4,
        negative: 2,
        total: 8
      },
      week: {
        positive: 18,
        neutral: 9,
        negative: 7,
        total: 34,
      },
      total: {
        positive: 1000,
        neutral: 8,
        negative: 63,
        total: 1071
      },
    },
    {
      id: 10,
      type: 'CM',
      name: 'АО Фортуна',
      date: '28.06.21',
      today: {
        positive: 0,
        neutral: 2,
        negative: 7,
        total: 9
      },
      week: {
        positive: 13,
        neutral: 17,
        negative: 5,
        total: 35,
      },
      total: {
        positive: 1000,
        neutral: 10,
        negative: 69,
        total: 1079
      },
    }
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

  type Row = typeof tableRow[0];

  const renderCell = useCallback((row: Row, columnKey: Key): any  => {
    const cellValue = row[columnKey as keyof Row];

    switch (columnKey) {
      case 'id':
        return (
          <div className="py-4 px-8 flex items-center gap-x-8">
            <p className="prose prose-sm">{row.id}</p>
            <div className="rounded-xl bg-[#ebecef] py-1 px-3 w-fit">
              <p className="text-xs text-black">{row.type}</p>
            </div>
          </div>
        )
      case 'name':
        return (
          <div className="flex flex-col py-4 px-8">
            <p className="text-lg text-[#4870b7] cursor-pointer" onClick={() => {
              router.push('/dashboard');
            }}>{row.name}</p>
            <div className="flex items-center gap-x-4">
              <p className="prose prose-sm">Данные собираются с {row.date}</p>
              <div className="flex items-center gap-0.5">
                {squares.map(item => (
                  <div className={`rounded-sm w-1.5 h-2 ${item.status === 'FULL' ? 'bg-[#60CA23]' : 'bg-[#cbcfd8]'}`} key={item.id} />
                ))}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-x-4">
              <button className="flex items-center gap-x-1">
                <Image src={Edit} alt="icon" width={14} height={14} />
                <p className="prose text-xs text-[#4870b7]">Редактировать</p>
              </button>
              <button className="flex items-center gap-x-1">
                <Image src={Pause} alt="icon" width={14} height={14} />
                <p className="prose text-xs text-[#4870b7]">Остановить</p>
              </button>
              <button className="flex items-center gap-x-1">
                <Image src={Delete} alt="icon" width={14} height={14} />
                <p className="prose text-xs text-[#4870b7]">Удалить</p>
              </button>
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

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleData = async () => {
    try {
      const res = await fetch(
        'https://scano-0df0b7c835bf.herokuapp.com/api/v1/users/me',
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

  // @ts-ignore
  return (
    <div className="bg-[#F8F9FB] h-full">
      <div className="mb-6">
        {profile && (
          <Navbar email={profile.email} role={profile.role} first_name={profile.first_name} last_name={profile.last_name} photo_url={profile.photo_url} />
        )}
      </div>
      <div className="mb-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-x-8">
            <p className="font-semibold prose prose-xl">Темы</p>
            <Select options={options} value={selectedOption} onChange={handleSelectChange} />
            <div className="flex items-center gap-0.5">
              {squares.map(item => (
                <div className={`rounded-sm w-3 h-3 ${item.status === 'FULL' ? 'bg-[#60CA23]' : 'bg-[#cbcfd8]'}`} key={item.id} />
              ))}
            </div>
            <Button label="Добавить новую тему" size="sm" />
          </div>
          <div className="flex items-center gap-x-8">
            <button className="flex items-center gap-x-2">
              <Image src={Structure} alt="icon" width={14} height={14} />
              <p className="text-[#4c515c] prose prose-base font-['Work Sans',sans-serif]">Группировка тем</p>
            </button>
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
                  <p className="text-[#4c515c] prose prose-sm font-['Work Sans',sans-serif] font-light">{item.label}</p>
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
          <TableBody items={tableRow}>
            {(item) => (
              <TableRow key={item.id} className="border-b hover:bg-[#fcfcfd]">
                {(columnKey) => <TableCell className="p-0">{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mb-4 px-14 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Button label="Добавить новую тему" size="sm" />
          <Button label="Поиск по архиву за год" size="sm" color="bg-[#5b85ce]" />
        </div>
        <div className="flex items-center gap-x-2">
          {links.map((link) => (
            <a href={link.href} key={link.href} className="text-[#5b85ce] prose prose-base border-r-2 pr-2 last:border-0">{link.label}</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default mainIndex;
