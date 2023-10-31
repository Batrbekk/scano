import Image from "next/image";
import Logo from "@public/logo.svg";
import {useRouter} from "next/router";
import React, {ReactNode, useEffect, useState} from "react";
import Plus from "@public/assets/icons/plus.svg";
import Copy from "@public/assets/icons/copy.svg";
import Footer from "@/components/molecule/Footer";
import Minus from "@public/assets/icons/minus.svg";
import Message from "@public/assets/icons/message.svg"
import NewMess from "@public/assets/icons/newMess.svg";
import Journal from "@public/assets/icons/journal.svg";
import Analytic from "@public/assets/icons/analytic.svg";
import LayoutNavbar from "@/components/molecule/LayoutNavbar";
import WhiteNewMess from "@public/assets/icons/whiteNewMess.svg";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import WhiteMessage from "@public/assets/icons/whiteMessage.svg";
import WhiteJournal from "@public/assets/icons/whiteJournal.svg";


type MainLayoutProps = {
  children: ReactNode;
};

export const mainLayout: React.FC<MainLayoutProps> = ({children}) => {
  const router = useRouter();
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(router.asPath.substring(1));
  }, []);

  return (
    <div className="flex w-screen">
      <div className="fixed h-screen bg-[#37475F] w-64 px-6 py-3">
        <a href="/main/">
          <Image src={Logo} alt="logo" />
        </a>
        <div className="mt-12">
          <div className="mb-6">
            <p className="text-[#6481AD] uppercase mb-5 text-xs font-['Montserrat',sans-serif] font-semibold">Аналитика</p>
            <Accordion
              className="px-0"
              itemClasses={{
                indicator: "data-[open=true]:rotate-180"
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                className="text-[#6481AD] pl-2 [&_h2]:w-full [&_button]:p-0 [&_button]:justify-between"
                startContent={
                  <div className="flex items-center gap-x-4">
                    <Image src={Analytic} alt="icon" />
                    <p className="font-['Montserrat',sans-serif] text-base font-semibold">Аналитика</p>
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
                asd
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mb-6">
            <p className="text-[#6481AD] uppercase mb-5 text-xs font-['Montserrat',sans-serif] font-semibold">Материалдар</p>
            <Accordion
              className="px-0"
              itemClasses={{
                indicator: "data-[open=true]:rotate-180"
              }}
            >
              <AccordionItem
                key="1"
                aria-label="1"
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
          </div>
        </div>
      </div>
      <div className="ml-64 flex flex-col w-full h-screen justify-between bg-[#F8F9FB]">
        <div>
          <LayoutNavbar />
          <div className="bg-[#F8F9FB] px-6">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default mainLayout;
