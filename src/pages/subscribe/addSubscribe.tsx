import {NextPage} from "next";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Select from "@/components/atom/Select";
import Pdf from '@public/assets/icons/pdf.svg';
import Word from '@public/assets/icons/word.svg';
import {Input, Textarea} from "@nextui-org/input";
import Excel from '@public/assets/icons/excel.svg';
import MainLayout from "@/components/layout/mainLayout";
import ProtectLayout from "@/components/layout/protectLayout";
import {Mode, Subscription} from "@/types";
import {getCookie} from "cookies-next";
import Button from "@/components/atom/Button";
import {useRouter} from "next/router";

type Theme = {
  _id: string;
  name: string;
};

const addSubscribe: NextPage = () => {
  const router = useRouter();
  const id = getCookie('currentTheme');
  const token = getCookie('scano_acess_token');
  const themeName = getCookie('currentThemeName');
  const [themes, setThemes] = useState<ReadonlyArray<Theme>>([]);
  const [optionTheme, setOptionTheme] = useState<{ key: string; label: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<Mode>({key: id, label: themeName});
  const [formatSelect, setFormatSelect] = useState<string[]>([]);
  const [emails, setEmails] = useState<string>("");
  const [header, setHeader] = useState<string>('');
  const [subheader, setSubheader] = useState<string>('');

  const docFormat = [
    {
      value: 'excel',
    },
    {
      value: 'docx',
    },
    {
      value: 'pdf',
    }];

  const handleSelectChange = (value: Mode) => {
    setSelectedOption(value);
  };

  const handleFormatSelect = (value: string) => {
    const isValuePresent = formatSelect.includes(value);

    if (isValuePresent) {
      const updatedArray = formatSelect.filter(item => item !== value);
      setFormatSelect(updatedArray);
    } else {
      setFormatSelect([...formatSelect, value]);
    }
  };

  const getTheme = async () => {
    try {
      const res = await fetch(
        'https://test.scano.kz/api/v1/themes/',
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
        setThemes(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createSubs = async () => {
    const mailsMassive = emails.split(',');
    try {
      const res = await fetch(
        'https://test.scano.kz/api/v1/subscriptions/',
        {
          method: 'POST', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            theme_id: selectedOption.key,
            emails: mailsMassive,
            file_format_types: formatSelect,
            header: header,
            subheader: subheader
          })
        }
      );
      if (res.ok) {
        router.push('/subscribe');
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    if (themes.length > 0) {
      setOptionTheme(themes.map((item) => ({ "key": item._id, "label": item.name })));
    }
  }, [themes]);

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="max-w-[70%] pb-10">
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-2xl">Создание новой подписки</p>
          <div className="mt-4 rounded-lg bg-white p-4">
            <div className="flex flex-col gap-y-1 w-full">
              <p className="prose prose-sm text-[#979ca9]">Тема</p>
              <Select options={optionTheme} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
            </div>
            <div className="flex flex-col gap-y-1 w-full mt-4">
              <div className="w-full flex items-center justify-between">
                <p className="prose prose-sm text-[#979ca9]">E-mail</p>
                <p className="prose prose-sm text-[#979ca9]">Можно ввести несколько e-mil через запятую (не более 20)</p>
              </div>
              <Textarea
                placeholder=""
                value={emails}
                onValueChange={setEmails}
                variant="bordered"
                classNames={{
                  base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
                }}
              />
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-white p-4">
            <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl">Формат</p>
            <div className="flex items-center gap-x-6 mt-4">
              {docFormat.map((item) => (
                <div key={item.value} className={`flex items-center gap-x-2 p-2 cursor-pointer ${formatSelect.includes(item.value) && 'bg-[#d8e4f9] rounded-lg'}`} onClick={() => handleFormatSelect(item.value)}>
                  {item.value === 'excel' && (<Image src={Excel} alt="icon" width={32} height={32} />)}
                  {item.value === 'docx' && (<Image src={Word} alt="icon" width={32} height={32} />)}
                  {item.value === 'pdf' && (<Image src={Pdf} alt="icon" width={42} height={42} />)}
                  <p className="uppercase">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-1 w-1/2 mt-4">
              <p className="prose prose-sm text-[#979ca9]">Заголовок</p>
              <Input value={header} onValueChange={setHeader} classNames={{
                base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
              }} variant="bordered" />
            </div>
            <div className="flex flex-col gap-y-1 w-1/2 mt-4">
              <p className="prose prose-sm text-[#979ca9]">Подзаголовок</p>
              <Input value={subheader} onValueChange={setSubheader} classNames={{
                base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
              }} variant="bordered" />
            </div>
          </div>
          <Button label="Создать подписку" size="sm" classBtn="!w-fit mt-6" onClick={() => {
            createSubs();
          }} />
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default addSubscribe;
