import Image from "next/image";
import { Chip } from "@nextui-org/chip";
import React, {FC, useState} from "react";
import Sad from "@public/assets/icons/sad.svg";
import { Checkbox } from "@nextui-org/checkbox";
import Link from "@public/assets/icons/link.svg";
import Share from "@public/assets/icons/share.svg";
import Source from "@public/assets/icons/source.svg";
import Bookmark from "@public/assets/icons/bookmark.svg";
import Checkmark from "@public/assets/icons/checkmark.svg";
import Thumbtack from "@public/assets/icons/thumbtack.svg";
import DeleteBlue from "@public/assets/icons/blueDelete.svg";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface tag {
  id: number;
  title: string;
}

interface link {
  text: string;
  value: string;
}

interface Props {
  title: string;
  date: string;
  text: string;
  tags: tag[];
  img: string;
  links: link;
}

export const MaterialCard: FC<Props> = ({title,date,text,tags,img, links}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [tagItems, setTagItems] = useState(tags);

  const removeTag = (idToRemove: number) => {
    setTagItems(tagItems.filter(item => item.id !== idToRemove));
  };

  return (
    <div className="p-3 rounded-lg bg-white">
      <div className="flex items-start gap-x-3">
        <Checkbox radius="sm" />
        <div className="">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <Image src={Source} alt="icon" />
              <p className="text-[#757575] text-xs font-light">Scano</p>
            </div>
            <a href={links.value} className="flex items-center gap-x-1">
              <Image src={Link} alt="icon" />
              <p className="text-xs font-light text-[#5B85CE]">{links.text}</p>
            </a>
            <p className="text-[#757575] text-xs font-medium">{date}</p>
          </div>
          <div className="mt-3 flex items-start justify-between">
            <div className="w-[75%]">
              <h1 className="text-[#444] font-semibold">{title}</h1>
              <p className="text-[#444] text-xs mt-2">{text}</p>
              <Button className="p-0 text-[#5B85CE] text-xs mt-1 h-unit-4 data-[hover=true]:bg-transparent" disableAnimation={true} variant="light" onPress={onOpen}>Показать полный текст {">"}</Button>
              <div className="flex items-center gap-x-2 mt-3">
                {tagItems.map((item) => (
                  <Chip
                    key={item.id}
                    size="sm"
                    classNames={{
                      base: "[&_path]:fill-[#757575] bg-[#e1eaf8]",
                      content: `font-['Montserrat',sans-serif] text-[10px] text-[#808793] font-medium`
                    }}
                    onClose={() => removeTag(item.id)}
                  >
                    {item.title}
                  </Chip>
                ))}
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
                <Button isIconOnly size="sm" className="bg-[#ebf1fd]">
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
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MaterialCard;
