import React, {useEffect, useState} from "react";
import Logo from "public/logo.svg";
import Image from "next/image";
import Exit from "@public/assets/icons/exit.svg";
import Profile from "@public/assets/icons/profile.svg";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";
import {deleteCookie, getCookie} from "cookies-next";
import {useRouter} from "next/router";

interface Props {
  email?: string,
  first_name?: string | null,
  last_name?: string | null,
  photo_url?: string | null,
  role?: string
}

export const Navbar: React.FC<Props> = ({email, first_name, last_name, role, photo_url}) => {
  const router = useRouter();
  const token = getCookie('scano_acess_token');
  const [currentImg, setCurrentImg] = useState<string | null>(null);

  const dropFunction = (key: React.Key) => {
    if (key === 'profile') {
      router.push('/setting/profile')
    }
    if (key === 'exit') {
      deleteCookie('scano_acess_token');
      router.push('/');
    }
  };

  const getImg = async (img: string) => {
    try {
      const res = await fetch(`https://scano-0df0b7c835bf.herokuapp.com/files/${img}`,
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

  useEffect(() => {
    if (photo_url) {
      getImg(photo_url)
    }
  }, [photo_url]);

  return (
    <div className="bg-[#F8F9FB] w-screen flex items-center justify-between px-6 py-3">
      <a href="/main/">
        <Image src={Logo} alt="logo" />
      </a>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              {currentImg ? (
                <Image src={currentImg} alt="ava" width={36} height={36}/>
              ) : (
                <div className="w-9 h-9 bg-gray-500"/>
              )}
            </div>
            <p
              className="text-[#35415A] prose-base font-['Work Sans',sans-serif] font-semibold">{first_name ? first_name : 'Не указано'} {last_name}</p>
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
  )
}

export default Navbar;
