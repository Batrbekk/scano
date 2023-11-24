import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import {Input, Textarea} from "@nextui-org/input";
import React, {useEffect, useState} from "react";
import Select from "@/components/atom/Select";
import Image from "next/image";
import Info from "@public/assets/icons/info.svg";
import {Button} from "@nextui-org/react";
import {Button as MyButton} from "@/components/atom/Button";
import ProtectLayout from "@/components/layout/protectLayout";
import {Mode, Profile} from "@/types";
import InfoOrange from "@public/assets/icons/infoOrange.svg";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import {Spinner} from "@nextui-org/spinner";

const PlaceSettings: NextPage = () => {
  const options = [
    {
      label: 'Все',
      key: 'all'
    },
    {
      label: 'Новости',
      key: 'news'
    },
    {
      label: 'Социальные сети',
      key: 'social_network'
    }
  ];
  const src = [
    {
      label: 'Все',
      key: 'all'
    },
    {
      label: 'Новости',
      key: 'news'
    },
    {
      label: 'Социальные сети',
      key: 'social_network'
    },
    {
      label: 'Видео сети',
      key: 'video'
    },
    {
      label: 'Каналы в мессенджерах',
      key: 'messenger_chanel'
    },
    {
      label: 'Группы в мессенджерах',
      key: 'messenger_group'
    }
  ];
  const lang = [
    {
      label: 'Казахский',
      key: 'kk'
    },
    {
      label: 'Русский',
      key: 'ru'
    },
    {
      label: 'Английский',
      key: 'en'
    }
  ];
  const materialTypes = [
    {
      key: 'post',
      label: 'Пост'
    },
    {
      key: 'comment',
      label: 'Комментарий'
    },
    {
      key: 'repost',
      label: 'Репост'
    },
    {
      key: 'stories',
      label: 'Историй'
    }
  ];
  const searchRegion = [
    {
      key: 'material_text',
      label: 'Текст сообщений'
    },
    {
      key: 'picture_text',
      label: 'Текст на картинках'
    },
    {
      key: 'video_transcription',
      label: 'Расшифровки видео'
    }
  ];

  const [selectedOption, setSelectedOption] = useState<Mode>(options[0]);
  const [selectSrc, setSelectSrc] = useState<Mode>(src[0]);
  const [srcLang, setSrcLang] = useState<Mode>(lang[0])
  const [filter, setFilter] = useState(false);

  const [themeName, setThemeName] = useState<string>("");
  const [searchWords, setSearchWords] = useState<string>("");
  const [unsearchWords, setUnsearchWords] = useState<string>("");
  const [unsearchSrc, setUnsearchSrc] = useState<string>("");
  const [materialTypesSelect, setMaterialTypesSelect] = useState<Array<string>>([]);
  const [searchRegionSelect, setSearchRegionSelect] = useState<Array<string>>([]);

  const [profile, setProfile] = useState<Profile>();
  const profileCookie = getCookie('profile');

  const router = useRouter();
  const token = getCookie('scano_acess_token');
  const [pending, setPending] = useState<boolean>(false);

  const handleSelectLang = (value: Mode) => {
    setSrcLang(value)
  }

  const handleSelectChange = (value: Mode) => {
    setSelectedOption(value);
  };

  const handleSelectSrc = (value: Mode) => {
    setSelectSrc(value);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const createTheme = async () => {
    const searchWordsMassive = searchWords.split(' ');
    const unsearchWordsMassive = unsearchWords.split(' ');
    const unsearchSrcMassive = unsearchSrc.split(' ');

    try {
      setPending(true);
      const res = await fetch(
        `https://scano-0df0b7c835bf.herokuapp.com/api/v1/themes/`,
        {
          method: 'POST', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: themeName,
            theme_type: selectedOption.key,
            keywords: searchWordsMassive,
            minus_keywords: unsearchWordsMassive,
            group_id: profile?.admin_id,
            source_types: [selectSrc.key],
            language: srcLang.key,
            search_domains: searchRegionSelect,
            material_types: materialTypesSelect,
            exclude_sources: unsearchSrcMassive,
            description: 'Зачем это поле?'
          }),
        }
      );
      if (res.ok) {
        setPending(false);
        await router.push('/main');
      } else {
        setPending(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if(profileCookie) {
      setProfile(JSON.parse(profileCookie));
    }
  }, [profileCookie]);

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
                  value={themeName}
                  onValueChange={setThemeName}
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
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Поисковый запрос</p>
              {/*<RadioGroup*/}
              {/*  orientation="horizontal"*/}
              {/*  classNames={{*/}
              {/*    wrapper: 'gap-x-6'*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Radio value="new-mess"><p className="prose prose-sm">Форма с операторами</p></Radio>*/}
              {/*  <Radio value="report"><p className="prose prose-sm">форма - конструктор</p></Radio>*/}
              {/*</RadioGroup>*/}
            </div>
            <div className="flex items-center relative">
              <div className="flex flex-col gap-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="prose prose-sm text-[#979ca9]">Поисковые слова</p>
                  <p className="prose prose-sm text-[#979ca9]">До 20 слов или словосочетании</p>
                </div>
                <Textarea
                  placeholder=""
                  value={searchWords}
                  onValueChange={setSearchWords}
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
                  value={unsearchWords}
                  onValueChange={setUnsearchWords}
                  variant="bordered"
                  classNames={{
                    base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-4 my-4">
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Источники</p>
              {/*<RadioGroup*/}
              {/*  orientation="horizontal"*/}
              {/*  classNames={{*/}
              {/*    wrapper: 'gap-x-6'*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Radio value="new-mess"><p className="prose prose-sm">типы источников</p></Radio>*/}
              {/*  <Radio value="report"><p className="prose prose-sm">источники</p></Radio>*/}
              {/*</RadioGroup>*/}
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
                  filter ? 'Свернуть' : 'Развернуть'
                }</p>
              </Button>
            </div>
            {filter && (
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1 w-full">
                  <p className="prose prose-sm text-[#979ca9]">Область поиска</p>
                  <CheckboxGroup
                    orientation="horizontal"
                    value={searchRegionSelect}
                    classNames={{
                      wrapper: 'gap-x-4'
                    }}
                    onValueChange={setSearchRegionSelect}
                  >
                    {searchRegion.map((item) => (
                      <Checkbox value={item.key} classNames={{
                        wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                      }}>
                        <p className="prose prose-sm text-[#5b5a5d]">{item.label}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                  <p className="prose prose-sm text-[#979ca9]">Тип сообщения</p>
                  <CheckboxGroup
                    orientation="horizontal"
                    value={materialTypesSelect}
                    classNames={{
                      wrapper: 'gap-x-4'
                    }}
                    onValueChange={setMaterialTypesSelect}
                  >
                    {materialTypes.map((item) => (
                      <Checkbox value={item.key} classNames={{
                        wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                      }}>
                        <p className="prose prose-sm text-[#5b5a5d]">{item.label}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                  <p className="prose prose-sm text-[#979ca9]">Языки</p>
                  <Select options={lang} value={srcLang} onChange={handleSelectLang} classSelect="w-full" />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <p className="prose prose-sm text-[#979ca9]">Исключить источник</p>
                    <p className="prose prose-sm text-[#979ca9]">До 100 источников</p>
                  </div>
                  <Textarea
                    placeholder=""
                    value={unsearchSrc}
                    onValueChange={setUnsearchSrc}
                    variant="bordered"
                    classNames={{
                      base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
                    }}
                  />
                </div>
              </div>
            )}
            <div className="flex items-start gap-x-6 mt-4">
              <Image src={InfoOrange} alt="icon" />
              <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#7a7c8d]">
                Настройки, которые меняются при редактировании темы, не действуют на уже собранные сообщения. Поэтому рекомендуем протестировать поисковый запрос на этапе создание темы.
                Для проверки и оптимизации настроек используйте кнопку "Показать результаты".
              </p>
            </div>
            <MyButton label={
              pending ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Сохранить тему"
              )
            } size="sm" classBtn="!w-fit mt-8" onClick={createTheme} />
          </div>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default PlaceSettings;
