import Image from "next/image";
import styles from "./index.module.scss";
import {useTranslation} from "react-i18next";
import {COMMON_TNS} from "@/lib/i18n/consts";
import Switch from "@/components/atomic/Switch";
import Close from "public/assets/icons/close.svg";
import React, { useCallback, useState } from "react";

export const DrawerMenu = () => {
  const { t } = useTranslation([COMMON_TNS]);
  const [show, setShow] = useState<boolean>(false);

  const showModal = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <>
      <button className="sm:block md:block lg:hidden" onClick={showModal}>
        <svg width="22" height="22" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.916341 0.166687C0.695327 0.166687 0.483366 0.254485 0.327085 0.410765C0.170805 0.567045 0.0830078 0.779007 0.0830078 1.00002C0.0830078 1.22103 0.170805 1.433 0.327085 1.58928C0.483366 1.74556 0.695327 1.83335 0.916341 1.83335H15.083C15.304 1.83335 15.516 1.74556 15.6723 1.58928C15.8285 1.433 15.9163 1.22103 15.9163 1.00002C15.9163 0.779007 15.8285 0.567045 15.6723 0.410765C15.516 0.254485 15.304 0.166687 15.083 0.166687H0.916341ZM0.0830078 6.00002C0.0830078 5.77901 0.170805 5.56705 0.327085 5.41076C0.483366 5.25448 0.695327 5.16669 0.916341 5.16669H15.083C15.304 5.16669 15.516 5.25448 15.6723 5.41076C15.8285 5.56705 15.9163 5.77901 15.9163 6.00002C15.9163 6.22103 15.8285 6.433 15.6723 6.58928C15.516 6.74556 15.304 6.83335 15.083 6.83335H0.916341C0.695327 6.83335 0.483366 6.74556 0.327085 6.58928C0.170805 6.433 0.0830078 6.22103 0.0830078 6.00002ZM0.0830078 11.0009C0.0830078 10.7798 0.170805 10.5679 0.327085 10.4116C0.483366 10.2553 0.695327 10.1675 0.916341 10.1675H15.083C15.304 10.1675 15.516 10.2553 15.6723 10.4116C15.8285 10.5679 15.9163 10.7798 15.9163 11.0009C15.9163 11.2219 15.8285 11.4338 15.6723 11.5901C15.516 11.7464 15.304 11.8342 15.083 11.8342H0.916341C0.695327 11.8342 0.483366 11.7464 0.327085 11.5901C0.170805 11.4338 0.0830078 11.2219 0.0830078 11.0009Z" fill="white"/>
        </svg>
      </button>
      <main
        className={
          `${show ?
            'opacity-100 translate-x-0 transition ease-in-out' : 'opacity-0 translate-x-full transition duration-300 ease-in-out'
          } 
            fixed overflow-hidden z-10 bg-black md:bg-white bg-opacity-90 inset-0 transform ease-in-out`
        }>
        <section
          className={
            `${show ?
              'translate-x-0 animate-fade-left animate-once' : 'translate-x-full'
            } w-screen max-w-lg right-0 absolute bg-black h-full shadow-xl transform md:rounded-l-3xl`
          }
        >
          <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full p-5">
            <div className="flex flex-col gap-y-8">
              <div className="flex items-center justify-between">
                <div className={`${styles.navLogo} flex flex-col items-start gap-x-4 md:flex-col md:items-start lg:flex-row lg:items-end`}>
                  <p className="text-[8px] md:text-lg text-white">Code Union</p>
                </div>
                <button onClick={showModal}>
                  <Image src={Close} alt="close-icon" />
                </button>
              </div>
              <Switch className="block md:hidden max-w-[116px]" />
              <div className={`${styles.navLinks} flex flex-col gap-y-4`}>
                <a href="#" onClick={showModal} className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-xl py-2 border-b">
                  {t('portfolio')}
                </a>
                <a href="#" onClick={showModal} className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-xl py-2 border-b">
                  {t('blog')}
                </a>
                <a href="#" onClick={showModal} className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-xl py-2 border-b">
                  {t('events')}
                </a>
                <a href="#" onClick={showModal} className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-xl py-2 border-b">
                  {t('vacancy')}
                </a>
              </div>
            </div>
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={showModal}
        ></section>
      </main>
    </>
  )
}

export default DrawerMenu;
