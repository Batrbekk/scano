import React, {useEffect, useState} from "react";
import Logo from "public/logo.svg";
import Image from "next/image";
import { COMMON_TNS } from "@/lib/i18n/consts";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale || "en", [
        COMMON_TNS,
      ])),
      // Will be passed to the page component as props
    },
  };
};

const Homepage: NextPage = () => {
  const router = useRouter();
  const [forgotPassword, setForgotPassword] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    const statusForgot = localStorage.getItem('forgotPassword');
    if (statusForgot) {
      setForgotPassword(statusForgot);
    }
  }, []);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    setErrorLogin(login !== 'admin');
    setErrorPassword(password !== 'admin');

    if (login === 'admin' && password === 'admin') {
      localStorage.setItem('forgotPassword', 'REJECT');
      router.push('/main/');
    }
  }

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        handleClick();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [login, password]);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute top-20">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="max-w-lg w-full flex flex-col gap-y-5">
        {forgotPassword === 'APPROVE' && (
          <div className="bg-[#eeeeee] rounded py-2 px-3 border-l-[8px] border-[#60CA23]">
            <p className="text-[#848484] font-['Work Sans',sans-serif] font-light prose-sm">Көрсетілген адреске хат жолданды</p>
          </div>
        )}
        <Input
          type="text"
          error={errorLogin}
          placeholder="E-mail"
          label="Қате login"
          value={login}
          onChange={handleLogin}
        />
        <Input
          type="password"
          error={errorPassword}
          placeholder="Құпия сөз"
          label="Қате password"
          value={password}
          onChange={handlePassword}
        />
        <Button label="Кіру" onClick={handleClick} size="lg"/>
        <a href="/auth/forgot_password" className="text-center font-['Work Sans',sans-serif] text-[#757575] hover:text-[#434445] prose-base">
          Парольді ұмыттыңызба?
        </a>
      </div>
    </div>
  );
};

export default Homepage;
