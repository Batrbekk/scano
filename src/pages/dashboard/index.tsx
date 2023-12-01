import Image from "next/image";
import {NextPage} from "next";
import {ru} from "date-fns/locale";
import {Chip} from "@nextui-org/chip";
import React, {useEffect, useState} from "react";
import {Input} from "@nextui-org/input";
import DatePicker from "react-datepicker";
import Search from "@public/assets/icons/search.svg";
import Export from "@public/assets/icons/export.svg";
import Filter from "@public/assets/icons/filter.svg";
import MainLayout from "@/components/layout/mainLayout";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import MaterialCard from "@/components/molecule/MaterialCard";
import ProtectLayout from "@/components/layout/protectLayout";
import {Material} from "@/types";
import {getCookie, setCookie} from "cookies-next";
import {Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";

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
    key: 'positive',
    label: 'Позитив'
  },
  {
    key: 'negative',
    label: 'Негатив'
  },
  {
    key: 'neutral',
    label: 'Нейтрально'
  }
];
const materialType = [
  {
    label: 'Пост',
    key: 'post'
  },
  {
    label: 'Репост',
    key: 'repost'
  },
  {
    label: 'Репост с дополнением',
    key: 'repostAddition'
  },
  {
    label: 'Комментарий',
    key: 'comment'
  },
  {
    label: 'Сториз',
    key: 'stories'
  }
];
const treatmentMaterial = [
  {
    label: 'Обработанные',
    key: 'processed'
  },
  {
    label: 'Необработанные',
    key: 'unprocessed'
  },
  {
    label: 'Избранные',
    key: 'saved'
  }
];
const lang = [
  {
    label: 'Казахский',
    key: 'kz'
  },
  {
    label: 'Русский',
    key: 'ru'
  }
];
const collection = [
  {
    label: 'Автоматически',
    key: 'automat'
  },
  {
    label: 'Вручную',
    key: 'manual'
  }
]

const dashboardIndex: NextPage = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const [filterItems, setFilterItems] = useState(chooseFilter);
  const [material, setMaterial] = useState<ReadonlyArray<Material>>([]);
  const [pending, setPending] = useState<boolean>(false);
  const id = getCookie('currentTheme');
  const token = getCookie('scano_acess_token');

  const [currentTab, setCurrentTab] = useState('main');
  const [tone, setTone] = useState<Array<string>>([]);
  const [materialsType, setMaterialsType] = useState<Array<string>>([]);
  const [materialTreatment, setMaterialTreatment] = useState<Array<string>>([]);
  const [materialLang, setMaterialLang] = useState<Array<string>>([]);
  const [materialCollection, setMaterialCollection] = useState<Array<string>>([]);

  const getMaterial = async () => {
    try {
      setPending(true);
      const res = await fetch(
        `https://scano-0df0b7c835bf.herokuapp.com/api/v1/themes/${id}/materials`,
        {
          method: 'GET', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        setPending(false);
        const data = await res.json();
        setMaterial(data);
        console.log(data);
      }
    } catch (err) {
      setPending(false);
      console.error(err);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const removeFilter = (idToRemove: number) => {
    setFilterItems(filterItems.filter(item => item.id !== idToRemove));
  };

  useEffect(() => {
    if (token && id) {
      getMaterial();
    }
  }, [token, id]);

  return (
    <ProtectLayout>
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
              onClick={() => {
                onOpen();
              }}
            >
              <Image src={Filter} alt="icon" />
              Фильтр
            </button>
          </div>
          <div className="flex items-start gap-x-4 w-full">
            <div className="w-[80%] flex flex-col gap-y-2">
              {material.map((card) => (
                <MaterialCard
                  key={card._id}
                  id={card._id}
                  title={card.title}
                  date={card.created_at}
                  text={card.description}
                  tags={card.tags}
                  links={card.url}
                  src_name={card.source.name}
                  img="https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
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
          <Modal
            size="5xl"
            isOpen={isOpen}
            onClose={onClose}
            hideCloseButton={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex items-center justify-between">
                    Фильтры
                    <div className="flex items-center gap-x-2">
                      <Button className="bg-[#d9d9d9] rounded text-[#757575]" onPress={onClose}>
                        Отмена
                      </Button>
                      <Button className="bg-[#6581ad] rounded text-white" onPress={onClose}>
                        Отфильтровать
                      </Button>
                    </div>
                  </ModalHeader>
                  <ModalBody className="p-0 pb-4">
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
                              <p className="prose prose-sm text-[#979ca9]">Область поиска</p>
                              <CheckboxGroup
                                orientation="horizontal"
                                value={tone}
                                classNames={{
                                  wrapper: 'gap-x-4'
                                }}
                                onValueChange={setTone}
                              >
                                {toneOption.map((item) => (
                                  <Checkbox value={item.key} classNames={{
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
                                  <Checkbox value={item.key} classNames={{
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
                                value={materialTreatment}
                                classNames={{
                                  wrapper: 'gap-x-4'
                                }}
                                onValueChange={setMaterialTreatment}
                              >
                                {treatmentMaterial.map((item) => (
                                  <Checkbox value={item.key} classNames={{
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
                                  <Checkbox value={item.key} classNames={{
                                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                                  }}>
                                    <p className="prose prose-sm text-[#5b5a5d]">{item.label}</p>
                                  </Checkbox>
                                ))}
                              </CheckboxGroup>
                            </div>
                            <div className="flex flex-col gap-y-1 w-full mt-4">
                              <p className="prose prose-sm text-[#979ca9]">Тип сбора</p>
                              <CheckboxGroup
                                orientation="horizontal"
                                value={materialCollection}
                                classNames={{
                                  wrapper: 'gap-x-4'
                                }}
                                onValueChange={setMaterialCollection}
                              >
                                {collection.map((item) => (
                                  <Checkbox value={item.key} classNames={{
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
              )}
            </ModalContent>
          </Modal>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default dashboardIndex;
