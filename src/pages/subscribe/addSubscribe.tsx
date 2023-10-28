import {NextPage} from "next";
import Image from "next/image";
import React, {useState} from "react";
import {Tab, Tabs} from "@nextui-org/tabs";
import Select from "@/components/atom/Select";
import Pdf from '@public/assets/icons/pdf.svg';
import Word from '@public/assets/icons/word.svg';
import {Input, Textarea} from "@nextui-org/input";
import Excel from '@public/assets/icons/excel.svg';
import {Radio, RadioGroup} from "@nextui-org/radio";
import MainLayout from "@/components/layout/mainLayout";

const addSubscribe: NextPage = () => {
  const options = ['АО "Кселл"', 'option2', 'option3'];
  const periodOption = ['Раз в день', '2 раза в день', '1 раз в неделю'];
  const hourOption = ['00 ч.', '1 ч.', '2 ч.'];
  const minuteOption = ['00 мин.', '15мин.', '30мин.'];
  const docFormat = [
    {
      value: 'Excel',
    },
    {
      value: 'Word',
    },
    {
      value: 'PDF',
    }];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [periodSelectedOption, setPeriodSelectedOption] = useState(periodOption[0]);
  const [hourSelectedOption, setHourSelectedOption] = useState(hourOption[0]);
  const [minuteSelectedOption, setMinuteSelectedOption] = useState(minuteOption[0]);
  const [formatSelect, setFormatSelect] = useState('');

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handlePeriodSelectChange = (value: string) => {
    setPeriodSelectedOption(value);
  };

  const handleHourSelectChange = (value: string) => {
    setHourSelectedOption(value);
  };

  const handleMinuteSelectChange = (value: string) => {
    setMinuteSelectedOption(value);
  };

  const handleFormatSelect = (value: string) => {
    setFormatSelect(value);
  };

  return (
    <MainLayout>
      <div className="max-w-[70%] pb-10">
        <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-2xl">Создание новой подписки</p>
        <div className="mt-4 rounded-lg bg-white p-4">
          <div className="flex flex-col gap-y-1 w-full">
            <p className="prose prose-sm text-[#979ca9]">Тема</p>
            <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
          </div>
          <div className="flex flex-col gap-y-1 w-full mt-4">
            <div className="w-full flex items-center justify-between">
              <p className="prose prose-sm text-[#979ca9]">E-mail</p>
              <p className="prose prose-sm text-[#979ca9]">Можно ввести несколько e-mil через запятую (не более 20)</p>
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
        <div className="mt-4 rounded-lg bg-white p-4">
          <div className="flex flex-col gap-y-1 w-full">
            <p className="prose prose-sm text-[#979ca9]">Получать</p>
            <RadioGroup
              orientation="horizontal"
              classNames={{
                wrapper: 'gap-x-6'
              }}
            >
              <Radio value="new-mess"><p className="prose prose-sm">Новые сообщения</p></Radio>
              <Radio value="report"><p className="prose prose-sm">Отчет</p></Radio>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-x-6 mt-4 w-full">
            <div className="flex flex-col gap-y-1 w-[300px]">
              <p className="prose prose-sm text-[#979ca9]">Периодичность</p>
              <Select options={periodOption} value={periodSelectedOption} onChange={handlePeriodSelectChange} classSelect="w-full" />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="prose prose-sm text-[#979ca9]">Время получения (UTC +6)</p>
              <div className="flex items-center gap-x-4">
                <Select options={hourOption} value={hourSelectedOption} onChange={handleHourSelectChange} />
                <Select options={minuteOption} value={minuteSelectedOption} onChange={handleMinuteSelectChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-white p-4">
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Формат</p>
          <div className="flex items-center gap-x-6 mt-4">
            {docFormat.map((item) => (
              <div key={item.value} className={`flex items-center gap-x-2 p-2 ${formatSelect === item.value && 'bg-[#d8e4f9] rounded-lg'}`} onClick={() => handleFormatSelect(item.value)}>
                {item.value === 'Excel' && (<Image src={Excel} alt="icon" width={32} height={32} />)}
                {item.value === 'Word' && (<Image src={Word} alt="icon" width={32} height={32} />)}
                {item.value === 'PDF' && (<Image src={Pdf} alt="icon" width={42} height={42} />)}
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-1 w-1/2 mt-4">
            <p className="prose prose-sm text-[#979ca9]">Заголовок</p>
            <Input classNames={{
              base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
            }} variant="bordered" />
          </div>
          <div className="flex flex-col gap-y-1 w-1/2 mt-4">
            <p className="prose prose-sm text-[#979ca9]">Подзаголовок</p>
            <Input classNames={{
              base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
            }} variant="bordered" />
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-white p-4">
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Фильтр данных для отчета</p>
          <div className="mt-4">
            <Tabs variant="light" disabledKeys={["videos"]} aria-label="Tabs" radius="full" classNames={{
              cursor: 'group-data-[selected=true]:bg-[#5b85ce]',
              tabContent: 'group-data-[selected=true]:text-white'
            }}>
              <Tab key="photos" title="Вся тема"/>
              <Tab key="music" title="Выбранные теги"/>
              <Tab key="videos" title="Выбранные персональные данные" />
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default addSubscribe;
