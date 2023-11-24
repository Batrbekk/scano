import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Home from '@public/assets/icons/home.svg';
import { useRouter } from "next/router";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";
import Profile from "@public/assets/icons/profile.svg";
import Exit from "@public/assets/icons/exit.svg";
import {deleteCookie} from "cookies-next";
import {Button} from "@nextui-org/react";
import {useTranslation} from "next-i18next";
import {COMMON_TNS} from "@/lib/i18n/consts";
import {getDictionary} from "@public/dictionaries";

interface Props {
  email?: string,
  first_name?: string | null,
  last_name?: string | null,
  photo_url?: string | null,
  role?: string
}

export const LayoutNavbar: React.FC<Props> = ({email, first_name, last_name, role, photo_url}) => {
  const router = useRouter();
  const [name, setMenu] = useState('');
  const dict = getDictionary(router.locale)

  const handleSelectLang = useCallback((lang: any) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  }, []);

  useEffect(() => {
    setMenu(router.asPath.substring(1));
  }, []);

  const dropFunction = (key: React.Key) => {
    if (key === 'profile') {
      router.push('/setting/profile')
    }
    if (key === 'exit') {
      deleteCookie('scano_acess_token');
      router.push('/');
    }
  };

  return (
    <div className="bg-[#F8F9FB] w-full flex items-center justify-between p-6">
      <p className="text-[#35415A] prose prose-xl font-['Work Sans',sans-serif] capitalize">{name}</p>
      <div className="flex items-center gap-x-8">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              {router.locale}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={(key) => handleSelectLang(key)}
          >
            <DropdownItem key="kk">Казахский</DropdownItem>
            <DropdownItem key="en">Английский</DropdownItem>
            <DropdownItem key="ru">Русский</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <a href="/main/">
          <Image
            className="h-8 w-8 cursor-pointer"
            src={Home}
            alt="icon"
          />
        </a>
        <Dropdown>
          <DropdownTrigger>
            <div className="flex items-center gap-4 cursor-pointer">
              <img
                className="h-9 w-9 rounded-full"
                src={photo_url ? photo_url : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'}
                alt="avatar"
              />
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
