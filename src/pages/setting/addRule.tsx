import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React, {useState} from "react";
import Select from "@/components/atom/Select";
import {Textarea} from "@nextui-org/input";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import Info from "@public/assets/icons/info.svg";
import Image from "next/image";
import Button from "@/components/atom/Button";
import {Button as ButtonUI} from "@nextui-org/button";
import ProtectLayout from "@/components/layout/protectLayout";

const AddRule: NextPage = () => {
  const options = ['АО "Кселл"', 'option2', 'option3'];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [summarySelect, setSummarySelect] = useState(['']);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="flex flex-col gap-y-4 pb-10">
          <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-lg">Создание нового профиля</p>
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col gap-y-4 w-1/2">
              <div className="bg-white rounded-lg p-4">
                <div className="flex flex-col gap-y-1 w-full">
                  <p className="prose prose-sm text-[#979ca9]">Тема</p>
                  <Select options={options} value={selectedOption} onChange={handleSelectChange} classSelect="w-full" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 flex flex-col gap-y-4">
                <div className="flex flex-col w-full">
                  <p className="prose prose-sm text-[#979ca9]">Фильтр</p>
                  <ButtonUI className="max-w-fit p-0 data-[hover=true]:bg-transparent" variant="light" disableAnimation={true}>
                    <p className="prose prose-sm text-[#557abd] border-b border-[#557abd] border-dashed">Добавить фильтр</p>
                  </ButtonUI>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <p className="prose prose-sm text-[#979ca9]">Поисковые слова</p>
                    <p className="prose prose-sm text-[#979ca9]">До 20 слов или словосочетании</p>
                  </div>
                  <Textarea
                    placeholder=""
                    variant="bordered"
                    classNames={{
                      base: '[&_div]:border-[#a0a5b1] [&_div]:!rounded [&_.border-medium]:!border'
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <p className="prose prose-sm text-[#979ca9]">Минус-слова</p>
                    <p className="prose prose-sm text-[#979ca9]">До 50 слов или словосочетании</p>
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
              <div className="bg-white rounded-lg p-4">
                <p className="prose prose-sm text-[#979ca9] mb-2">Действие</p>
                <CheckboxGroup
                  value={summarySelect}
                  onValueChange={setSummarySelect}
                >
                  <Checkbox value="tone" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">Задать тональность</p>
                  </Checkbox>
                  <Checkbox value="addTag" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">Присвоить тег</p>
                  </Checkbox>
                  <Checkbox value="reverse" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">Пометить обратным</p>
                  </Checkbox>
                  <Checkbox value="delete" classNames={{
                    wrapper: 'after:bg-[#5b85ce] after:rounded-none before:rounded-none rounded-sm'
                  }}>
                    <p className="prose prose-sm text-[#5b5a5d]">Удалить</p>
                  </Checkbox>
                </CheckboxGroup>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Image src={Info} alt="icon" />
              <p className="font-['Work Sans',sans-serif] prose">Описание <br/> <span className="text-[#557abd]">языка поисковых запросов</span></p>
            </div>
          </div>
          <div className="flex items-center gap-x-4 mt-6">
            <Button label="Создать правило" size="sm" classBtn="!w-fit" />
            <Button label="Отмена" size="sm" classBtn="!w-fit" color="bg-[#ebf1fd] font-['Work Sans',sans-serif] text-[#8192ca]" />
          </div>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default AddRule;
