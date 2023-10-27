import Image from "next/image";
import {NextPage} from "next";
import {ru} from "date-fns/locale";
import {Chip} from "@nextui-org/chip";
import React, {useState} from "react";
import {Input} from "@nextui-org/input";
import DatePicker from "react-datepicker";
import Search from "@public/assets/icons/search.svg";
import Export from "@public/assets/icons/export.svg";
import Filter from "@public/assets/icons/filter.svg";
import MainLayout from "@/components/layout/mainLayout";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import MaterialCard from "@/components/molecule/MaterialCard";

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

const cards = [
  {
    id: 0,
    title: 'Приказом министра просвещения РК Тимур Абильмажинов назначен руководителем аппарата Министерства просвещения РК',
    date: '01.01.21 23:11',
    text: '...государственного контроля и организационно-территориальной работы Администрации Президента РК. С ноября 2020 года и по настоящее время являлся государственным инспектором Администрации Президента...',
    tags: [
      {
        id: 0,
        title: 'Самолет',
      },
      {
        id: 1,
        title: 'Авиация',
      }
    ],
    links: {
      text: 'Scano.kz',
      value: 'www.google.kz'
    },
    img: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
  },
  {
    id: 1,
    title: 'Приказом министра просвещения РК Тимур Абильмажинов назначен руководителем аппарата Министерства просвещения РК',
    date: '01.01.21 23:11',
    text: '...государственного контроля и организационно-территориальной работы Администрации Президента РК. С ноября 2020 года и по настоящее время являлся государственным инспектором Администрации Президента...',
    tags: [
      {
        id: 0,
        title: 'Самолет',
      },
      {
        id: 1,
        title: 'Авиация',
      }
    ],
    links: {
      text: 'Scano.kz',
      value: 'www.google.kz'
    },
    img: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
  },
  {
    id: 2,
    title: 'Приказом министра просвещения РК Тимур Абильмажинов назначен руководителем аппарата Министерства просвещения РК',
    date: '01.01.21 23:11',
    text: '...государственного контроля и организационно-территориальной работы Администрации Президента РК. С ноября 2020 года и по настоящее время являлся государственным инспектором Администрации Президента...',
    tags: [
      {
        id: 0,
        title: 'Самолет',
      },
      {
        id: 1,
        title: 'Авиация',
      }
    ],
    links: {
      text: 'Scano.kz',
      value: 'www.google.kz'
    },
    img: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
  },
  {
    id: 3,
    title: 'Приказом министра просвещения РК Тимур Абильмажинов назначен руководителем аппарата Министерства просвещения РК',
    date: '01.01.21 23:11',
    text: '...государственного контроля и организационно-территориальной работы Администрации Президента РК. С ноября 2020 года и по настоящее время являлся государственным инспектором Администрации Президента...',
    tags: [
      {
        id: 0,
        title: 'Самолет',
      },
      {
        id: 1,
        title: 'Авиация',
      }
    ],
    links: {
      text: 'Scano.kz',
      value: 'www.google.kz'
    },
    img: 'https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg'
  }
]

