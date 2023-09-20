import Link from "next/link";
import Image from "next/image";
import styles from './index.module.scss';
import Logo from 'public/assets/logo.svg';
import {useTranslation} from "react-i18next";
import {COMMON_TNS} from "@/lib/i18n/consts";
import WhatsappIcon from "public/assets/icons/whatsapp.svg";
import LinkedinIcon from "public/assets/icons/linkedin.svg";
import InstagramIcon from "public/assets/icons/instagram.svg";

export const Footer = () => {
  const { t } = useTranslation([COMMON_TNS]);

  return (
    <div className="bg-gradient-to-r from-[rgba(97,97,97,0.2)] to-[rgba(46,46,46,0.2)]">
      <div className={`${styles.footerContainer} py-10 px-5 lg:px-0 flex flex-col gap-y-6 lg:container lg:max-w-[1280px] mx-auto lg:py-20 lg:gap-y-12`}>
        <div className={styles.footerLogo}>
          <Image src={Logo} alt="logo" />
        </div>
        <div className="flex flex-col md:flex-row-reverse md:flex-wrap md:justify-end md:gap-[42px] gap-y-5">
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-[42px] gap-y-5">
            <div className="flex flex-col gap-y-2 lg:gap-y-4 lg:w-[250px]">
              <p className="font-['Gilroy',sans-serif] font-bold text-base leading-[150%] md:text-xl text-white">
                {t('footerTitles.0')}
              </p>
              <div className="flex flex-col gap-y-1 text-[#616161] font-['Gilroy',sans-serif] cursor-pointer text-sm leading-[150%] md:text-[18px]">
                <Link href="mailto:maripbekoff@gmail.com">
                  maripbekoff@gmail.com
                </Link>
                <Link href="tel:+77774183462">
                  +7 777 418 34 62
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 lg:gap-y-4 lg:w-[250px]">
              <p className="font-['Gilroy',sans-serif] font-bold text-base leading-[150%] md:text-xl text-white">
                {t('footerTitles.1')}
              </p>
              <div
                className="flex flex-col gap-y-1 text-[#616161] underline font-['Gilroy',sans-serif] cursor-pointer text-sm leading-[150%] md:text-[18px]"
              >
                <Link href="#">
                  Наши курсы
                </Link>
                <Link href="#">
                  Trade Union
                </Link>
                <Link href="#">
                  Web Code Union
                </Link>
              </div>
            </div>
            <div className={`flex flex-col gap-y-2 lg:gap-y-4 lg:w-[250px] ${styles.footerSocialContainer}`}>
              <p className="font-['Gilroy',sans-serif] font-bold text-base leading-[150%] md:text-xl text-white">
                {t('footerTitles.2')}
              </p>
              <div className="flex gap-x-4">
                <div className="cursor-pointer">
                  <Link href="#">
                    <Image src={WhatsappIcon} alt="social-icon" />
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <Link href="#">
                    <Image src={LinkedinIcon} alt="social-icon" />
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <Link href="#">
                    <Image src={InstagramIcon} alt="social-icon" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 lg:gap-y-4 lg:w-[250px]">
            <p className="font-['Gilroy',sans-serif] font-bold text-base leading-[150%] md:text-xl text-white">
              Code Union
            </p>
            <div className="flex flex-col gap-y-1 text-[#616161]">
              <p className="font-['Gilroy',sans-serif] cursor-pointer text-sm leading-[150%] md:text-[18px]">
                {t('footerAddress')}
              </p>
              <p className="font-['Gilroy',sans-serif] cursor-pointer text-sm leading-[150%] md:text-[18px]">
                Copyright 2018-2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
