import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {Input, Textarea} from "@nextui-org/input";
import React, {useState} from "react";
import Select from "@/components/atom/Select";
import Image from "next/image";
import Info from "@public/assets/icons/info.svg";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {Button} from "@nextui-org/react";
import ProtectLayout from "@/components/layout/protectLayout";

const PlaceSettings: NextPage = () => {
  const options = ['Актив', 'option2', 'option3'];
  const src = ['Выбрать все типы источников', 'asd', 'asd2'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectSrc, setSelectSrc] = useState(src[0]);
  const [filter, setFilter] = useState(false);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleSelectSrc = (value: string) => {
    setSelectSrc(value);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="pb-10">
          <div className="p-4 bg-white rounded-lg w-2/3">
            <div className="flex items-center gap-x-4 relative">
              <div className="flex flex-col gap-y-1 w-2/3">
                <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Название темы</p>
                <Input
                  radius="none"
                  classNames={{
                    input: [
                      "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight w-full"
                    ],
                    inputWrapper: [
                      "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                      "font-['Montserrat',sans-serif] text-base font-semibold",
                      "min-h-unit-9 h-unit-9"
                    ]
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-1/3">
                <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Тип темы</p>
                <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
              </div>
              <div className="absolute right-[-70%]">
                <div className="flex items-start gap-x-2">
                  <Image src={Info} alt="icon" />
                  <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-[40%]">
                    От типа темы зависит не только область поиска, но и состав метрик сообщений и отчетов. <span className="text-[#557abd] cursor-pointer">Подробнее.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-4 my-4">
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Права</p>
              <RadioGroup
                orientation="horizontal"
                classNames={{
                  wrapper: 'gap-x-6'
                }}
              >
                <Radio value="new-mess"><p className="prose prose-sm">Форма с операторами</p></Radio>
                <Radio value="report"><p className="prose prose-sm">форма - конструктор</p></Radio>
              </RadioGroup>
            </div>
            <div className="flex items-center relative">
              <div className="flex flex-col gap-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="prose prose-sm text-[#979ca9]">Поисковые слова</p>
                  <p className="prose prose-sm text-[#979ca9]">До 20 слов или словосочетании</p>
                </div>
                <Textarea
                  placeholder=""
                  variant="bordered"
                  classNames={{
                    base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
                  }}
                />
              </div>
              <div className="absolute right-[-42%]">
                <div className="flex items-start gap-x-2">
                  <Image src={Info} alt="icon" />
                  <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-[80%]">
                    Описание <span className="text-[#557abd] cursor-pointer">языкова поисковых запросов</span> <br/>
                    <span className="text-[#557abd] cursor-pointer">Подробное руководство</span> <br/> по созданию поисковых запросов примеров
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mt-2">
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <p className="prose prose-sm text-[#979ca9]">Минус-слова</p>
                  <p className="prose prose-sm text-[#979ca9]">До 50 слов или словосочетании</p>
                </div>
                <Textarea
                  placeholder=""
                  variant="bordered"
                  classNames={{
                    base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-4 my-4">
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Источники</p>
              <RadioGroup
                orientation="horizontal"
                classNames={{
                  wrapper: 'gap-x-6'
                }}
              >
                <Radio value="new-mess"><p className="prose prose-sm">типы источников</p></Radio>
                <Radio value="report"><p className="prose prose-sm">источники</p></Radio>
              </RadioGroup>
            </div>
            <div className="flex items-center gap-x-4 relative">
              <div className="flex flex-col gap-y-1 w-full">
                <Select options={src} value={selectSrc} onChange={handleSelectSrc} classSelect="w-full" />
              </div>
              <div className="absolute right-[-63%]">
                <div className="flex items-start gap-x-2">
                  <Image src={Info} alt="icon" />
                  <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d] w-[50%]">
                    <span className="text-[#557abd] cursor-pointer">Здесь можно проверить</span> к какому типу относится тот или иной источник
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-4 my-4">
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Фильтры</p>
              <Button variant="light" onClick={handleFilter}>
                <p className="text-[#557abd] prose font-['Work Sans',sans-serif]">{
                  filter ? 'Скрыть' : 'Развернуть'
                }</p>
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default PlaceSettings;
