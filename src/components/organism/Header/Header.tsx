import Image from "next/image";
import styles from './index.module.scss';
import { COMMON_TNS } from "@/lib/i18n/consts";
import { useTranslation } from "react-i18next";
import Switch from "@/components/atomic/Switch";
import ModalForm from "@/components/organism/ModalForm";
import React, { useEffect, useState } from "react";
import DrawerMenu from "@/components/organism/DrawerMenu";

type Props = {};

export const Header: React.FC<Props> = (props) => {
  const { t } = useTranslation([COMMON_TNS]);

  return (
    <div className={`fixed top-0 w-full z-10 bg-[#070809]`}>
      <header className="py-4 px-5 lg:px-0 lg:container mx-auto lg:max-w-[1280px] md:px-5 flex items-center justify-between">
        <div className={`${styles.navLogo} flex flex-col items-start gap-x-4 md:flex-col md:items-start lg:flex-row lg:items-end`}>
          <p className="text-[8px] md:text-lg text-white">Code Union</p>
        </div>
        <div className="flex items-center gap-x-10">
          <div className={`${styles.navLinks} hidden items-center gap-x-16  md:hidden lg:flex`}>
            <a href="#" className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-base">
              {t('portfolio')}
            </a>
            <a href="#" className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-base">
              {t('blog')}
            </a>
            <a href="#" className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-base">
              {t('events')}
            </a>
            <a href="#" className="text-[#c4c4c4] hover:text-white visited:text-[#616161] text-base">
              {t('vacancy')}
            </a>
          </div>
          <div className="flex items-center gap-x-4">
            <Switch className="hidden md:flex" />
            <ModalForm
              text={t('contactUs')}
              className="text-white px-6 py-3 rounded-full bg-[#0046FA] font-bold text-xs md:text-base"
            />
            <DrawerMenu />
          </div>
        </div>
      </header>
    </div>
  );
};

export type { Props as HeaderProps };
export default Header;
