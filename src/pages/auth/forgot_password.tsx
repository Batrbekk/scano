import { NextPage } from "next";
import Image from "next/image";
import Logo from "public/logo.svg";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import React, { useState } from "react";
import { useRouter } from "next/router";

const forgot_password: NextPage = () => {
  const router = useRouter();

  const [errorLogin, setErrorLogin] = useState(false);
  const [login, setLogin] = useState('');

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleClick = () => {
    if (login) {
      localStorage.setItem('forgotPassword', 'APPROVE')
      router.push('/');
    } else {
      setErrorLogin(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute top-20">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="max-w-lg w-full flex flex-col gap-y-5">
        <Input
          type="text"
          error={errorLogin}
          placeholder="E-mail"
          label="email енгізу қажет"
          value={login}
          onChange={handleLogin}
        />
        <Button label="Жаңа пароль алу" onClick={handleClick} size="lg" />
      </div>
    </div>
  )
}

export default forgot_password;
