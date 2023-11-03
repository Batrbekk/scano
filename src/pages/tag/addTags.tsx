import {NextPage} from "next";
import MainLayout from "@/components/layout/mainLayout";
import React from "react";
import {Input} from "@nextui-org/input";
import {Checkbox} from "@nextui-org/checkbox";
import {Button} from "@nextui-org/button";

const addTags: NextPage = () => {
  const tags = [
    {
      id: 1,
      label: 'ФСМС',
      color: 'blue'
    },
    {
      id: 2,
      label: 'Персоны',
      color: 'green'
    },
    {
      id: 3,
      label: 'Банки второго уровня',
      color: 'orange'
    },
  ]

  return (
    <MainLayout>
      <div className="flex items-start justify-between gap-x-6">
        <div className="flex w-[80%]">
          <div className="flex flex-col gap-y-4 w-full">
            <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl font-medium">Создание новой группы тегов</p>
            <div className="w-full bg-white rounded-lg p-4">
              <Input
                type="text"
                labelPlacement="outside"
                placeholder=" "
                label="Название группы"
                variant="bordered"
                className="w-full [&_.h-full]:w-full [&_.relative]:rounded-lg [&_.relative]:border"
                classNames={{
                  base: '[&_button]:rounded border-light',
                  label: 'prose prose-sm text-[#8c8f95]'
                }}
              />
              <div className="mt-4">
                <p className="prose prose-sm text-[#8c8f95]">Добавить теги</p>
                <div className="flex flex-col gap-y-2 mt-2">
                  {tags.map((tag) => (
                    <Checkbox
                      key={tag.id}
                      size="md"
                      className="w-full max-w-fit"
                      classNames={{
                        base: 'rounded',
                        wrapper: 'rounded before:rounded before:border after:rounded',
                        label: 'w-full'
                      }}
                    >
                      <div className="flex items-center gap-x-2">
                        <div className={`rounded w-6 h-4 ${tag.color === 'green' && 'bg-[#6ce003]'} ${tag.color === 'blue' && 'bg-[#7d9edb]'} ${tag.color === 'orange' && 'bg-[#ffd118]'}`} />
                        <p className="prose prose-sm font-['Work Sans',sans-serif]">{tag.label}</p>
                      </div>
                    </Checkbox>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-x-4">
                <Button
                  className="bg-[#8fc145] rounded-lg"
                >
                  <p className="text-white prose prose-sm">Сохранить группу</p>
                </Button>
                <Button
                  className="bg-[#5b85ce] rounded-lg"
                >
                  <p className="text-white prose prose-sm">Отмена</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default addTags;
