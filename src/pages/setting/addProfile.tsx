import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {Input} from "@nextui-org/input";
import React, {useEffect, useState} from "react";
import Info from "@public/assets/icons/info.svg";
import Image from "next/image";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import Select from "@/components/atom/Select";
import Button from "@/components/atom/Button";
import ProtectLayout from "@/components/layout/protectLayout";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import {Mode, Theme} from "@/types";
import {Spinner} from "@nextui-org/spinner";

const addProfile: NextPage = () => {
  const mode = [
    {
      label: 'Администратор',
      key: 'admin'
    },
    {
      label: 'Модератор',
      key: 'moderator'
    },
    {
      label: 'Гость',
      key: 'guest'
    }
  ];
  const [summarySelect, setSummarySelect] = useState<Array<string>>(['']);
  const [adminOption, setAdminOption] = useState<Mode>(mode[0]);

  const router = useRouter();
  const token = getCookie('scano_acess_token');
  const [pending, setPending] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [chooseAll, setChooseAll] = useState(false);
  const [themes, setThemes] = useState<ReadonlyArray<Theme>>([]);

  const handleAdminChange = (value: Mode) => {
    setAdminOption(value);
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

  const createProfile = async () => {
    try {
      setPending(true);
      const res = await fetch(
        `https://test.scano.kz/api/v1/users/`,
        {
          method: 'POST', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            first_name: name,
            last_name: surname,
            company_name: company,
            role: adminOption.key,
            email: email,
            theme_ids: summarySelect
          }),
        }
      );
      if (res.ok) {
        setPending(false);
        await router.push('/setting/users');
      } else {
        setPending(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    const allKeys = themes.map(theme => theme._id);
    if (chooseAll) {
      setSummarySelect(allKeys);
    } else {
      setSummarySelect([]);
    }
  }, [chooseAll]);

  return(
    <ProtectLayout>
      <MainLayout>
        <div className="flex flex-col gap-y-6 pb-10">
          <div className="flex items-start gap-x-6">
            <div className="p-4 rounded-lg bg-white flex flex-col gap-y-4 w-2/3">
              <div className="flex items-start gap-x-6">
                <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer">
                  <p className="font-['Work Sans',sans-serif] prose prose-sm leading-5 text-center">Добавить <br/> фото</p>
                </div>
                <div className="flex flex-col gap-y-2 w-1/2">
                  <div className="flex flex-col gap-y-1 w-full">
                    <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Имя</p>
                    <Input
                      radius="none"
                      value={name}
                      onValueChange={setName}
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
                  <div className="flex flex-col gap-y-1 w-full">
                    <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Фамилия</p>
                    <Input
                      radius="none"
                      value={surname}
                      onValueChange={setSurname}
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
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="flex flex-col gap-y-1 w-full">
                  <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">E-mail</p>
                  <Input
                    radius="none"
                    value={email}
                    onValueChange={setEmail}
                    classNames={{
                      input: [
                        "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight"
                      ],
                      inputWrapper: [
                        "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                        "font-['Montserrat',sans-serif] text-base font-semibold",
                        "min-h-unit-8 h-unit-8"
                      ]
                    }}
                  />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                  <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Компания</p>
                  <Input
                    radius="none"
                    value={company}
                    onValueChange={setCompany}
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
              </div>
            </div>
            <div className="flex items-start gap-x-2">
              <Image src={Info} alt="icon" />
              <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-1/2">
                Созданному пользователю будет отправлен e-mail c паролем. При необходимости пароль можно сменить в настройках.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-x-6">
            <div className="p-4 rounded-lg bg-white w-2/3">
              <div className="flex flex-col gap-y-1">
                <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Права</p>
                <Select options={mode} value={adminOption} onChange={handleAdminChange} classSelect="!w-1/2" />
              </div>
              <div className="flex items-start gap-x-10 mt-4 w-full">
                <div className="flex flex-col gap-y-1">
                  <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Темы</p>
                  <div className="mb-1">
                    <Checkbox isSelected={chooseAll} onValueChange={setChooseAll} classNames={{
                      wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                    }}>
                      <p className="prose prose-sm text-[#5b5a5d] font-semibold">Все темы</p>
                    </Checkbox>
                  </div>
                  <CheckboxGroup
                    value={summarySelect}
                    onValueChange={setSummarySelect}
                  >
                    {themes.map((item) => (
                      <Checkbox value={item._id} classNames={{
                        wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                      }}>
                        <p className="prose prose-sm text-[#5b5a5d]">{item.name}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex items-start gap-x-2">
                <Image src={Info} alt="icon" />
                <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-1/2">
                  Администратору доступны все темы с модами модератора, а так же создание новых тем и добавление пользователей
                </p>
              </div>
              <div className="flex items-start gap-x-2">
                <Image src={Info} alt="icon" />
                <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-1/2">
                  Модератор имеет возможность просматривать и редактировать темы, на которые у него есть права модератора. <span className="text-[#557abd] cursor-pointer">Подробнее</span>
                </p>
              </div>
            </div>
          </div>
          <Button label={
            pending ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Добавить пользователя"
            )
          } size="sm" classBtn="!w-fit" onClick={createProfile} />
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default addProfile;
