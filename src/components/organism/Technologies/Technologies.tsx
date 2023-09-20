import Image from "next/image";
import styles from './index.module.scss';
import {useTranslation} from "react-i18next";
import {COMMON_TNS} from "@/lib/i18n/consts";
import JavaIcon from 'public/assets/icons/java.svg';
import NodeIcon from 'public/assets/icons/node.svg';
import ReactIcon from 'public/assets/icons/react.svg';
import SwiftIcon from 'public/assets/icons/swift.svg';
import KotlinIcon from 'public/assets/icons/kotlin.svg';
import GolangIcon from 'public/assets/icons/goLang.svg';
import PythonIcon from 'public/assets/icons/python.svg';
import FlutterIcon from 'public/assets/icons/flutter.svg';
import {useEffect} from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

export const Technologies = () => {
  const { t } = useTranslation([COMMON_TNS]);

  const techData = [
    {
      id: 1,
      icon: FlutterIcon,
      text: 'Flutter'
    },
    {
      id: 2,
      icon: KotlinIcon,
      text: 'Kotlin'
    },
    {
      id: 3,
      icon: GolangIcon,
      text: 'Golang'
    },
    {
      id: 4,
      icon: JavaIcon,
      text: 'Java'
    },
    {
      id: 5,
      icon: ReactIcon,
      text: 'React'
    },
    {
      id: 6,
      icon: PythonIcon,
      text: 'Python'
    },
    {
      id: 7,
      icon: SwiftIcon,
      text: 'Swift'
    },
    {
      id: 8,
      icon: NodeIcon,
      text: 'Node.JS'
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div data-aos="fade-up" className={`${styles.techContainer} px-5 py-24 lg:container lg:max-w-[1280px] lg:px-0 mx-auto`}>
      <p className="font-['Raleway',sans-serif] font-bold text-white text-[28px] leading-[120%] mb-8 md:mb-16 md:text-[54px]">
        {t('technologies')}
      </p>
      <div className="grid grid-cols-4 gap-y-5 gap-x-3 lg:flex lg:justify-between">
        {techData.map((card) => {
          return (
            <div key={card.id} className="flex flex-col w-full items-center gap-y-2.5 lg:max-w-[145px] lg:gap-y-7">
              <Image src={card.icon} alt="tech-icon" />
              <p className="text-white font-['Gilroy',sans-serif] text-xs leading-[150%] md:text-xl">{card.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Technologies;
