import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Home from '@public/assets/icons/home.svg';
import { useRouter } from "next/router";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";
import Profile from "@public/assets/icons/profile.svg";
import Exit from "@public/assets/icons/exit.svg";
import {deleteCookie, getCookie} from "cookies-next";
import {Button} from "@nextui-org/react";
import {Tooltip} from "@nextui-org/tooltip";

interface Props {
  email?: string,
  first_name?: string | null,
  last_name?: string | null,
  photo_url?: string | null,
  role?: string
}

export const LayoutNavbar: React.FC<Props> = ({email, first_name, last_name, role, photo_url}) => {
  const router = useRouter();
  const token = getCookie('scano_acess_token');
  const themeName = getCookie('currentThemeName');
  const [currentImg, setCurrentImg] = useState<string | null>(null);

  const handleSelectLang = useCallback((lang: any) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  }, []);

  const getImg = async (img: string) => {
    try {
      const res = await fetch(`https://test.scano.kz/files/${img}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        setCurrentImg(res.url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const dropFunction = (key: React.Key) => {
    if (key === 'profile') {
      router.push('/setting/profile')
    }
    if (key === 'exit') {
      deleteCookie('scano_acess_token');
      router.push('/');
    }
  };

  useEffect(() => {
    if (photo_url) {
      getImg(photo_url)
    }
  }, [photo_url]);

  return (
    <div className="bg-[#F8F9FB] w-full flex items-center justify-between p-6">
      <p className="text-[#35415A] prose prose-xl font-['Work Sans',sans-serif] capitalize">Тема: {themeName}</p>
      <div className="flex items-center gap-x-8">
        <Dropdown
          classNames={{
            base: 'data-[placement=bottom]:rounded !min-w-[32px]'
          }}
          showArrow={true}
        >
          <DropdownTrigger
            className="rounded px-0 min-w-unit-10"
          >
            <Button
              variant="bordered"
              className="uppercase"
            >
              {router.locale}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={(key) => handleSelectLang(key)}
          >
            <DropdownItem className="data-[hover=true]:rounded" key="kk">KK</DropdownItem>
            <DropdownItem className="data-[hover=true]:rounded" key="en">EN</DropdownItem>
            <DropdownItem className="data-[hover=true]:rounded" key="ru">RU</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Tooltip content="На главную">
          <a href="/main/">
            <Image
              className="h-8 w-8 cursor-pointer"
              src={Home}
              alt="icon"
            />
          </a>
        </Tooltip>
        <Dropdown>
          <DropdownTrigger>
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                {currentImg ? (
                  <Image src={currentImg} alt="ava" width={36} height={36} />
                ) : (
                  <div className="w-9 h-9 bg-gray-500" />
                )}
              </div>
              <p className="text-[#35415A] prose-base font-['Work Sans',sans-serif] font-semibold">{first_name ? first_name : 'Не указано'} {last_name}</p>
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="actions"
            onAction={(key) => dropFunction(key)}
          >
            <DropdownSection showDivider>
              <DropdownItem>
                <div className="flex flex-col">
                  <p className="text-[#35415A] font-['Montserrat',sans-serif] prose-lg font-medium">{email}</p>
                  <p className="text-[#35415A] font-['Montserrat',sans-serif] prose-sm">{role}</p>
                </div>
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              key="profile"
              startContent={<Image src={Profile} alt="icon" />}
            >
              <p className="text-[#35415A] font-['Montserrat',sans-serif] prose-sm">Профиль</p>
            </DropdownItem>
            <DropdownItem
              key="exit"
              startContent={<Image src={Exit} alt="icon" />}
            >
              <p className="text-[#35415A] font-['Montserrat',sans-serif] prose-sm">Шығу</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

export default LayoutNavbar;
