import Image from "next/image";
import {NextPage} from "next";
import {ru} from "date-fns/locale";
import {Chip} from "@nextui-org/chip";
import React, {useCallback, useEffect, useState} from "react";
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
import {getCookie} from "cookies-next";
import {Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Pagination} from "@nextui-org/pagination";
import {Spinner} from "@nextui-org/spinner";

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
]

const dashboardIndex: NextPage = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const [material, setMaterial] = useState<ReadonlyArray<Material>>([]);
  const id = getCookie('currentTheme');
  const token = getCookie('scano_acess_token');

  const [currentTab, setCurrentTab] = useState('main');
  const [tone, setTone] = useState<Array<string>>([]);
  const [materialsType, setMaterialsType] = useState<Array<string>>([]);
  const [materialLang, setMaterialLang] = useState<Array<string>>([]);
  const [materialCollection, setMaterialCollection] = useState<Array<string>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pending, setPending] = useState<boolean>(true);

  const totalPage = useCallback(() => {
    if (material.length > 5) {
      return Math.ceil(material.length / 5);
    } else {
      return 0;
    }
  }, [material]);

  const getMaterial = async () => {
    try {
      setPending(true);
      const res = await fetch(
        `https://scano-0df0b7c835bf.herokuapp.com/api/v1/themes/${id}/materials${tone.length > 0 ? `${tone.map((item) => `?sentiment=${item}`).join('')}` : ''}${materialsType.length > 0 ? `${materialsType.map((item) => `?material_type=${item}`).join('')}` : ''}${materialLang.length > 0 ? `${materialLang.map((item) => `?language=${item}`).join('')}` : ''}${materialCollection.length > 0 ? `${materialCollection.map((item) => `?source_type=${item}`).join('')}` : ''}`,
        {
          method: 'GET', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setMaterial(data);
        setPending(false);
      }
    } catch (err) {
      console.error(err);
      setPending(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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

  const handleUpdate = () => {
    if (token && id) {
      getMaterial();
    }
  };

  useEffect(() => {
    if (token && id) {
      getMaterial();
    }
  }, [token, id]);

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="flex flex-col pb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-x-6">
              <p className="text-[#35415A] font-['Montserrat',sans-serif] text-base font-semibold w-full">Все материалы</p>
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
              <div className="z-50">
                <DatePicker
                  showIcon
                  locale={ru}
                  endDate={endDate}
                  selectsRange={true}
                  startDate={startDate}
                  dateFormat="dd/MM/yyyy h:mm aa"
                  showTimeInput
                  placeholderText="Выберите период"
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                />
              </div>
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
                onOpen();
              }}
            >
              <Image src={Filter} alt="icon" />
              Фильтр
            </button>
          </div>
          <div className="flex items-start justify-between w-full">
            <div className="w-full max-w-[75%] flex flex-col gap-y-2">
              {material
                .slice((currentPage - 1) * 5, currentPage * 5)
                .map((card) => (
                  <MaterialCard
                    updateTags={handleUpdate}
                    key={card._id}
                    id={card._id}
                    title={card.title}
                    date={card.created_at}
                    text={card.description}
                    tags={card.tags}
                    links={card.url}
                    src_name={card.source.name}
                    img={card.img_url}
                  />
                ))}
              {pending && (
                <Spinner color="success" size="lg" />
              )}
              {material.length > 5 && !pending && (
                <div className="flex items-center justify-center relative">
                  <div className="flex items-center absolute left-0">
                    <Button variant="light" className="text-[#35415A]">
                      Выбрать все
                    </Button>
                    <Button variant="light" className="text-[#35415A]">
                      Удалить
                    </Button>
                  </div>
                  <div className="my-4">
                    <Pagination showControls total={totalPage()} initialPage={currentPage} onChange={setCurrentPage}/>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col px-6 pt-5 bg-white rounded w-[20%] h-full z-30">
              <div className="pb-3 border-b">
                <p className="text-[#716767] text-lg mb-2">Тип источников</p>
                <CheckboxGroup
                  value={materialCollection}
                  onValueChange={setMaterialCollection}
                >
                  {collection.map((item) => (
                    <Checkbox value={item.key} key={item.key} classNames={{
                      wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                    }}>
                      <p className="prose prose-sm text-[#7191c6]">{item.label}</p>
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              <div className="py-3 border-b">
                <p className="text-[#716767] text-lg mb-2">Тип материала</p>
                <CheckboxGroup
                  value={materialsType}
                  onValueChange={setMaterialsType}
                >
                  {materialType.map((item) => (
                    <Checkbox value={item.key} key={item.key} classNames={{
                      wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                    }}>
                      <p className="prose prose-sm text-[#7191c6]">{item.label}</p>
                    </Checkbox>
                  ))}
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
                    value={materialLang}
                    onValueChange={setMaterialLang}
                  >
                    {lang.map((item) => (
                      <Checkbox value={item.key} key={item.key} classNames={{
                        wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                      }}>
                        <p className="prose prose-sm text-[#7191c6]">{item.label}</p>
                      </Checkbox>
                    ))}
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
                  title="Тональность"
                  classNames={{
                    base:'[&_button]:py-0 [&_span]:mb-0 [&_button]:flex-row-reverse',
                    title: 'text-[#716767] text-lg mb-2'
                  }}
                >
                  <CheckboxGroup
                    value={tone}
                    onValueChange={setTone}
                  >
                    {toneOption.map((item) => (
                      <Checkbox value={item.key} key={item.key} classNames={{
                        wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                      }}>
                        <p className="prose prose-sm text-[#7191c6]">{item.label}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>
              </Accordion>
              <Button size="sm" onClick={getMaterial} className="mb-4 bg-[#6581ad] text-white rounded">
                Отфильтровать
              </Button>
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
                        getMaterial();
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
              )}
            </ModalContent>
          </Modal>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default dashboardIndex;
