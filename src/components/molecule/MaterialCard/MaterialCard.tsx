import Image from "next/image";
import React, {FC, useEffect, useState} from "react";
import Sad from "@public/assets/icons/sad.svg";
import Link from "@public/assets/icons/link.svg";
import Share from "@public/assets/icons/share.svg";
import Source from "@public/assets/icons/source.svg";
import Bookmark from "@public/assets/icons/bookmark.svg";
import Checkmark from "@public/assets/icons/checkmark.svg";
import Thumbtack from "@public/assets/icons/thumbtack.svg";
import DeleteBlue from "@public/assets/icons/blueDelete.svg";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {format} from "date-fns";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";

interface Props {
  id: string;
  title: string;
  date: string;
  text: string;
  tags: any;
  img: string;
  links: any;
  src_name: string
}

export const MaterialCard: FC<Props> = ({id, title,date,text,tags,img, links, src_name}) => {
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const token = getCookie('scano_acess_token');
  const [created, setCreated] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    if (date) {
      const convertDate = format(new Date(date), 'dd.MM.yyyy HH:mm');
      setCreated(convertDate);
    }
  }, [date]);

  const deleteMaterial = async () => {
    try {
      const res = await fetch(
        `https://scano-0df0b7c835bf.herokuapp.com/api/v1/materials/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        router.reload();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="p-4 rounded-lg bg-white">
      <div className="flex items-start gap-x-3">
        <div className="">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <Image src={Source} alt="icon" />
              <p className="text-[#757575] text-xs font-light">{src_name}</p>
            </div>
            <a href={links.value} className="flex items-center gap-x-1">
              <Image src={Link} alt="icon" />
              <a href={links} className="text-xs font-light text-[#5B85CE]">{links}</a>
            </a>
            <p className="text-[#757575] text-xs font-medium">{created}</p>
          </div>
          <div className="mt-3 flex items-start justify-between">
            <div className="w-[75%]">
              <h1 className="text-[#444] font-semibold truncate">{title}</h1>
              <p className="text-[#444] text-xs mt-2">{text}</p>
              <Button
                className="p-0 text-[#5B85CE] text-xs mt-1 h-unit-4 data-[hover=true]:bg-transparent"
                disableAnimation={true}
                variant="light"
                onClick={() => {
                  setIsDelete(false);
                  onOpen();
                }}>
                  Показать полный текст {">"}
              </Button>
              <div className="flex items-center gap-x-2 mt-3">
                <Button disableAnimation={true} variant="light" className="text-[10px] text-[#808793] px-0 data-[hover=true]:bg-transparent">+ Добавить теги</Button>
              </div>
            </div>
            <div className="w-[20%] flex flex-col items-end gap-y-6">
              <div className="flex items-center gap-x-3">
                <button>
                  <Image src={Checkmark} alt="icon" />
                </button>
                <button>
                  <Image src={Bookmark} alt="icon" />
                </button>
                <Image src={Sad} alt="icon" />
                <Button isIconOnly size="sm" className="bg-[#ebf1fd]">
                  <Image src={Thumbtack} alt="icon" />
                </Button>
                <Button isIconOnly size="sm" className="bg-[#ebf1fd]">
                  <Image src={Share} alt="icon" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  className="bg-[#ebf1fd]"
                  onClick={() => {
                    setIsDelete(true);
                    onOpen();
                  }}
                >
                  <Image src={DeleteBlue} alt="icon" />
                </Button>
              </div>
              <Image src={img} alt="car-img" width={150} height={120} />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" className="rounded-none">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                {isDelete ? (
                  <p>Вы уверены что хотите удалить данную тему?</p>
                ) : (
                  <p>{text}</p>
                )}
              </ModalBody>
              <ModalFooter>
                {isDelete ? (
                  <>
                    <Button color="danger" variant="light" className="!rounded" onPress={onClose}>
                      Отмена
                    </Button>
                    <Button color="primary" className="!rounded bg-[#5b85ce]"  onClick={() => deleteMaterial()}>
                      Удалить
                    </Button>
                  </>
                ) : (
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MaterialCard;
