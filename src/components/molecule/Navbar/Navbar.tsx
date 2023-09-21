import React from "react";
import Logo from "public/logo.svg";
import Image from "next/image";

export const Navbar: React.FC = () => {
  return (
    <div className="bg-[#F8F9FB] w-screen flex items-center justify-between px-6 py-3">
      <Image src={Logo} alt="logo" />
      <div className="flex items-center gap-4">
        <img
          className="h-9 w-9 rounded-full"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt="avatar"
        />
        <p className="text-[#35415A] prose-base font-['Work Sans',sans-serif] font-semibold">Aslan Abylkas</p>
      </div>
    </div>
  )
}

export default Navbar;
