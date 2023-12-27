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
import CountryTable from "@/components/molecule/CountryTable";
import CityTable from "@/components/molecule/CityTable";
import TagBlock from "@/components/atom/TagBlock";
import TagTable from "@/components/molecule/TagTable";
import TagDynamicTable from "@/components/molecule/TagDynamicTable";
import {Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import Excel from "@public/assets/icons/excel.svg";
import Word from "@public/assets/icons/word.svg";
import Pdf from "@public/assets/icons/pdf.svg";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import {getCookie} from "cookies-next";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

const filterTabs = [
  {
    id: 0,
    label: 'Основные',
    key: 'main'
  },
  {
    id: 1,
    label: 'Источники',
    key: 'src'
  },
  {
    id: 2,
    label: 'Авторы',
    key: 'author'
  },
  {
    id: 3,
    label: 'География',
    key: 'geography'
  },
  {
    id: 4,
    label: 'Теги',
    key: 'tags'
  }
];
const toneOption = [
  {
    title: 'Область поиска',
    key: 'positive',
    label: 'Позитив'
  },
  {
    title: 'Область поиска',
    key: 'negative',
    label: 'Негатив'
  },
  {
    title: 'Область поиска',
    key: 'neutral',
    label: 'Нейтрально'
  }
];
const materialType = [
  {
    title: 'Тип материала',
    label: 'Пост',
    key: 'post'
  },
  {
    title: 'Тип материала',
    label: 'Репост',
    key: 'repost'
  },
  {
    title: 'Тип материала',
    label: 'Комментарий',
    key: 'comment'
  },
  {
    title: 'Тип материала',
    label: 'Сториз',
    key: 'stories'
  }
];
const lang = [
  {
    title: 'Язык материала',
    label: 'Казахский',
    key: 'kk'
  },
  {
    title: 'Язык материала',
    label: 'Русский',
    key: 'ru'
  },
  {
    title: 'Язык материала',
    label: 'Английский',
    key: 'en'
  }
];
const collection = [
  {
    title: 'Тип источника',
    label: 'Социальные сети',
    key: 'social_network'
  },
  {
    title: 'Тип источника',
    label: 'Видео',
    key: 'video'
  },
  {
    title: 'Тип источника',
    label: 'канал в мессенджерах',
    key: 'messenger_chanel'
  },
  {
    title: 'Тип источника',
    label: 'группы в мессенджерах',
    key: 'messenger_group'
  },
  {
    title: 'Тип источника',
    label: 'Новости',
    key: 'news'
  }
];
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

  const id = getCookie('currentTheme');
  const token = getCookie('scano_acess_token');
  const [filterItems, setFilterItems] = useState(chooseFilter);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [selectedOption, setSelectedOption] = useState<any>(optionsSelect[0]);

  const [currentTab, setCurrentTab] = useState('main');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [tone, setTone] = useState<Array<string>>([]);
  const [materialsType, setMaterialsType] = useState<Array<string>>([]);
  const [materialLang, setMaterialLang] = useState<Array<string>>([]);
  const [materialCollection, setMaterialCollection] = useState<Array<string>>([]);
  const [isDownload, setIsDownload] = useState<boolean>(false);
  const [formatSelect, setFormatSelect] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFormatSelect = (value: string) => {
    setFormatSelect(value);
    if (value === 'Excel') {
      getExport();
    }
  };

  const getExport = async () => {
    try {
      const res = await fetch(
        `https://scano-0df0b7c835bf.herokuapp.com/api/v1/themes/${id}/download_excel_report`,
        {
          method: 'GET', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'arraybuffer',
            'Authorization': `Bearer ${token}`
          },
        }
      ).then(res => res.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "bac.xlsx";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();
      });
    } catch (e) {
      console.error(e);
    }
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

  const removeFilter = (key: string, src: string) => {
    if (src === 'tone') {
      setTone(tone.filter(item => item !== key));
    }
    if (src === 'materialType') {
      setMaterialsType(materialsType.filter(item => item !== key));
    }
    if (src === 'materialLang') {
      setMaterialLang(materialLang.filter(item => item !== key));
    }
    if (src === 'materialCollection') {
      setMaterialCollection(materialCollection.filter(item => item !== key));
    }
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
        <div className="px-4 flex flex-col gap-y-4">
          <MapChart/>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-start gap-x-4">
              <div className="w-1/3">
                <PieBlock/>
              </div>
              <div className="w-2/3">
                <CountryTable />
              </div>
            </div>
            <div className="flex items-start gap-x-4">
              <div className="w-1/3">
                <CityBlock/>
              </div>
              <div className="w-2/3">
                <CityTable />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tags',
      label: 'Теги',
      content: (
        <div className="px-4 flex flex-col gap-y-4">
          <div className="flex items-start gap-x-4">
            <div className="w-1/3">
              <TagBlock/>
            </div>
            <div className="w-2/3">
              <TagTable />
            </div>
          </div>
          <TagDynamicTable />
        </div>
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
                <p className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold w-full">Все
                  материалы</p>
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
                    <Image src={Search} width={16} height={16} alt="icon"/>
                  }
                />
              </div>
              <div className="flex items-center gap-x-6">
                <button className="flex items-center gap-x-1" onClick={() => {
                  setIsDownload(true);
                  onOpen();
                }}>
                  <Image src={Export} alt="icon"/>
                  <p className="font-['Montserrat',sans-serif] text-base font-semibold text-[#35415A]">Экспорт</p>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between w-full py-6">
              <div className="flex items-start max-w-[80%]">
                <p className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold">Фильтр:</p>
                <div className="flex items-center gap-y-2">
                  <div className="ml-4 flex flex-wrap items-start gap-x-4">
                    {tone.length > 0 && (
                      <div className="flex items-center gap-x-1">
                        <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Область поиска:</p>
                        {tone.map((item) => (
                          <Chip
                            key={item}
                            variant="light"
                            classNames={{
                              base: "[&_path]:fill-[#ff0000] px-0",
                              content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                            }}
                            onClose={() => removeFilter(item, 'tone')}
                          >
                            {item}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {materialsType.length > 0 && (
                      <div className="flex items-center gap-x-1">
                        <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Тип материала:</p>
                        {materialsType.map((item) => (
                          <Chip
                            key={item}
                            variant="light"
                            classNames={{
                              base: "[&_path]:fill-[#ff0000] px-0",
                              content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                            }}
                            onClose={() => removeFilter(item, 'materialType')}
                          >
                            {item}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {materialLang.length > 0 && (
                      <div className="flex items-center gap-x-1">
                        <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Язык материала:</p>
                        {materialLang.map((item) => (
                          <Chip
                            key={item}
                            variant="light"
                            classNames={{
                              base: "[&_path]:fill-[#ff0000] px-0",
                              content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                            }}
                            onClose={() => removeFilter(item, 'materialLang')}
                          >
                            {item}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {materialCollection.length > 0 && (
                      <div className="flex items-center gap-x-1">
                        <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Тип источника:</p>
                        {materialCollection.map((item) => (
                          <Chip
                            key={item}
                            variant="light"
                            classNames={{
                              base: "[&_path]:fill-[#ff0000] px-0",
                              content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                            }}
                            onClose={() => removeFilter(item, 'materialCollection')}
                          >
                            {item}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                className={`bg-[#60CA23] prose prose-base text-white font-['Work Sans',sans-serif] py-1 px-4 rounded flex gap-x-2 items-center`}
                onClick={() => {
                  setIsDownload(false);
                  onOpen();
                }}
              >
                <Image src={Filter} alt="icon"/>
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
        <Modal
          size="5xl"
          isOpen={isOpen}
          onClose={onClose}
          hideCloseButton={!isDownload}
        >
          <ModalContent>
            {(onClose) => (
              isDownload ? (
                <>
                  <ModalHeader className="flex flex-col gap-1">Экспорт материалов</ModalHeader>
                  <ModalBody className="p-4">
                    <h3 className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold">Выберите формат для экспорта материалов</h3>
                    <div className="mt-4 flex items-center gap-x-4">
                      {docFormat.map((item) => (
                        <div key={item.value} className={`flex items-center gap-x-2 p-2 cursor-pointer ${formatSelect === item.value && 'bg-[#d8e4f9] rounded-lg'}`} onClick={() => handleFormatSelect(item.value)}>
                          {item.value === 'Excel' && (<Image src={Excel} alt="icon" width={32} height={32} />)}
                          {item.value === 'Word' && (<Image src={Word} alt="icon" width={32} height={32} />)}
                          {item.value === 'PDF' && (<Image src={Pdf} alt="icon" width={42} height={42} />)}
                          <p>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </ModalBody>
                </>
              ) : (
                <>
                  <ModalHeader className="flex items-center justify-between">
                    Фильтры
                    <div className="flex items-center gap-x-2">
                      <Button className="bg-[#d9d9d9] rounded text-[#757575]" onPress={() => {
                        onClose();
                      }}>
                        Отмена
                      </Button>
                      <Button className="bg-[#d9d9d9] rounded text-[#757575]" onPress={() => {
                        setTone([]);
                        setMaterialLang([]);
                        setMaterialsType([]);
                        setMaterialCollection([]);
                      }}>
                        Очистить
                      </Button>
                      <Button className="bg-[#6581ad] rounded text-white" onPress={() => {
                        onClose();
                      }}>
                        Отфильтровать
                      </Button>
                    </div>
                  </ModalHeader>
                  <ModalBody className="p-0 pb-4">
                    <div className="border-t pt-2 px-4">
                      <div className="flex items-start">
                        <p className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold mr-2">Фильтр:</p>
                        <div className="flex items-center gap-y-2">
                          <div className="ml-4 flex flex-wrap items-start gap-x-4">
                            {tone.length > 0 && (
                              <div className="flex items-center gap-x-1">
                                <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Область поиска:</p>
                                {tone.map((item) => (
                                  <Chip
                                    variant="light"
                                    key={item}
                                    classNames={{
                                      base: "[&_path]:fill-[#ff0000] px-0",
                                      content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                                    }}
                                    onClose={() => removeFilter(item, 'tone')}
                                  >
                                    {item}
                                  </Chip>
                                ))}
                              </div>
                            )}
                            {materialsType.length > 0 && (
                              <div className="flex items-center gap-x-1">
                                <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Тип материала:</p>
                                {materialsType.map((item) => (
                                  <Chip
                                    key={item}
                                    variant="light"
                                    classNames={{
                                      base: "[&_path]:fill-[#ff0000] px-0",
                                      content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                                    }}
                                    onClose={() => removeFilter(item, 'materialType')}
                                  >
                                    {item}
                                  </Chip>
                                ))}
                              </div>
                            )}
                            {materialLang.length > 0 && (
                              <div className="flex items-center gap-x-1">
                                <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Язык материала:</p>
                                {materialLang.map((item) => (
                                  <Chip
                                    key={item}
                                    variant="light"
                                    classNames={{
                                      base: "[&_path]:fill-[#ff0000] px-0",
                                      content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                                    }}
                                    onClose={() => removeFilter(item, 'materialLang')}
                                  >
                                    {item}
                                  </Chip>
                                ))}
                              </div>
                            )}
                            {materialCollection.length > 0 && (
                              <div className="flex items-center gap-x-1">
                                <p className="font-['Montserrat',sans-serif] text-[#35415A] font-light">Тип источника:</p>
                                {materialCollection.map((item) => (
                                  <Chip
                                    key={item}
                                    variant="light"
                                    classNames={{
                                      base: "[&_path]:fill-[#ff0000] px-0",
                                      content: `font-['Montserrat',sans-serif] text-[#35415A] font-semibold pl-0`
                                    }}
                                    onClose={() => removeFilter(item, 'materialCollection')}
                                  >
                                    {item}
                                  </Chip>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-stretch border-t">
                      <div className="flex flex-col gap-y-2 w-[20%] border-r p-2">
                        {filterTabs.map((item) => (
                          <div
                            key={item.id}
                            className={`cursor-pointer rounded py-2 px-4 ${currentTab === item.key && 'bg-[#bfcbde]'}`}
                            onClick={() => {
                              setCurrentTab(item.key)
                            }}>
                            <p className="prose text-lg">
                              {item.label}
                            </p>
                          </div>
                        ))
                        }
                      </div>
                      <div className="w-full p-2">
                        {currentTab === 'main' && (
                          <>
                            <div className="flex flex-col gap-y-1 w-full">
                              <p className="prose prose-sm text-[#979ca9]">Тональность</p>
                              <CheckboxGroup
                                orientation="horizontal"
                                value={tone}
                                classNames={{
                                  wrapper: 'gap-x-4'
                                }}
                                onValueChange={setTone}
                              >
                                {toneOption.map((item) => (
                                  <Checkbox key={item.key} value={item.key} classNames={{
                                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                                  }}>
                                    <p className="prose prose-sm text-[#5b5a5d]">{item.label}</p>
                                  </Checkbox>
                                ))}
                              </CheckboxGroup>
                            </div>
                            <div className="flex flex-col gap-y-1 w-full mt-4">
                              <p className="prose prose-sm text-[#979ca9]">Тип материала</p>
                              <CheckboxGroup
                                orientation="horizontal"
                                value={materialsType}
                                classNames={{
                                  wrapper: 'gap-x-4'
                                }}
                                onValueChange={setMaterialsType}
                              >
                                {materialType.map((item) => (
                                  <Checkbox key={item.key} value={item.key} classNames={{
                                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                                  }}>
                                    <p className="prose prose-sm text-[#5b5a5d]">{item.label}</p>
                                  </Checkbox>
                                ))}
                              </CheckboxGroup>
                            </div>
                            <div className="flex flex-col gap-y-1 w-full mt-4">
                              <p className="prose prose-sm text-[#979ca9]">Язык материалов</p>
                              <CheckboxGroup
                                orientation="horizontal"
                                value={materialLang}
                                classNames={{
                                  wrapper: 'gap-x-4'
                                }}
                                onValueChange={setMaterialLang}
                              >
                                {lang.map((item) => (
                                  <Checkbox key={item.key} value={item.key} classNames={{
                                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                                  }}>
                                    <p className="prose prose-sm text-[#5b5a5d]">{item.label}</p>
                                  </Checkbox>
                                ))}
                              </CheckboxGroup>
                            </div>
                            <div className="flex flex-col gap-y-1 w-full mt-4">
                              <p className="prose prose-sm text-[#979ca9]">Тип источника</p>
                              <CheckboxGroup
                                orientation="horizontal"
                                value={materialCollection}
                                classNames={{
                                  wrapper: 'gap-x-4'
                                }}
                                onValueChange={setMaterialCollection}
                              >
                                {collection.map((item) => (
                                  <Checkbox key={item.key} value={item.key} classNames={{
                                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                                  }}>
                                    <p className="prose prose-sm text-[#5b5a5d]">{item.label}</p>
                                  </Checkbox>
                                ))}
                              </CheckboxGroup>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </ModalBody>
                </>
              )
            )}
          </ModalContent>
        </Modal>
      </MainLayout>
    </ProtectLayout>
  )
}

export default analyticIndex;
