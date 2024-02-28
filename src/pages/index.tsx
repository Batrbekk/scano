import React, {useEffect, useState} from "react";
import Logo from "public/logo.svg";
import Image from "next/image";
import { COMMON_TNS } from "@/lib/i18n/consts";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import { useRouter } from "next/router";
import {getCookie, setCookie} from 'cookies-next';
import {Spinner} from "@nextui-org/spinner";

const Homepage: NextPage = () => {
  const router = useRouter();
  const [forgotPassword, setForgotPassword] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);

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

  const handleClick = async () => {
    if (!login || !password) {
      setErrorLogin(!login);
      setErrorPassword(!password);
      return;
    }
    try {
      setPending(true);
      setErrorLogin(false);
      setErrorPassword(false);
      const res = await fetch(
        'https://test.scano.kz/api/v1/users/login',
        {
          method: 'POST', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: login,
            password: password,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('forgotPassword', 'REJECT');
        setCookie('scano_acess_token', data.access_token);
        await router.push('/main/');
      } else {
        setPending(false);
        console.error('Login failed');
        setErrorLogin(true);
        setErrorPassword(true);
      }
    } catch (err) {
      setPending(false);
      console.error(err);
    }
  };


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
        <Button label={
          pending ? (<Spinner color="white" size="sm" />) : 'Войти'
        } onClick={handleClick} size="lg"/>
        <a href="/auth/send_password" className="text-center font-['Work Sans',sans-serif] text-[#757575] hover:text-[#434445] prose-base">
          Парольді ұмыттыңызба?
        </a>
      </div>
    </div>
  );
};

export default Homepage;
