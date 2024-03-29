import { NextPage } from "next";
import Image from "next/image";
import Logo from "public/logo.svg";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {setCookie} from "cookies-next";
import {Spinner} from "@nextui-org/spinner";

const send_password: NextPage = () => {
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [login, setLogin] = useState('');

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleClick = async () => {
    if (login) {
      try {
        setPending(true);
        const res = await fetch(
          'https://test.scano.kz/api/v1/users/forgot-password',
          {
            method: 'POST', // Assuming you are sending a POST request
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: login,
            }),
          }
        );
        if (res.ok) {
          localStorage.setItem('forgotPassword', 'APPROVE')
          await router.push('/');
        } else {
          setPending(false);
          console.error('forgot_password failed');
        }
      } catch (err) {
        setPending(false);
        console.error(err);
      }
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
        <Button label={
          pending ? (<Spinner color="white" size="sm" />) : 'Жаңа пароль алу'
        } onClick={handleClick} size="lg" />
      </div>
    </div>
  )
}

export default send_password;
