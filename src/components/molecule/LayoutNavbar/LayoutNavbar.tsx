import React, {useEffect, useState} from "react";
import Image from "next/image";
import Home from '@public/assets/icons/home.svg';
import { useRouter } from "next/router";

export const LayoutNavbar: React.FC = () => {
  const router = useRouter();
  const [name, setMenu] = useState('');

  useEffect(() => {
    setMenu(router.asPath.substring(1));
  }, []);

  return (
    <div className="bg-[#F8F9FB] w-full flex items-center justify-between p-6">
      <p className="text-[#35415A] prose prose-xl font-['Work Sans',sans-serif] capitalize">{name}</p>
      <div className="flex items-center gap-x-8">
        <a href="/main/">
          <Image
            className="h-8 w-8 cursor-pointer"
            src={Home}
            alt="icon"
          />
        </a>
        <div className="flex items-center gap-4">
          <img
            className="h-9 w-9 rounded-full"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt="avatar"
          />
          <p className="text-[#35415A] prose-base font-['Work Sans',sans-serif] font-semibold">Aslan Abylkas</p>
        </div>
      </div>
    </div>
  )
}

export default LayoutNavbar;
