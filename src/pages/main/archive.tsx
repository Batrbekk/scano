import Image from "next/image";
import { NextPage } from "next";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "@/components/atom/Select";
import Button from "@/components/atom/Button";
import Info from "@public/assets/icons/info.svg";
import Navbar from "@/components/molecule/Navbar";
import Footer from "@/components/molecule/Footer";

import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const archive: NextPage = () => {
  const options = ['АО "Кселл"', 'option2', 'option3'];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="bg-[#F8F9FB] h-full">
      <div className="mb-6">
        <Navbar />
      </div>
      <div className="flex items-start bg-[#F8F9FB] h-[80vh]">
        <div className="w-1/6 h-full bg-white py-4">
          <div className="bg-gray-100 w-full py-2 px-4 cursor-pointer">
            <p className="prose prose-lg">Архивный сбор</p>
          </div>
          <div className="w-full py-2 px-4 cursor-pointer border-b-2">
            <p className="prose prose-lg">История сборов</p>
          </div>
        </div>
        <div className="py-4 px-6">
          <p className="prose prose-2xl font-semibold mb-6">Архивный сбор</p>
          <div className="flex items-center gap-x-8">
            <div className="bg-white px-4 py-6 rounded-lg flex flex-col gap-y-4 w-[70vw]">
              <div className="flex flex-col gap-y-1 w-full">
                <p className="prose prose-sm text-[#979ca9]">Тема</p>
                <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="prose prose-sm text-[#979ca9]">Период</p>
                <DatePicker
                  showIcon
                  locale={ru}
                  className="w-60"
                  endDate={endDate}
                  selectsRange={true}
                  startDate={startDate}
                  placeholderText="Выберите период"
                  onChange={(update) => {
                    // @ts-ignore
                    setDateRange(update);
                  }}
                />
              </div>
              <Button label="Оценить обьем данных" size="sm" color="bg-[#5b85ce]" classBtn="max-w-fit" />
            </div>
            <div className="flex items-start gap-x-4">
              <Image src={Info} alt="icon" />
              <div className="flex flex-col gap-y-2">
                <p className="prose prose-base">
                  Сбор за год доступен для тем типа "CМИ", "Соцмедиа и СМИ"
                  <br/><br/>
                  Использовано в текущем месяце <br/>
                  3/5 сборов <br/>
                  1791/50 000 сообщений
                </p>
                <a href="#" className="prose prose-base text-[#5b85ce]">Подробнее о лимитах</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default archive;
