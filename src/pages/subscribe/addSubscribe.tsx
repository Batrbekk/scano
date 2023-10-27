import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React, {useState} from "react";
import Select from "@/components/atom/Select";
import {Textarea} from "@nextui-org/input";

const addSubscribe: NextPage = () => {
  const options = ['АО "Кселл"', 'option2', 'option3'];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <MainLayout>
      <div className="max-w-[70%]">
        <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-2xl">Создание новой подписки</p>
        <div className="mt-4 rounded-lg bg-white p-4">
          <div className="flex flex-col gap-y-1 w-full">
            <p className="prose prose-sm text-[#979ca9]">Тема</p>
            <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
          </div>
          <div className="flex flex-col gap-y-1 w-full mt-4">
            <div className="w-full flex items-center justify-between">
              <p className="prose prose-sm text-[#979ca9]">E-mail</p>
              <p className="prose prose-sm text-[#979ca9]">Можно ввести несколько e-mil через запятую (не более 20)</p>
            </div>
            <Textarea
              placeholder=""
              variant="bordered"
              classNames={{
                base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default addSubscribe;
