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
import React, {useCallback, useEffect, useRef, useState} from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Select from "@/components/atom/Select";
import Download from "@public/assets/icons/download.svg";
import {Tab, Tabs} from "@nextui-org/tabs";
import MapChart from "src/components/atom/MapChart";
import PieBlock from "src/components/atom/PieBlock";
import exporting from 'highcharts/modules/exporting';
import BarBlock from "src/components/atom/BarBlock";
import ProtectLayout from "@/components/layout/protectLayout";
import {Mode} from "@/types";
import SocialBlock from "@/components/atom/SocialBlock";
import CityBlock from "@/components/atom/CityBlock";
import AuthorTypeBlock from "@/components/atom/AuthorTypeBlock";
import AuthorGenderBlock from "@/components/atom/AuthorGenderBlock";
import AuthorTable from "@/components/molecule/AuthorTable";
import SrcTable from "@/components/molecule/SrcTable";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

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
  const optionsSelect = [
    {
      label: 'По месяцам',
      key: 30
    },
    {
      label: 'По неделям',
      key: 30
    },
    {
      label: 'В течений дня',
      key: 1
    }
  ];
  const [filterItems, setFilterItems] = useState(chooseFilter);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [selectedOption, setSelectedOption] = useState<any>(optionsSelect[0]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    // Update the chart after the component mounts to ensure the exporting module is available
    if (chartComponentRef.current) {
      chartComponentRef.current.chart.update({
        exporting: {
          enabled: true,
        },
      });
    }
  }, []);

  const downloadChart = () => {
    const chart = chartComponentRef.current?.chart;

    if (chart) {
      // Use exportChart method with required chart options
      chart.exportChart({
        type: 'image/png',
        filename: 'chart',
      }, {
        chart: {
          backgroundColor: '#ffffff',
        },
      });
    }
  };

  const handleSelectChange = (value: Mode) => {
    setSelectedOption(value);
  };

  const removeFilter = (idToRemove: number) => {
    setFilterItems(filterItems.filter(item => item.id !== idToRemove));
  };

  const chartInterval = useCallback(() => {
    if (selectedOption.key === 1) {
      return 3600 * 1000;
    } else {
      return 24 * 3600 * 1000;
    }
  }, [selectedOption]);

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    xAxis: {
      type: 'datetime',
      max: selectedOption.key * 24 * 3600 * 1000,
      tickInterval: chartInterval(),
      dateTimeLabelFormats: {
        day: "%e %b",
        hour: '%H:%M',
      }
    },
    series: [
      {
        name: 'Позитив',
        type: 'line',
        data: [
          [1450023000, 10],
          [1470123000, 4],
          [1490223000, 6],
          [1510323000, 2],
          [1530423000, 1],
          [1550523000, 3],
          [1570623000, 9]
        ],
        color: '#60CA23'
      },
      {
        name: 'Негатив',
        type: 'line',
        data: [
          [1450023000, 11],
          [1470123000, 5],
          [1490223000, 7],
          [1510323000, 3],
          [1530423000, 2],
        ],
        color: '#B00000'
      },
      {
        name: 'Нейтральный',
        type: 'line',
        data: [
          [1450023000, 9],
          [1470123000, 6],
          [1490223000, 8],
          [1510323000, 2],
          [1530423000, 1],
          [1550523000, 5],
          [1570623000, 10]
        ],
        color: '#FFCF48'
      },
      {
        name: 'Количество упоминаний',
        type: 'line',
        data: [
          [1450023000, 8],
          [1470123000, 5],
          [1490223000, 7],
          [1510323000, 3],
          [1530423000, 2],
          [1550523000, 6],
          [1570623000, 9]
        ],
        color: '#7851A9'
      },
    ],
  };

  const tabs = [
    {
      id: 'index',
      label: 'Обзор',
      content: (
        <div className="bg-white rounded-lg px-2 py-6">
          <div className="flex items-center justify-end gap-x-6">
            <Select options={optionsSelect} value={selectedOption} onChange={handleSelectChange} />
            <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center" onClick={downloadChart}>
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
      )
    },
    {
      id: 'src',
      label: 'Источники',
      content: (
        <div className="px-4 flex flex-col gap-4">
          <div className="w-1/2">
            <SocialBlock />
          </div>
          <div className="px-4">
            <SrcTable />
          </div>
        </div>
      )
    },
    {
      id: 'author',
      label: 'Авторы',
      content: (
        <div className="flex flex-col gap-y-4">
          <div className="px-4 flex flex-wrap gap-4">
            <div className="w-[49%]">
              <AuthorTypeBlock/>
            </div>
            <div className="w-[49%]">
              <AuthorGenderBlock/>
            </div>
            <div className="w-[49%]">
              <BarBlock/>
            </div>
          </div>
          <div className="px-4">
            <AuthorTable />
          </div>
        </div>
      )
    },
    {
      id: 'geography',
      label: 'География',
      content: (
        <div className="px-6 flex flex-col gap-y-4">
          <MapChart/>
          <div className="flex items-start gap-x-4">
            <div className="w-1/3">
              <PieBlock/>
            </div>
            <div className="w-1/3">
              <CityBlock />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tags',
      label: 'Теги',
      content: (
        <p>tags</p>
      )
    }
  ];

  return (
    <ProtectLayout>
      <MainLayout withPadding={false}>
        <div className="flex flex-col pb-10">
          <div className="flex flex-col px-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-6">
                <p className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold w-full">Аналитика</p>
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
          <Tabs
            aria-label="Dynamic tabs"
            variant="underlined"
            items={tabs}
            classNames={{
              base: 'bg-white flex items-center justify-between w-full',
              tabList: 'justify-between w-full',
              tab: '[&_span]:!opacity-0 py-8',
              cursor: 'group-data-[selected=true]:bg-transparent border-none',
              tabContent: `group-data-[selected=true]:text-[#008eff] text-black font-medium prose prose-xl`
            }}
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                {item.content}
              </Tab>
            )}
          </Tabs>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default analyticIndex;
