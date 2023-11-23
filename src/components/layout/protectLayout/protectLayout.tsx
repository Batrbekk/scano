import React, {FC, ReactNode, useEffect} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import {Spinner} from "@nextui-org/spinner";

type ProtectLayoutProps = {
  children: ReactNode;
};

const protectLayout: FC<ProtectLayoutProps> = ({children}) => {
  const token = getCookie('scano_acess_token');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token]);
  return (
    <div>
      {token && children}
    </div>
  )
}

export default protectLayout;
