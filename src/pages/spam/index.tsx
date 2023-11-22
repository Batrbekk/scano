import {NextPage} from "next";
import React, {useState} from "react";
import Image from "next/image";
import {Tooltip} from "@nextui-org/tooltip";
import InfoGray from "@public/assets/icons/infoGray.svg";
import MainLayout from "@/components/layout/mainLayout";
import {Tab, Tabs} from "@nextui-org/tabs";
import SpamCard from "@/components/molecule/SpamCard";
import {Button} from "@nextui-org/button";
import {Select, SelectItem} from "@nextui-org/select";
import {Pagination} from "@nextui-org/pagination";
import Calendar from "@public/assets/icons/calendar.svg";
import BlackSpam from "@public/assets/icons/blackSpam.svg";
import Link from "next/link";
import {Checkbox} from "@nextui-org/checkbox";
import {Input} from "@nextui-org/input";
import GraySearch from "@public/assets/icons/graySearch.svg";
import {useRouter} from "next/router";
import ProtectLayout from "@/components/layout/protectLayout";

const spamIndex: NextPage = () => {
  const message = [
    {
      name: 'ABDIQADIROV_0910',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      shortText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
      src: 'youtube.com',
      followers: '52',
      mainAuthorName: '@kuplinov_play',
      mainAuthorFollowers: '16M',
      messageType: 'коммент.',
      date: '12.06.2023 16:00',
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      srcIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACWklEQVR4AezRA4ydQRiF4bec2ubUdpzUboMyRm3bCGrbCGrbtt1F6t7a9tdvk7Uv1jvJE/7nzMn8iEicSh4Q9wN+/PiB4pt6q176e+/vo5IgKVSqSKRUKH4H63gXrPe1+qJ++MNaS0FVVHWyttoya7vvsXaql7Wr7lm7/bG1h/9Ze1qsvayuq7vqTjjuqlvqijr/zdoTmj+gtty0dsVua6dod6++1taqaG2K/NZiFQA5IOM2WPUP/gpITLsCR8tCEQBSQ4qDsEpAYpMXnMgMaWkENQT+KIltLaEe46GvgMSFmTCStbAwrgbshNWcgR1OBXPnFhk+XCR7drcHnIGD+MJppwf8/i3i6yvSqpVbAx7BFbzgplPBXLlEXr+WwLNhg0jJki4NeAbeeIG3WwP8zvv3IoMGiaRN69QABzzBG7zcHhBwrl4Vad482l3P4Rn33XuBsC/RpUu0u17CM7w8NWDpUpGCBZ39BQ684LZbAy5dEmnQQASc5oB7+MA5pwf8+iXy6ZPI0KEixoiAS57BDS7BHqeCefOKrFghUr68CLjlEpxgAyxzKpgypQh4xGHYwGQYIiBxYSFMpBXUiqsBXaAVGSHNddgf25c/h9uFIDMAFaDgLTgRW5c74FY9qACAMQZUHmNS9zem7WZj5p0zZrfDmHPPjLn7xpiHYswz9Vq9V5+i8M7/22d+Wb8O7TqvnXt3GrNkjDHtSxiTGWMwigcPHqDwVdfUDeWlHOrZgwep3jx4kF4ePMiqcqq8qkAU8vh/m0Wz6fw6HP6dN/3v8FYP/P3faM9o1AEAa00uUOyK7dUAAAAASUVORK5CYII='
    },
    {
      name: 'Сергей Сергей',
      text: 'Привет, мир! Я новый пользователь здесь. Надеюсь, что найду много интересных людей для общения и обмена опытом.',
      shortText: 'Привет, мир! Я новый пользователь здесь.',
      src: 'vk.com',
      followers: '120',
      messageType: 'ост',
      date: '15.06.2023 10:30',
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      srcIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABiUlEQVR4Ac2XL0zEMBTG8Qqv5hVe4dV5hTecOuSQuAOJ6s5ijgQ5UXHIJfPiUgWSOk4++iV9CW23PbqE9b7kM7e3+37t+vci0R1VzrfOyrl3Nt6Uaevf0857/59VHBcHo5j+2QpZSTi3ciGbEGJDzYLhbP279VTIFVq/LgaAbD9CqZAVAHRBgB4ApiCAAYAtDUCx71sKVD2kNeaLWKhPnjcdsch+j0MMAqzfKND1cxYAgIPnqssEWO0o0M1LHsD2IPSgAIAXAj0e/g5Qt/K7IgBsT8RCmAhwWcctRw1+nwnQdNPjgAE4iIFZ/YfQ9QIAAgPpYwqQisPllgsAwyF1KwOwVJffA2IvMEQ8zdBi9FAs1IgQEiFGcaz4e/MsQFjTyQNRBpAhYoDJ+u27DCAaIfYkA7D1UV5N4azdEF2MsP5TBkAgyQuSnb0d47siBL56Gq7BEs5e7cZ2ww31BbdjXepEzH4tfygtfyyHyhxM1RldzRhimQGpg/CJ6/neF5uZJ2cD+2muxq7nP0SNVcqkYolSAAAAAElFTkSuQmCC'
    },
    {
      name: 'Ayim Mutalipova',
      text: 'Сегодняшний день был насыщен событиями! Побывал на интересной конференции по искусственному интеллекту и узнал много нового. С нетерпением жду возможности поделиться своими впечатлениями и знаниями с вами.',
      shortText: 'Побывал на интересной конференции по искусственному интеллекту.',
      src: 'facebook.com',
      followers: '7 107',
      mainAuthorName: '@kuplinov_play',
      mainAuthorFollowers: '16M',
      messageType: 'коммент.',
      date: '15.06.2023 10:30',
      avatar: 'https://media.licdn.com/dms/image/C4D03AQFFLTZrS5dowg/profile-displayphoto-shrink_400_400/0/1561329448112?e=1704326400&v=beta&t=yGhMP7w9P5DmH7_asla7q7Fp5ZBjrmJxgOnihJn6sAM',
      srcIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAgVBMVEUAAAAQcP8IZf8IZ/8JZv8HZf8IZv8IZv8IaP8JZ/8HZv8IZv8FZf8YcP9FjP+TvP/g7P/////R4/9Vlf8QYP+Es/9kn/8IZv8nef8JZf8AYP/v9f/Q4v/B2P9GjP8HZv+yz//Q4/83g/8HZv/g6/+Dsv8HZf/n7//////////e6//ZLyHjAAAAK3RSTlMAEGCfz+//XyCQj98w/////////xD//6D/kBD/////7////8///5Cgz+/vONkvXQAAAPJJREFUeAF9kkUCwzAMBGVSGMrM3P//rxBaB+e6s0YREFJpw2y0cgS1cT3DQLmNWPjcwK/XA24RWIuEdg4j7OtHUX0NYedxko5+jCeZMc0En8FsVDDHSd1WDoFdIlogX46awopozWA+ythsd7s9ZxymJBkcs3wcMZC0YHDKhDNbKLowuGYC21zINIWUbQ7EwwJT7YogqgTTKaTY4tIp7HDIRadwwzVlKVyv11HG9cekFBxam8FbTInuQ4LCd3cL2Uzd+4UV/VkHfUIgMLRdQuBi7JsCxh5rQEAfrO9NYSWojruwBOOhDoR8PF+j0fuipNX+AmbCIviMIiwCAAAAAElFTkSuQmCC'
    }
  ];
  const count = [
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35'
  ];
  const spamLinks = [
    {
      href: '#',
      label: 'Сообщения'
    },
    {
      href: '#',
      label: 'Авторы'
    },
    {
      href: '#',
      label: 'Сообщества'
    },
    {
      href: '#',
      label: 'Места'
    }
  ];
  const srcCount = [
    {
      src: 'youtube.com',
      count: '364'
    },
    {
      src: 'vk.com',
      count: '24'
    },
    {
      src: 'facebook.com',
      count: '214'
    },
    {
      src: 'instagram.com',
      count: '311'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagination, setTotalPagination] = useState(10);

  const router = useRouter();

  return (
    <ProtectLayout>
      <MainLayout>
        <div className="flex items-start justify-between gap-x-6 pb-10">
          <div className="flex w-[80%]">
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex items-center gap-x-2">
                <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-xl font-medium">Корзина</p>
                <Tooltip content="Это спам">
                  <Image src={InfoGray} alt="icon" width={32} height={32} />
                </Tooltip>
              </div>
              <div className="rounded-lg bg-white w-full py-4 px-16 flex items-center justify-around">
                <div className="flex flex-col items-center">
                  <p className="prose prose-sm font-['Work Sans',sans-serif] text-[#bcbec6]">Сообщения</p>
                  <p className="prose prose-2xl font-['Work Sans',sans-serif] text-[#5e626c]">3</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="prose prose-sm font-['Work Sans',sans-serif] text-[#bcbec6]">Авторы</p>
                  <p className="prose prose-2xl font-['Work Sans',sans-serif] text-[#5e626c]">0/3</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="prose prose-sm font-['Work Sans',sans-serif] text-[#bcbec6]">Сообщества</p>
                  <p className="prose prose-2xl font-['Work Sans',sans-serif] text-[#5e626c]">0/0</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="prose prose-sm font-['Work Sans',sans-serif] text-[#bcbec6]">Места</p>
                  <p className="prose prose-2xl font-['Work Sans',sans-serif] text-[#5e626c]">0/0</p>
                </div>
              </div>
              <div className="mt-4">
                <Tabs variant="light" disabledKeys={["videos"]} aria-label="Tabs" radius="full" classNames={{
                  cursor: 'group-data-[selected=true]:bg-[#e4e7ec] group-data-[selected=true]:border-[#e4e7ec]',
                  tabContent: ''
                }}>
                  <Tab key="photos" title="Дата"/>
                  <Tab key="music" title="Аудитория"/>
                </Tabs>
              </div>
              <div className="mt-4 flex flex-col gap-y-4">
                {message.map((card) => (
                  <SpamCard
                    name={card.name}
                    text={card.text}
                    shortText={card.shortText}
                    src={card.src}
                    followers={card.followers}
                    mainAuthorName={card.mainAuthorName}
                    mainAuthorFollowers={card.mainAuthorFollowers}
                    messageType={card.messageType}
                    date={card.date}
                    avatar={card.avatar}
                    srcIcon={card.srcIcon}
                  />
                ))}
              </div>
              <div className="mt-4 bg-white rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Button variant="light">
                    <p className="prose font-['Work Sans',sans-serif] prose-sm">Выбрать все</p>
                  </Button>
                  <Button variant="light">
                    <p className="prose font-['Work Sans',sans-serif] prose-sm">Восстановить</p>
                  </Button>
                </div>
                <Select
                  variant="bordered"
                  labelPlacement="outside-left"
                  className="max-w-[92px]"
                  classNames={{
                    base: '[&_button]:rounded border-light'
                  }}
                >
                  {count.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="mt-4 flex justify-center items-center">
                <Button
                  disabled={currentPage === 1}
                  variant="light"
                  disableAnimation={true}
                  className="data-[hover=true]:bg-transparent cursor-pointer"
                  onClick={() => {
                    setCurrentPage(currentPage-1);
                  }}
                >
                  <p className={`prose text-xs ${currentPage === 1 && 'text-[#ced1db]'}`}>Предыдущая</p>
                </Button>
                <Pagination
                  total={totalPagination}
                  page={currentPage}
                  onChange={setCurrentPage}
                  classNames={{
                    item: "prose font-['Work Sans',sans-serif] text-red min-w-8 w-8 h-8 bg-transparent",
                    cursor: "prose font-['Work Sans',sans-serif] text-red min-w-8 w-8 h-8 bg-[#e4e7ec]",
                  }}
                />
                <Button
                  disabled={currentPage === totalPagination}
                  variant="light"
                  disableAnimation={true}
                  className="data-[hover=true]:bg-transparent cursor-pointer"
                  onClick={() => {
                    setCurrentPage(currentPage+1);
                  }}
                >
                  <p className={`prose text-xs ${currentPage === totalPagination && 'text-[#ced1db]'}`}>Следующая</p>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[20%] bg-white py-2 px-4">
            <div className="flex items-center gap-x-4 pb-2">
              <Image src={Calendar} alt="icon" />
              <p className="font-['Work Sans',sans-serif] text-[#35415A] prose font-semibold">01 мая 2023 - 12 июн 2023</p>
            </div>
            <div className="py-2 px-4 bg-[#f6f6f7] rounded-lg">
              <div className="flex items-center gap-x-2">
                <Image src={BlackSpam} alt="icon" />
                <p className="font-['Work Sans',sans-serif] text-[#35415A] prose font-semibold">Корзина</p>
              </div>
              <div className="mt-2">
                {spamLinks.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <p className="prose prose-sm font-['Work Sans',sans-serif] text-[#4e70b8]">{item.label}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex flex-col gap-y-1 border-b pb-4">
                <p className="font-['Work Sans',sans-serif] prose text-xs uppercase text-[#8c8f95] mb-1">Тип удаления</p>
                <Checkbox
                  size="md"
                  className="w-full max-w-full"
                  classNames={{
                    base: 'rounded',
                    wrapper: 'rounded before:rounded before:border after:rounded',
                    label: 'w-full'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="prose prose-sm font-['Work Sans',sans-serif] text-[#4e70b8]">Вручную</p>
                    <p className="text-[#575b66] prose prose-sm font-['Work Sans',sans-serif]">1088</p>
                  </div>
                </Checkbox>
              </div>
              <div className="flex flex-col gap-y-1 border-b pb-4">
                <p className="font-['Work Sans',sans-serif] prose text-xs uppercase text-[#8c8f95] mb-1">Источники</p>
                {srcCount.map((item) => (
                  <Checkbox
                    key={item.src}
                    size="md"
                    className="w-full max-w-full"
                    classNames={{
                      base: 'rounded',
                      wrapper: 'rounded before:rounded before:border after:rounded',
                      label: 'w-full'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="prose prose-sm font-['Work Sans',sans-serif] text-[#4e70b8]">{item.src}</p>
                      <p className="text-[#575b66] prose prose-sm font-['Work Sans',sans-serif]">{item.count}</p>
                    </div>
                  </Checkbox>
                ))}

              </div>
              <Input
                type="text"
                labelPlacement="outside-left"
                placeholder="Поиск источника"
                variant="bordered"
                className="w-full [&_.h-full]:w-full [&_.relative]:rounded-lg [&_.relative]:border"
                endContent={
                  <Image src={GraySearch} alt="icon" />
                }
                classNames={{
                  base: '[&_button]:rounded border-light'
                }}
              />
            </div>
            <Button className="w-full mt-4 rounded bg-[#5b85ce]">
              <p className="prose font-['Work Sans',sans-serif] prose-sm text-white">Отфильтровать</p>
            </Button>
            <Button className="w-full mt-4 rounded bg-[#5b85ce]" onClick={() => {
              router.push('/tag/addTags');
            }}>
              <p className="prose font-['Work Sans',sans-serif] prose-sm text-white">Для создание тегов</p>
            </Button>
          </div>
        </div>
      </MainLayout>
    </ProtectLayout>
  )
}

export default spamIndex;
