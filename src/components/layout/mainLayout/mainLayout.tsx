import Image from "next/image";
import Logo from "@public/logo.svg";
import {useRouter} from "next/router";
import React, {FC, ReactNode, useEffect, useState} from "react";
import Plus from "@public/assets/icons/plus.svg";
import Spam from "@public/assets/icons/spam.svg";
import Copy from "@public/assets/icons/copy.svg";
import Footer from "@/components/molecule/Footer";
import Minus from "@public/assets/icons/minus.svg";
import Message from "@public/assets/icons/message.svg"
import NewMess from "@public/assets/icons/newMess.svg";
import Journal from "@public/assets/icons/journal.svg";
import Setting from "@public/assets/icons/setting.svg";
import Analytic from "@public/assets/icons/analytic.svg";
import WhiteSpam from "@public/assets/icons/whiteSpam.svg";
import LayoutNavbar from "@/components/molecule/LayoutNavbar";
import WhiteNewMess from "@public/assets/icons/whiteNewMess.svg";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import WhiteMessage from "@public/assets/icons/whiteMessage.svg";
import WhiteJournal from "@public/assets/icons/whiteJournal.svg";
import WhiteAnalytic from "@public/assets/icons/whiteAnalytic.svg";
import {Profile} from "@/types";
import {getCookie} from "cookies-next";

type MainLayoutProps = {
  children: ReactNode;
  withPadding?: boolean;
};

const defaultProps: MainLayoutProps = {
  children: null, // You can provide a default value for children or set it as null
  withPadding: true,
};

