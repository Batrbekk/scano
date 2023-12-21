import {NextPage} from "next";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Input} from "@nextui-org/input";
import Select from "@/components/atom/Select";
import Button from "@/components/atom/Button";
import MainLayout from "@/components/layout/mainLayout";
import Notification from "@public/assets/icons/notification.svg";
import ProtectLayout from "@/components/layout/protectLayout";
import {Mode, Profile, Subs} from "@/types";
import {getCookie} from "cookies-next";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import {useRouter} from "next/router";

const addMessage: NextPage = () => {
  const options = [
    {
      label: 'Выберите тему',
      key: ''
    },
    {
      label: 'option2',
      key: 'option2'
    },
    {
      label: 'option3',
      key: 'option3'
    }
  ];
  const notif = [
    {
      label: 'Пришло сообщение',
      key: 'kcell'
    },
    {
      label: 'option2',
      key: 'option2'
    },
    {
      label: 'option3',
      key: 'option3'
    }
  ];
  const users = [
    {
      label: 'Имя фамилия',
      key: 'name'
    },
    {
      label: 'option2',
      key: 'option2'
    },
    {
      label: 'option3',
      key: 'option3'
    }
  ];
  const teleg = [
    {
      label: 'Выберите телеграм',
      key: ''
    }
  ];

  type Theme = {
    _id: string;
    name: string;
  };

  const router = useRouter();
  const profile = getCookie('profile');
  const [count, setCount] = useState<string | undefined>('0');

  const token = getCookie('scano_acess_token');
  const [themes, setThemes] = useState<ReadonlyArray<Theme>>([]);
  const [listUsers, setListUsers] = useState<ReadonlyArray<Profile>>([]);
  const [telegramUsers, setTelegramUsers] = useState<ReadonlyArray<Subs>>([]);
  const [optionTheme, setOptionTheme] = useState<{ key: string; label: string }[]>([]);
  const [optionUsers, setOptionUsers] = useState<{ key: string; label: string }[]>([]);
  const [optionTelegram, setOptionTelegram] = useState<{ key: string; label: string }[]>([]);
  const [sendType, setSendType] = useState<Array<string>>([]);
  const [login, setLogin] = useState('');

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedNotif, setSelectedNotif] = useState(notif[0]);
  const [selectedUsers, setSelectedUsers] = useState(users[0]);
  const [selectedUsersTelegram, setSelectedUsersTelegram] = useState(teleg[0]);

  const [currentProfile, setCurrentProfile] = useState<Profile>();

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(event.target.value);
  };

  const handleSelectUserTelegram = (value: Mode) => {
    setSelectedUsersTelegram(value);
  };

  const handleSelectUser = (value: Mode) => {
    setSelectedUsers(value);
  };

  const handleSelectChange = (value: Mode) => {
    setSelectedOption(value);
  };

  const handleSelectNotif = (value: Mode) => {
    setSelectedNotif(value);
  };

  const getTheme = async () => {
    try {
      const res = await fetch(
        'https://scano-0df0b7c835bf.herokuapp.com/api/v1/themes/',
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
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(
        'https://scano-0df0b7c835bf.herokuapp.com/api/v1/users/',
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
        setListUsers(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getTelegrams = async () => {
    try {
      const res = await fetch(
        'https://scano-0df0b7c835bf.herokuapp.com/api/v1/subscriptions/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setTelegramUsers(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createNotif = async () => {
    try {
      const res = await fetch(
        'https://scano-0df0b7c835bf.herokuapp.com/api/v1/notification_plans/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            theme_id: selectedOption.key,
            is_email: sendType.includes('mail'),
            is_telegram: sendType.includes('telegram'),
            email_list: [`${login}`],
            telegram_channel_ids: [`${selectedUsersTelegram.key}`]
          })
        }
      );
      if (res.ok) {
        router.push('/message');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTheme();
    getUsers();
    getTelegrams();
  }, []);

  useEffect(() => {
    if (themes.length > 0) {
      setOptionTheme(themes.map((item) => ({ "key": item._id, "label": item.name })));
    }
    if (listUsers.length > 0) {
      setOptionUsers(listUsers.map((item) => ({ "key": item._id, "label": `${item.first_name} ${item.last_name}` })));
    }
    if (telegramUsers.length > 0) {
      setOptionTelegram(telegramUsers.map((item) => ({ "key": item._id, "label": `${item.name}` })));
    }
  }, [themes, listUsers, telegramUsers]);

  useEffect(() => {
    if (profile) {
      setCurrentProfile(JSON.parse(profile));
    }
  }, [profile]);

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="flex items-start justify-between">
          <div className="w-full pr-6">
            <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-2xl">Создание нового оповещения</p>
            <div className="rounded bg-white p-8 mt-8">
              <div className="flex flex-col gap-y-1 w-full">
                <p className="prose prose-sm text-[#979ca9]">Тема</p>
                <Select options={optionTheme} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
              </div>
              <div className="flex flex-col gap-y-1 w-full mt-6">
                <p className="prose prose-sm text-[#979ca9]">Оповестить, если</p>
                <Select options={notif} value={selectedNotif} onChange={handleSelectNotif} classSelect="w-full" />
              </div>
              <div className="flex items-center gap-x-4 mt-6">
                <p className="prose prose-base font-['Work Sans',sans-serif]">с аудиторией не менее</p>
                <div className="max-w-20">
                  <Input
                    radius="none"
                    onChange={handleCountChange}
                    value={count}
                    classNames={{
                      input: [
                        "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight"
                      ],
                      inputWrapper: [
                        "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                        "font-['Montserrat',sans-serif] text-base font-semibold",
                      ]
                    }}
                  />
                </div>
                <p className="prose prose-base font-['Work Sans',sans-serif]">человек</p>
              </div>
              <div className="flex flex-col gap-y-1 w-full mt-6">
                <p className="prose prose-sm text-[#979ca9]">Доступно пользователям</p>
                <Select options={optionUsers} value={selectedUsers} onChange={handleSelectUser} classSelect="w-full" />
              </div>
              <div className="mt-6">
                <p className="prose prose-lg font-['Work_Sans',sans-serif] text-[#35415A] font-medium">Получать уведомления</p>
                <div className="flex items-end justify-between">
                  <CheckboxGroup
                    className="mt-2"
                    size="md"
                    value={sendType}
                    onValueChange={setSendType}
                  >
                    <Checkbox value="mail" classNames={{
                      wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                    }}>
                      <p className="prose prose-base font-['Work_Sans',sans-serif]">Электронная почта</p>
                    </Checkbox>
                    <Checkbox value="telegram" classNames={{
                      wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                    }}>
                      <p className="prose prose-base font-['Work_Sans',sans-serif]">Telegram</p>
                    </Checkbox>
                  </CheckboxGroup>
                  <a href="#" className="prose prose-base font-['Work_Sans',sans-serif] text-[#6694d5] font-medium">Описание интеграции с Telegram</a>
                </div>
                <div className="mt-6 flex flex-col gap-y-4">
                  {sendType.includes('telegram') && (
                    <div className="flex flex-col gap-y-1 w-full">
                      <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Telegram</p>
                      <Select options={optionTelegram} value={selectedUsersTelegram} onChange={handleSelectUserTelegram}
                              classSelect="w-full"/>
                      <a href={`https://t.me/scanokz_bot?startgroup=${currentProfile?.admin_id}`} className="mt-2 text-[#5f87cf]">+ Добавить telegram - чат</a>
                    </div>
                  )}
                  {sendType.includes('mail') && (
                    <div className="flex flex-col gap-y-1 w-full">
                      <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Почта</p>
                      <Input
                        radius="none"
                        value={login}
                        onValueChange={setLogin}
                        classNames={{
                          input: [
                            "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight w-full"
                          ],
                          inputWrapper: [
                            "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                            "font-['Montserrat',sans-serif] text-base font-semibold",
                            "min-h-unit-8 h-unit-8"
                          ]
                        }}
                      />
                    </div>
                  )}
                </div>
                <Button label="Сохранить оповещение" size="sm" classBtn="!w-fit mt-6" onClick={() => {
                  createNotif()
                }} />
              </div>
            </div>
          </div>
          <div className="w-64 bg-white p-4 rounded">
            <div className="flex items-center gap-x-4 pb-4 border-b">
              <p className="font-['Work_Sans',sans-serif] text-[#35415A] prose prose-xl">Оповещения</p>
              <Image src={Notification} alt="icon"/>
            </div>
            <div className="border-b mt-2 pb-2">
              <p className="prose prose-base font-['Work_Sans',sans-serif]">Пришло сообщение с аудиторией более или
                равно 0 человек</p>
            </div>
            <div className="border-b mt-2 pb-2">
              <p className="prose prose-base font-['Work_Sans',sans-serif]">Пришло сообщение с аудиторией более или
                равно 0 человек</p>
            </div>
            <div className="border-b mt-2 pb-2">
              <p className="prose prose-base font-['Work_Sans',sans-serif]">Пришло сообщение с аудиторией более или равно 0 человек</p>
            </div>
            <div className="border-b mt-2 pb-2">
              <p className="prose prose-base font-['Work_Sans',sans-serif]">Пришло сообщение с аудиторией более или равно 0 человек</p>
            </div>
            <div className="border-b mt-2 pb-2">
              <p className="prose prose-base font-['Work_Sans',sans-serif]">Пришло сообщение с аудиторией более или равно 0 человек</p>
            </div>
            <div className="mt-2">
              <a href="#" className="text-[#5f87cf] prose prose-base font-['Work_Sans',sans-serif] underline decoration-dashed">Посмотреть все</a>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default addMessage;
