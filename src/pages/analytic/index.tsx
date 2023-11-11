import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {Input} from "@nextui-org/input";
import Image from "next/image";
import Search from "@public/assets/icons/search.svg";
import Export from "@public/assets/icons/export.svg";
import DatePicker from "react-datepicker";
import {ru} from "date-fns/locale";
import {Chip} from "@nextui-org/chip";
import Filter from "@public/assets/icons/filter.svg";
import React, {useRef, useState} from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Select from "@/components/atom/Select";
import Download from "@public/assets/icons/download.svg";

const chooseFilter = [
  {
    id: 0,
    title: 'sources',
    value: 'instagram.com'
  },
  {
    id: 1,
    title: 'тоналдық',
    value: 'Негатив'
  }
];

const analyticIndex: NextPage = (props: HighchartsReact.Props) => {
  const optionsSelect = ['По дням', 'По неделям'];
  const [filterItems, setFilterItems] = useState(chooseFilter);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [selectedOption, setSelectedOption] = useState(optionsSelect[0]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const removeFilter = (idToRemove: number) => {
    setFilterItems(filterItems.filter(item => item.id !== idToRemove));
  };

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    series: [
      {
        name: 'Количество упоминаний',
        type: 'line',
        data: [1, 2, 3],
      },
      {
        name: 'Позитив',
        type: 'line',
        data: [0, 1, 5, 2, 4],
      },
    ],
  };

  return (
    <MainLayout withPadding={false}>
      <div className="flex flex-col pb-10">
        <div className="flex flex-col px-6">
          <div className="flex items-center justify-between w-full">
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
          <div className="flex items-center justify-between w-full py-6">
            <div className="flex items-center gap-x-6">
              <p className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold w-full">Фильтр:</p>
              <div className="flex items-center gap-x-3">
                {filterItems.map((item) => (
                  <div className="flex items-center gap-x-1" key={item.id}>
                    <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">{item.title}:</p>
                    <Chip
                      variant="light"
                      classNames={{
                        base: "[&_path]:fill-[#ff0000]",
                        content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold`
                      }}
                      onClose={() => removeFilter(item.id)}
                    >
                      {item.value}
                    </Chip>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={`bg-[#60CA23] prose prose-base text-white font-['Work Sans',sans-serif] py-1 px-4 rounded flex gap-x-2 items-center`}
            >
              <Image src={Filter} alt="icon" />
              Фильтр
            </button>
          </div>
        </div>
        <div></div>
        <div className="px-6">
          <div className="bg-white rounded-lg px-2 py-6">
            <div className="flex items-center justify-end gap-x-6">
              <Select options={optionsSelect} value={selectedOption} onChange={handleSelectChange} />
              <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center">
                <Image src={Download} alt="icon" width={24} height={24} />
              </button>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              ref={chartComponentRef}
              {...props}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default analyticIndex;