const dashboardIndex: NextPage = () => {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const [filterItems, setFilterItems] = useState(chooseFilter);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const removeFilter = (idToRemove: number) => {
    setFilterItems(filterItems.filter(item => item.id !== idToRemove));
  };

  return (
    <>
      <MainLayout>
        <div className="flex flex-col">
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
          <div className="flex items-start gap-x-4 w-full">
            <div className="w-[80%] flex flex-col gap-y-2">
              {cards.map((card) => (
                <MaterialCard
                  key={card.id}
                  title={card.title}
                  date={card.date}
                  text={card.text}
                  tags={card.tags}
                  links={card.links}
                  img={card.img}
                />
              ))}
            </div>
            <div className="flex flex-col px-2 pt-5 bg-[#F2F4F6] w-[20%] h-full">
              <div className="pb-3 border-b">
                <p className="text-[#716767] text-lg mb-2">Тип источников</p>
                <CheckboxGroup
                  radius="sm"
                  classNames={{
                    base: '',
                    wrapper: 'font-light text-sm w-full [&_label]:!max-w-full [&_.select-none]:w-full'
                  }}
                >
                  <Checkbox value="social">
                    <div className="flex items-center justify-between w-full text-[#7191c6]">
                      Social networks
                      <span className="text-[#716767]">1076</span>
                    </div>
                  </Checkbox>
                  <Checkbox value="news">
                    <div className="flex items-center justify-between w-full text-[#7191c6]">
                      News
                      <span className="text-[#716767]">1021</span>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <div className="py-3 border-b">
                <p className="text-[#716767] text-lg mb-2">Тональность</p>
                <CheckboxGroup
                  radius="sm"
                  classNames={{
                    base: '',
                    wrapper: 'font-light text-sm w-full [&_label]:!max-w-full [&_.select-none]:w-full'
                  }}
                >
                  <Checkbox value="social">
                    <div className="flex items-center justify-between w-full text-[#7191c6]">
                      Neutral
                      <span className="text-[#716767]">3437</span>
                    </div>
                  </Checkbox>
                  <Checkbox value="asd">
                    <div className="flex items-center justify-between w-full text-[#7191c6]">
                      Positive
                      <span className="text-[#716767]">570</span>
                    </div>
                  </Checkbox>
                  <Checkbox value="news">
                    <div className="flex items-center justify-between w-full text-[#7191c6]">
                      Negative
                      <span className="text-[#716767]">113</span>
                    </div>
                  </Checkbox>
                </CheckboxGroup>
              </div>
              <Accordion
                className="px-0 border-b py-3"
                defaultExpandedKeys={["1"]}
              >
                <AccordionItem
                  key="1"
                  aria-label="Язык материала"
                  title="Язык материала"
                  classNames={{
                    base:'[&_button]:py-0 [&_span]:mb-0 [&_button]:flex-row-reverse',
                    title: 'text-[#716767] text-lg mb-2'
                  }}
                >
                  <CheckboxGroup
                    radius="sm"
                    classNames={{
                      base: '',
                      wrapper: 'font-light text-sm w-full [&_label]:!max-w-full [&_.select-none]:w-full'
                    }}
                  >
                    <Checkbox value="russian">
                      <div className="flex items-center justify-between w-full text-[#7191c6]">
                        Russian
                        <span className="text-[#716767]">2861</span>
                      </div>
                    </Checkbox>
                    <Checkbox value="english">
                      <div className="flex items-center justify-between w-full text-[#7191c6]">
                        English
                        <span className="text-[#716767]">118</span>
                      </div>
                    </Checkbox>
                    <Checkbox value="kazakh">
                      <div className="flex items-center justify-between w-full text-[#7191c6]">
                        Kazakh
                        <span className="text-[#716767]">1976</span>
                      </div>
                    </Checkbox>
                  </CheckboxGroup>
                </AccordionItem>
              </Accordion>
              <Accordion
                className="px-0 py-3"
                defaultExpandedKeys={["1"]}
              >
                <AccordionItem
                  key="1"
                  aria-label="Теги"
                  title="Теги"
                  classNames={{
                    base:'[&_button]:py-0 [&_span]:mb-0 [&_button]:flex-row-reverse',
                    title: 'text-[#716767] text-lg mb-2'
                  }}
                >
                  <CheckboxGroup
                    radius="sm"
                    classNames={{
                      base: '',
                      wrapper: 'font-light text-sm w-full [&_label]:!max-w-full [&_.select-none]:w-full'
                    }}
                  >
                    <Checkbox value="social">
                      <div className="flex items-center justify-between w-full text-[#7191c6]">
                        Басшылык
                        <span className="text-[#716767]">2861</span>
                      </div>
                    </Checkbox>
                    <Checkbox value="news">
                      <div className="flex items-center justify-between w-full text-[#7191c6]">
                        Сайрам ауданы
                        <span className="text-[#716767]">118</span>
                      </div>
                    </Checkbox>
                    <Checkbox value="news">
                      <div className="flex items-center justify-between w-full text-[#7191c6]">
                        Кентау
                        <span className="text-[#716767]">1976</span>
                      </div>
                    </Checkbox>
                    <Checkbox value="news">
                      <div className="flex items-center justify-between w-full text-[#7191c6]">
                        Арыс ауданы
                        <span className="text-[#716767]">1976</span>
                      </div>
                    </Checkbox>
                  </CheckboxGroup>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default dashboardIndex;