const mainLayout: FC<MainLayoutProps> = ({children, withPadding = defaultProps.withPadding}) => {
  const router = useRouter();
  const [path, setPath] = useState('');
  const [routerRoot, setRouterRoot] = useState('');
  const profileCookie = getCookie('profile');
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    if (process.browser && window) {
      if(profileCookie) {
        setProfile(JSON.parse(profileCookie));
      }
      setPath(router.asPath.substring(1));
      setRouterRoot(router.asPath.split('/').filter(Boolean)[0]);
    }
  }, [router, profileCookie]);

  return (
    <div className="flex w-screen">
      {routerRoot && (
        <div className="fixed h-screen bg-[#37475F] w-64 px-6 py-3">
          <a href="/main/">
            <Image src={Logo} alt="logo" />
          </a>
          <div className="mt-12">
            <div className="mb-6">
              <p className="text-[#6481AD] uppercase mb-5 text-xs font-['Montserrat',sans-serif] font-semibold">Аналитика</p>
              <div className={`pl-2 flex items-center gap-x-4 cursor-pointer py-2 ${(path === 'analytic') && 'bg-[#848F9F] rounded'}`} onClick={() => {
                router.push('/analytic');
              }}>
                <Image src={(path === 'analytic') ? WhiteAnalytic : Analytic} alt="icon" />
                <p className={`font-['Montserrat',sans-serif] text-base font-semibold ${(path === 'analytic') ? 'text-white' : 'text-[#6481AD]'}`}>Аналитика</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-[#6481AD] uppercase mb-4 text-xs font-['Montserrat',sans-serif] font-semibold">Материалдар</p>
              <Accordion
                className="px-0"
                itemClasses={{
                  indicator: "data-[open=true]:rotate-180"
                }}
                defaultExpandedKeys={[routerRoot]}
              >
                <AccordionItem
                  key="dashboard"
                  aria-label="dashboard"
                  className="text-[#6481AD] pl-2 [&_h2]:w-full [&_button]:p-0 [&_button]:justify-between"
                  startContent={
                    <div className="flex items-center gap-x-4">
                      <Image src={Copy} alt="icon" />
                      <p className="font-['Montserrat',sans-serif] text-base font-semibold">Материалдар</p>
                    </div>
                  }
                  indicator={({isOpen}) => (isOpen ?
                      <div className="ml-auto">
                        <Image src={Minus} alt="icon" />
                      </div>
                      :
                      <div className="ml-auto">
                        <Image src={Plus} alt="icon" />
                      </div>
                  )}
                >
                  <div className="border-l-2 border-[#6481AD] ml-2 mt-4 cursor-pointer" onClick={() => {
                    router.push('/dashboard');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${path === 'dashboard' ? `text-white pl-2` : `text-[#6481AD]`}`}>— Барлығы</p>
                  </div>
                  <div className="border-l-2 border-[#6481AD] ml-2 pt-4 cursor-pointer">
                    <p className="text-[#6481AD] prose prose-sm font-['Montserrat',sans-serif] font-semibold w-full">— Өңдеуден өтпегендер</p>
                  </div>
                </AccordionItem>
              </Accordion>
              <div className={`pl-2 flex items-center gap-x-4 mt-2 cursor-pointer py-2 ${(path === 'message' || path === 'message/addMessage') && 'bg-[#848F9F] rounded'}`} onClick={() => {
                router.push('/message');
              }}>
                <Image src={(path === 'message' || path === 'message/addMessage') ? WhiteMessage : Message} alt="icon" />
                <p className={`font-['Montserrat',sans-serif] text-base font-semibold ${(path === 'message' || path === 'message/addMessage') ? 'text-white' : 'text-[#6481AD]'}`}>Хабарламалар</p>
              </div>
              <div className={`pl-2 flex items-center gap-x-4 cursor-pointer py-2 ${(path === 'subscribe' || path === 'subscribe/addSubscribe') && 'bg-[#848F9F] rounded'}`} onClick={() => {
                router.push('/subscribe');
              }}>
                <Image src={(path === 'subscribe' || path === 'subscribe/addSubscribe') ? WhiteNewMess : NewMess} alt="icon" />
                <p className={`font-['Montserrat',sans-serif] text-base font-semibold ${(path === 'subscribe' || path === 'subscribe/addSubscribe') ? 'text-white' : 'text-[#6481AD]'}`}>Жазылымдар</p>
              </div>
              <div className={`pl-2 flex items-center gap-x-4 cursor-pointer py-2 ${(path === 'journal') && 'bg-[#848F9F] rounded'}`} onClick={() => {
                router.push('/journal');
              }}>
                <Image src={(path === 'journal') ? WhiteJournal : Journal} alt="icon" />
                <p className={`font-['Montserrat',sans-serif] text-base font-semibold ${(path === 'journal') ? 'text-white' : 'text-[#6481AD]'}`}>Журнал</p>
              </div>
              <div className={`pl-2 flex items-center gap-x-4 cursor-pointer py-2 ${(path === 'spam') && 'bg-[#848F9F] rounded'}`} onClick={() => {
                router.push('/spam');
              }}>
                <Image src={(path === 'spam') ? WhiteSpam : Spam} alt="icon" />
                <p className={`font-['Montserrat',sans-serif] text-base font-semibold ${(path === 'spam') ? 'text-white' : 'text-[#6481AD]'}`}>Спам</p>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <p className="text-[#6481AD] uppercase mb-4 text-xs font-['Montserrat',sans-serif] font-semibold">Баптаулар</p>
              <Accordion
                className="px-0"
                itemClasses={{
                  indicator: "data-[open=true]:rotate-180"
                }}
                defaultExpandedKeys={[routerRoot]}
              >
                <AccordionItem
                  key="setting"
                  aria-label="setting"
                  className="text-[#6481AD] pl-2 [&_h2]:w-full [&_button]:p-0 [&_button]:justify-between"
                  startContent={
                    <div className="flex items-center gap-x-4">
                      <Image src={Setting} alt="icon" />
                      <p className="font-['Montserrat',sans-serif] text-base font-semibold">Баптаулар</p>
                    </div>
                  }
                  indicator={({isOpen}) => (isOpen ?
                      <div className="ml-auto">
                        <Image src={Minus} alt="icon" />
                      </div>
                      :
                      <div className="ml-auto">
                        <Image src={Plus} alt="icon" />
                      </div>
                  )}
                >
                  <div className="border-l-2 border-[#6481AD] ml-2 mt-4 cursor-pointer" onClick={() => {
                    router.push('/setting/profile');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${(path === 'setting/profile' || path === 'setting/addProfile') ? `text-white pl-2` : `text-[#6481AD]`}`}>— Профиль</p>
                  </div>
                  <div className="border-l-2 border-[#6481AD] ml-2 pt-4 cursor-pointer" onClick={() => {
                    router.push('/setting/users');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${path === 'setting/users' ? `text-white pl-2` : `text-[#6481AD]`}`}>— Қолданушылар</p>
                  </div>
                  <div className="border-l-2 border-[#6481AD] ml-2 pt-4 cursor-pointer" onClick={() => {
                    router.push('/setting/integrations');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${path === 'setting/integrations' ? `text-white pl-2` : `text-[#6481AD]`}`}>— Интеграциялар</p>
                  </div>
                  <div className="border-l-2 border-[#6481AD] ml-2 pt-4 cursor-pointer" onClick={() => {
                    router.push('/setting/placeSettings');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${path === 'setting/placeSettings' ? `text-white pl-2` : `text-[#6481AD]`}`}>— Создать тему</p>
                  </div>
                  <div className="border-l-2 border-[#6481AD] ml-2 pt-4 cursor-pointer" onClick={() => {
                    router.push('/setting/rules');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${(path === 'setting/rules' || path === 'setting/addRule') ? `text-white pl-2` : `text-[#6481AD]`}`}>— Правила</p>
                  </div>
                  <div className="border-l-2 border-[#6481AD] ml-2 pt-4 cursor-pointer" onClick={() => {
                    router.push('/setting/createTag');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${(path === 'setting/createTag') ? `text-white pl-2` : `text-[#6481AD]`}`}>— Создание тега</p>
                  </div>
                  <div className="border-l-2 border-[#6481AD] ml-2 pt-4 cursor-pointer" onClick={() => {
                    router.push('/main/editTheme/');
                  }}>
                    <p className={`prose prose-sm font-['Montserrat',sans-serif] font-semibold ${(path === 'main/editTheme/') ? `text-white pl-2` : `text-[#6481AD]`}`}>— Редактировать тему</p>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      )}
      <div className="ml-64 flex flex-col w-full h-screen justify-between bg-[#F8F9FB]">
        <div>
          {profile && (
            <LayoutNavbar email={profile.email} role={profile.role} first_name={profile.first_name} last_name={profile.last_name} photo_url={profile.photo_url} />
          )}
          <div className={`bg-[#F8F9FB] px-6 ${!withPadding && '!px-0'}`}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default mainLayout;
