import React, {FC, useEffect, useState} from "react";
import {Avatar} from "@nextui-org/avatar";
import {getCookie} from "cookies-next";

interface Props {
  img: string | null
}

export const AvatarInTable: FC<Props> = ({img}) => {
  const token = getCookie('scano_acess_token');
  const [currentImg, setCurrentImg] = useState<string | null>(null);

  const getImg = async () => {
    try {
      const res = await fetch(`https://test.scano.kz/files/${img}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        setCurrentImg(res.url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (img) {
      getImg();
    }
  }, []);

  return (
    <>
      {img ? (
        currentImg ? (
          <Avatar src={currentImg} alt="avatar" />
        ) : (
          <Avatar />
        )
      ) : (
        <Avatar />
      )}
    </>
  )
}

export default AvatarInTable;
