import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React, {Key, useCallback, useState} from "react";
import Image from "next/image";
import Button from "@/components/atom/Button";
import { Button as ButtonUI } from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import Info from "@public/assets/icons/info.svg";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import Select from "@/components/atom/Select";
import User from "@public/assets/icons/user.svg";
import Ask from "@public/assets/icons/ask.svg";
import {Tooltip} from "@nextui-org/tooltip";

const Profile: NextPage = () => {
  const options = ['АО "Кселл"', 'option2', 'option3'];
  const mode = ['модератор', 'супер администратор', 'автор'];

  const [summarySelect, setSummarySelect] = useState(['']);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [adminOption, setAdminOption] = useState(mode[0]);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleAdminChange = (value: string) => {
    setAdminOption(value);
  };

  return(
    <MainLayout>
      <div className="flex flex-col gap-y-6 pb-10">
        <div className="p-4 rounded-lg bg-white flex flex-col gap-y-4 w-2/3">
          <div className="flex items-start gap-x-6">
            <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer">
              <p className="font-['Work Sans',sans-serif] prose prose-sm leading-5 text-center">Добавить <br/> фото</p>
            </div>
            <div className="flex flex-col gap-y-2 w-1/2">
              <div className="flex items-center gap-x-2">
                <p className="font-['Work Sans',sans-serif] prose prose-xl font-semibold">Abylkas</p>
                <Tooltip content="ИНФОРМАЦИЯ">
                  <ButtonUI variant="light" isIconOnly className="p-0" disableAnimation={true}>
                    <Image src={Ask} alt="icon" />
                  </ButtonUI>
                </Tooltip>
              </div>
              <div className="flex items-center gap-x-2">
                <Image src={User} alt="icon" />
                <p className="font-['Work Sans',sans-serif] prose prose-sm border-b border-dashed text-[#5b85ce] border-[#5b85ce]">Супер администратор</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col gap-y-1 w-full">
              <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Имя</p>
              <Input
                radius="none"
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
              <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Компания</p>
              <Input
                radius="none"
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
        <div className="flex items-start gap-x-6">
          <div className="p-4 rounded-lg bg-white w-2/3">
            <div className="flex flex-col gap-y-1">
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Права</p>
              <Checkbox value="admin" classNames={{
                wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
              }}>
                <p className="prose prose-sm text-[#5b5a5d]">Администратор</p>
              </Checkbox>
            </div>
            <div className="flex items-start gap-x-10 mt-4 w-full">
              <div className="flex flex-col gap-y-1">
                <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Темы</p>
                <CheckboxGroup
                  value={summarySelect}
                  onValueChange={setSummarySelect}
                >
                  <Checkbox value="all" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d] font-semibold">Все темы</p>
                  </Checkbox>
                  <Checkbox value="kzt" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">КазАтомПром</p>
                  </Checkbox>
                  <Checkbox value="qazaqgaz" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">АО QazaqGaz</p>
                  </Checkbox>
                  <Checkbox value="kcell" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">АО Кселл</p>
                  </Checkbox>
                  <Checkbox value="newTheme" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">Новые темы</p>
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <div className="flex items-center gap-x-4 w-1/2">
                <Select options={mode} value={adminOption} onChange={handleAdminChange} classSelect="w-full" />
                <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
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
        <Button label="Добавить пользователя" size="sm" classBtn="!w-fit" />
      </div>
    </MainLayout>
  )
}

export default Profile;
