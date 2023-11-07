import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React, {useState} from "react";
import Image from "next/image";
import Button from "@/components/atom/Button";
import { Button as ButtonUI } from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import Info from "@public/assets/icons/info.svg";
import Select from "@/components/atom/Select";
import User from "@public/assets/icons/user.svg";
import Ask from "@public/assets/icons/ask.svg";
import {Tooltip} from "@nextui-org/tooltip";
import {Radio, RadioGroup} from "@nextui-org/radio";
import Eye from "@public/assets/icons/eye.svg";
import CloseEye from "@public/assets/icons/closeEye.svg";

const Profile: NextPage = () => {
  const options = ['UCT +6', 'UCT +7', 'UCT +8'];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return(
    <MainLayout>
      <div className="flex flex-col gap-y-6 pb-10">
        <div className="flex items-start gap-x-6 w-full">
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
        </div>
        <div className="flex items-start gap-x-6 w-full">
          <div className="flex items-stretch w-2/3 gap-x-4">
            <div className="p-4 rounded-lg bg-white w-full">
              <div className="flex flex-col gap-y-1">
                <p className="prose font-['Work Sans',sans-serif] mb-2">Язык интерфейса</p>
                <RadioGroup
                  orientation="horizontal"
                  classNames={{
                    wrapper: 'gap-x-6'
                  }}
                >
                  <Radio value="new-mess"><p className="prose prose-sm">Руский</p></Radio>
                  <Radio value="report"><p className="prose prose-sm">Английский</p></Radio>
                </RadioGroup>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white w-full">
              <p className="prose font-['Work Sans',sans-serif] mb-2">Часовой пояс</p>
              <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
            </div>
          </div>
          <div className="flex items-start gap-x-2">
            <Image src={Info} alt="icon" />
            <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-1/2">
              Часовой пояс пользователя влияет на просмотр данных в интерфейсе системы. Подписки и оповещения создаются по часовому поясу Супер Администратор аккаунта (UTC +6)
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-6 w-full">
          <div className="p-4 rounded-lg bg-white w-2/3">
            <p className="font-['Work Sans',sans-serif] prose mb-2">Сменить пароль</p>
            <div className="flex items-center gap-x-4 w-full">
              <div className="flex flex-col gap-y-1 w-full">
                <p className="prose prose-sm text-[#979ca9]">Новый пароль</p>
                <Input
                  variant="bordered"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <Image src={CloseEye} alt="icon" />
                      ) : (
                        <Image src={Eye} alt="icon" />
                      )}
                    </button>
                  }
                  classNames={{
                    input: [
                      "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight"
                    ],
                    inputWrapper: [
                      "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                      "font-['Montserrat',sans-serif] text-base font-semibold",
                    ]
                  }}
                  type={isVisible ? "text" : "password"}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <p className="prose prose-sm text-[#979ca9]">Подтвердите новый пароль</p>
                <Input
                  variant="bordered"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <Image src={CloseEye} alt="icon" />
                      ) : (
                        <Image src={Eye} alt="icon" />
                      )}
                    </button>
                  }
                  classNames={{
                    input: [
                      "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight"
                    ],
                    inputWrapper: [
                      "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                      "font-['Montserrat',sans-serif] text-base font-semibold",
                    ]
                  }}
                  type={isVisible ? "text" : "password"}
                />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-x-2">
            <Image src={Info} alt="icon" />
            <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-1/2">
              Пароль должен содержать не менее 8 знаков, включать заглавные и строчные латинские буквы, цифры и специальные символы.
            </p>
          </div>
        </div>
        <Button label="Сохранить изменения" size="sm" classBtn="!w-fit" color="bg-[#5b85ce]" />
      </div>
    </MainLayout>
  )
}

export default Profile;
