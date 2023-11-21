import { NextPage } from "next";
import Image from "next/image";
import Logo from "public/logo.svg";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {useSearchParams} from "next/navigation";
import {Spinner} from "@nextui-org/spinner";

const forgot_password: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()

  const [pending, setPending] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [confirmErrorPassword, setConfirmErrorPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    console.log(searchParams.get('code'));
    const code = searchParams.get('code')
    if (code) {
      setCode(code);
    }
    if (pending) {
      setErrorPassword(false);
      setConfirmErrorPassword(false);
    }
  }, [router]);

  const handleClick = async () => {
    if (password !== confirmPassword) {
      setErrorPassword(false);
      setConfirmErrorPassword(true);
    } else {
      if (password && confirmPassword) {
        try {
          setPending(true);
          const res = await fetch(
            'https://scano-0df0b7c835bf.herokuapp.com/api/v1/users/set-password',
            {
              method: 'POST', // Assuming you are sending a POST request
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                password: password,
                confirm_password: confirmPassword,
                code: code
              }),
            }
          );
          if (res.ok) {
            await router.push('/');
          } else {
            setPending(false);
            console.error('send_password failed');
          }
        } catch (err) {
          setPending(false);
          console.error(err);
        }
      } else {
        setErrorPassword(true);
        setConfirmErrorPassword(true);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute top-20">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="max-w-lg w-full flex flex-col gap-y-5">
        <Input
          type="password"
          error={errorPassword}
          placeholder="Введите новый пароль"
          label="Необходимо ввести новый пароль"
          value={password}
          onChange={handlePassword}
        />
        <Input
          type="password"
          error={confirmErrorPassword}
          placeholder="Подтвердите новый пароль"
          label={
            (confirmErrorPassword && !errorPassword) ? 'Пароли не совпадают' : 'Необходимо подтвердить новый пароль'
          }
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <Button label={
          pending ? (<Spinner color="white" size="sm" />) : 'Отправить новый пароль'
        } onClick={handleClick} size="lg" />
      </div>
    </div>
  )
}

export default forgot_password;
