import React, {useState} from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "@/components/molecule/Navbar";
import Footer from "@/components/molecule/Footer";
import Select from "@/components/atom/Select";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import ProtectLayout from "@/components/layout/protectLayout";

export const addMessage: NextPage = () => {
  const router = useRouter();

  const options = ['АО "Кселл"', 'option2', 'option3'];
  const squares = [
    {
      id: 1,
      status: 'FULL'
    },
    {
      id: 2,
      status: 'FULL'
    },
    {
      id: 3,
      status: 'FULL'
    },
    {
      id: 4,
      status: 'FULL'
    },
    {
      id: 5,
      status: 'FULL'
    },
    {
      id: 6,
      status: 'TRANSPARENT'
    },
    {
      id: 7,
      status: 'TRANSPARENT'
    },
    {
      id: 8,
      status: 'TRANSPARENT'
    },
    {
      id: 9,
      status: 'TRANSPARENT'
    },
    {
      id: 10,
      status: 'TRANSPARENT'
    }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [link, setLink] = useState('');

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  return (
    <ProtectLayout>
      <div className="bg-[#F8F9FB] h-full">
        <div className="mb-6">
          <Navbar />
        </div>
        <div className="flex items-start bg-[#F8F9FB] h-[80vh]">
          <div className="w-1/6 h-full bg-white py-4">
            <div className="bg-gray-100 w-full py-2 px-4 cursor-pointer" onClick={() => {
              router.push('/main/addMessage');
            }}>
              <p className="prose prose-lg">Добавить по одному</p>
            </div>
            <div className="w-full py-2 px-4 cursor-pointer border-b">
              <p className="prose prose-lg">Добавить файлом</p>
            </div>
          </div>
          <div className="py-4 px-6 w-full">
            <div className="flex items-center gap-x-4 mb-6">
              <p className="prose prose-2xl font-semibold">Добавления сообщений в тему</p>
              <div className="flex items-center gap-0.5">
                {squares.map(item => (
                  <div className={`rounded-sm w-3 h-3 ${item.status === 'FULL' ? 'bg-[#60CA23]' : 'bg-[#cbcfd8]'}`} key={item.id} />
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 w-2/3 flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-1 w-full">
                <p className="prose prose-sm text-[#979ca9]">Тема</p>
                <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
              </div>
              <div className="flex flex-col gap-y-1 w-full">
                <p className="prose prose-sm text-[#979ca9]">Тема</p>
                <Input
                  type="text"
                  placeholder="Ввдеите ссылку на сообщение, которое хотите добавить"
                  value={link}
                  onChange={handleLink}
                  padding="py-1 px-4"
                  textColor="prose prose-base"
                />
              </div>
              <Button label="Загрузить сообщение" size="sm" color="bg-[#5b85ce]" classBtn="max-w-fit" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectLayout>
  )
}

export default addMessage;
