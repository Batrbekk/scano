import { NextPage } from "next";
import Image from "next/image";
import Logo from "public/logo.svg";
import Input from "@/components/atomic/Input";
import Button from "@/components/atomic/Button";
import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";

const forgot_password: NextPage = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["forgotPassword"]);
  const [login, setLogin] = useState('');

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleClick = () => {
    setCookie('forgotPassword', true);
    router.push('/');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute top-20">
        <Image src={Logo} />
      </div>
      <div className="max-w-lg w-full flex flex-col gap-y-5">
        <Input
          type="text"
          placeholder="E-mail"
          value={login}
          onChange={handleLogin}
        />
        <Button label="Жаңа пароль алу" onClick={handleClick}/>
      </div>
    </div>
  )
}

export default forgot_password;
