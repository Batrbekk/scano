import React, {useCallback} from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { COMMON_TNS } from "@/lib/i18n/consts";

type Props = {
    className: string,
};

export const Switch: React.FC<Props> = (props) => {
    const router = useRouter();

    const { t, i18n } = useTranslation([COMMON_TNS]);

    const handleSelectLang = useCallback(() => {
        if (i18n.language === 'ru') {
            i18n.changeLanguage('en');
            router.push(router.pathname, router.asPath, { locale: 'en' });
        } else {
            i18n.changeLanguage('ru');
            router.push(router.pathname, router.asPath, { locale: 'ru' });
        }
    }, []);

    return (
      <div onClick={handleSelectLang} className={`${styles.switcher} ${props.className} px-6 py-3 border rounded-full border-[rgba(255,255,255,0.4)] hover:border-white flex items-center gap-x-2 cursor-pointer`}>
        <a className={router.locale === 'ru' ? 'text-white':'text-[rgba(255,255,255,0.2)]'}>
            RU
        </a>
        <span className="text-white">/</span>
        <a className={router.locale === 'en' ? 'text-white':'text-[rgba(255,255,255,0.2)]'}>
            EN
        </a>
      </div>
    );
}

export type { Props as SwitchProps };
export default Switch;
