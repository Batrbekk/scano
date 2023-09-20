import styles from './index.module.scss';
import {useTranslation} from "react-i18next";
import {COMMON_TNS} from "@/lib/i18n/consts";
import ProjectCardMob from "@/components/atomic/ProjectCardMob";
import icMarketMob from 'public/assets/img/icMarket-mob.webp';
import icMarketDesc from 'public/assets/img/icMarket-desc.webp';
import foodyMob from 'public/assets/img/foody-mob.webp';
import foodyDesc from 'public/assets/img/foody-desc.webp';
import flappMob from 'public/assets/img/flapp-mob.webp';
import flappDesc from 'public/assets/img/flapp-desc.webp';
import engMob from 'public/assets/img/eng-mob.webp';
import engDesc from 'public/assets/img/eng-desc.webp';
import kaltadaMob from 'public/assets/img/kaltada-mob.webp';
import kaltadaDesc from 'public/assets/img/kaltada-desc.webp';
import lionMob from 'public/assets/img/lion-mob.webp';
import lionDesc from 'public/assets/img/lion-desc.webp';
import ProjectCardDesc from "@/components/atomic/ProjectCardDesc";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";

export const Projects = () => {
  const { t } = useTranslation([COMMON_TNS]);

  const cardMobData = [
    {
      title: 'IC-Market',
      text: t('icMarketDesc'),
      icon: icMarketMob,
      className: 'bg-[#00BA77] md:max-w-[350px]',
      height: 'h-[450px] md:h-[516px]',
      imgPosition: '-bottom-1.5 right-0 max-w-[75%]',
      aos: 'fade-left'
    },
    {
      title: 'Foody',
      text: t('foodyDesc'),
      icon: foodyMob,
      className: 'bg-[#0046FA] md:max-w-[350px]',
      height: 'h-[350px] md:h-[516px]',
      imgPosition: '-bottom-1.5 left-0 max-w-[75%]',
      aos: 'fade-right'
    },
    {
      title: 'Flapp',
      text: t('flappDesc'),
      icon: flappMob,
      className: 'bg-[#FF004C] md:max-w-[350px]',
      height: 'h-[350px] md:h-[516px]',
      imgPosition: '-bottom-1.5 right-0',
      aos: 'fade-left'
    },
    {
      title: 'Learning English Mobile App',
      text: t('englishAppDesc'),
      icon: engMob,
      className: 'bg-[#0089ED] md:max-w-[350px]',
      height: 'h-[350px] md:h-[516px]',
      imgPosition: '-bottom-1.5 max-w-[75%]',
      aos: 'fade-right'
    },
    {
      title: 'Kaltada',
      text: t('kaltadaDesc'),
      icon: kaltadaMob,
      className: 'bg-[#CE00DB] md:max-w-[350px]',
      height: 'h-[350px] md:h-[516px]',
      imgPosition: '-bottom-1.5 right-0 max-w-[70%]',
      aos: 'fade-left'
    },
    {
      title: 'Lion Pride',
      text: t('lionPrideDesc'),
      icon: lionMob,
      className: 'bg-[#9227FF] md:max-w-[350px]',
      height: 'h-[450px] md:h-[516px]',
      imgPosition: '-bottom-1.5 right-0 max-w-[75%]',
      aos: 'fade-right'
    }
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex flex-col gap-y-5 px-5 md:gap-y-12 lg:container lg:max-w-[1280px] lg:px-0 mx-auto">
      <p data-aos="fade-up" className="text-white font-['Raleway',sans-serif] font-bold text-[28px] leading-[130%] md:text-[54px] md:leading-[120%]">
        {t('ourProject')}
      </p>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-y-4 md:gap-4 lg:hidden">
        {cardMobData.map((card) => {
          return (
            <ProjectCardMob
              key={card.title}
              title={card.title}
              text={card.text}
              icon={card.icon}
              className={card.className}
              height={card.height}
              imgPosition={card.imgPosition}
              aos={card.aos}
            />
          )
        })}
      </div>
      <div className="flex-col hidden lg:flex gap-y-4">
        <div className="flex items-center justify-start gap-x-4 w-full">
          <div data-aos="fade-right">
            <ProjectCardDesc
              bigCard={true}
              title="IC-Market"
              text={t('icMarketDesc')}
              icon={icMarketDesc}
              className="bg-[#00BA77]"
              imgPosition="-bottom-2"
            />
          </div>
          <div data-aos="fade-left" className="flex flex-col gap-y-4">
            <ProjectCardDesc
              bigCard={false}
              title="Foody"
              icon={foodyDesc}
              text={t('foodyDesc')}
              className="bg-[#0046FA]"
              textPosition="right-10"
            />
            <ProjectCardDesc
              bigCard={false}
              title="Flapp"
              icon={flappDesc}
              text={t('flappDesc')}
              className="bg-[#FF004C]"
              textPosition="left-10"
            />
          </div>
        </div>
        <div className="flex flex-row-reverse justify-end gap-x-4 w-full">
          <div data-aos="fade-left">
            <ProjectCardDesc
              bigCard={true}
              title="Lion Pride"
              text={t('lionPrideDesc')}
              icon={lionDesc}
              className="bg-[#9227FF]"
              imgPosition="-bottom-2 right-0 max-w-[85%]"
            />
          </div>
          <div data-aos="fade-right" className="flex flex-col gap-y-4">
            <ProjectCardDesc
              bigCard={false}
              title="Learning English Mobile App"
              icon={engDesc}
              text={t('englishAppDesc')}
              className="bg-[#0089ED]"
              textPosition="right-10"
            />
            <ProjectCardDesc
              bigCard={false}
              title="Kaltada"
              icon={kaltadaDesc}
              text={t('kaltadaDesc')}
              className="bg-[#CE00DB]"
              textPosition="left-10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects;
