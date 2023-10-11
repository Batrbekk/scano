import Image from "next/image";
import { NextPage } from "next";
import { ru } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { Input } from "@nextui-org/input";
import Search from "@public/assets/icons/search.svg";
import Export from "@public/assets/icons/export.svg";
import MainLayout from "@/components/layout/mainLayout";
import React, { forwardRef, useRef, useState } from "react";

const dashboardIndex: NextPage = () => {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <MainLayout>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-6">
            <p className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold w-full">Меню атауы</p>
            <Input
              value={search}
              onChange={handleSearchChange}
              placeholder="Тақырыптың ішінен іздеу"
              radius="none"
              classNames={{
                input: [
                  "w-[324px]",
                  "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight"
                ],
                inputWrapper: [
                  "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                  "font-['Montserrat',sans-serif] text-base font-semibold",
                ]
              }}
              endContent={
                <Image src={Search} width={16} height={16} alt="icon" />
              }
            />
          </div>
          <div className="flex items-center gap-x-6">
            <button className="flex items-center gap-x-1">
              <Image src={Export} alt="icon" />
              <p className="font-['Montserrat',sans-serif] text-base font-semibold text-[#35415A]">Экспорт</p>
            </button>
            <div>
              <DatePicker
                showIcon
                locale={ru}
                endDate={endDate}
                selectsRange={true}
                startDate={startDate}
                placeholderText="Выберите период"
                onChange={(update) => {
                  setDateRange(update);
                }}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default dashboardIndex;
