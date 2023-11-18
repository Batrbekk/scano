import React from "react";
import Logo from "public/logo.svg";
import Image from "next/image";
import Exit from "@public/assets/icons/exit.svg";
import Profile from "@public/assets/icons/profile.svg";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/dropdown";

interface Props {
  email?: string,
  first_name?: string | null,
  last_name?: string | null,
  photo_url?: string | null,
  role?: string
}

export const Navbar: React.FC<Props> = ({email, first_name, last_name, role, photo_url}) => {
  return (
    <div className="bg-[#F8F9FB] w-screen flex items-center justify-between px-6 py-3">
      <a href="/main/">
        <Image src={Logo} alt="logo" />
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
        <DropdownMenu aria-label="actions">
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
