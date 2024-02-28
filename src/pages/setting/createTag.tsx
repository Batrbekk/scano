import {NextPage} from "next";
import ProtectLayout from "@/components/layout/protectLayout";
import MainLayout from "@/components/layout/mainLayout";
import React, {useState} from "react";
import {Input, Textarea} from "@nextui-org/input";
import InputColor from 'react-input-color';
import Select from "@/components/atom/Select";
import {Mode} from "@/types";
import Button from "@/components/atom/Button";
import {getCookie} from "cookies-next";
import {Spinner} from "@nextui-org/spinner";
import {useRouter} from "next/router";

const createTag: NextPage = () => {
  const options = [
    {
      label: 'Весь период',
      key: 'all'
    },
    {
      label: 'Месяц',
      key: 'month'
    },
    {
      label: 'Неделя',
      key: 'week'
    },
    {
      label: 'День',
      key: 'day'
    }
  ];

  const router = useRouter();
  const token = getCookie('scano_acess_token');
  const [color, setColor] = useState<any>({});
  const [tagName, setTagName] = useState('');
  const [pending, setPending] = useState(false);
  const [searchWords, setSearchWords] = useState<string>("");
  const [unsearchWords, setUnsearchWords] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (value: Mode) => {
    setSelectedOption(value);
  };

  const createTag = async () => {
    const searchWordsMassive = searchWords.split(' ');
    const unsearchWordsMassive = unsearchWords.split(' ');
    try {
      setPending(true);
      const res = await fetch(
        'https://test.scano.kz/api/v1/tags',
        {
          method: 'POST', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: tagName,
            keywords: searchWordsMassive,
            minus_keywords: unsearchWordsMassive,
            tag_color: color.hex,
            parsing_period: selectedOption.key
          }),
        }
      );
      if (res.ok) {
        router.push('/dashboard/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="flex flex-col gap-y-4 pb-10">
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Создание нового тега</p>
          <div className="rounded-lg p-4 bg-white w-[70%] flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <div className="flex flex-col gap-y-1 w-[90%]">
                <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Тег</p>
                <Input
                  value={tagName}
                  onValueChange={setTagName}
                  classNames={{
                    input: [
                      "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight w-full"
                    ],
                    inputWrapper: [
                      "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
                      "font-['Montserrat',sans-serif] text-base font-semibold",
                      "min-h-unit-8 h-unit-8"
                    ]
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-1 w-[10%]">
                <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#979ca9]">Цвет тега</p>
                <div className="[&_span]:w-full [&_span]:h-full [&_span]:[&_span]:h-6 flex items-center [&_span]:rounded [&_span]:border-[rgba(55,71,95,0.80)]">
                  <InputColor
                    initialValue="#5e72e4"
                    onChange={setColor}
                    placement="bottom"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <p className="prose prose-sm text-[#979ca9]">Поисковые слова</p>
              <Textarea
                placeholder=""
                value={searchWords}
                onValueChange={setSearchWords}
                variant="bordered"
                classNames={{
                  base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
                }}
              />
              <p className="prose prose-sm text-[#979ca9] w-full">
                Введите поисковые слова или словосочетания, разделяя их запятыми. Описание
                <span className="mx-1 text-[#5e72e4] underline">языка поисковых запросов.</span>
                До 100 слов или словосочетаний
              </p>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <p className="prose prose-sm text-[#979ca9]">Минус-слова</p>
                <p className="prose prose-sm text-[#979ca9]">До 100 слов или словосочетании</p>
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
            <div className="flex flex-col w-full gap-y-1">
              <p className="prose prose-sm text-[#979ca9]">Период сбора</p>
              <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
            </div>
            <div className="flex items-center w-full gap-x-4">
              <Button label={pending ? (<Spinner size="sm" color="white" />) : 'Сохранить тег'} size="sm" classBtn="!w-fit" color="bg-[#5b85ce]" onClick={() => {
                createTag();
              }} />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default createTag;
