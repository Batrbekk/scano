import {FC, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Avatar} from "@nextui-org/avatar";
import {Button} from "@nextui-org/button";
import {Checkbox} from "@nextui-org/checkbox";
import Network from "@public/assets/icons/network.svg";
import RotateLeft from "@public/assets/icons/rotateLeft.svg";
import OutlineStar from "@public/assets/icons/outlineStar.svg";
import ChevronRight from "@public/assets/icons/chevronRight.svg";

interface Props {
  name: string,
  text: string
  shortText: string,
  src: string,
  followers: string,
  mainAuthorName?: string,
  mainAuthorFollowers?: string,
  messageType: string,
  date: string,
  avatar: string,
  srcIcon: string
}

export const SpamCard: FC<Props> = ({name, text, shortText, src, followers, mainAuthorFollowers, mainAuthorName, date, messageType, avatar, srcIcon}) => {
  const [showFull, setShowFull] = useState(false);

  const handleShowText = () => {
    setShowFull(!showFull);
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 flex items-start gap-x-4">
      <Checkbox
        size="md"
        classNames={{
          base: 'rounded mt-1',
          wrapper: 'rounded before:rounded before:border after:rounded'
        }}
      />
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex items-center">
            <Avatar src={avatar} className="mr-4" />
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-2">
                <Button isIconOnly size="sm" variant="light" className="w-4 h-4 data-[hover=true]:bg-transparent min-w-unit-4">
                  <Image src={OutlineStar} alt="icon" />
                </Button>
                <Link href="#">
                  <p className="text-[#6170b7] prose prose-sm">{name}</p>
                </Link>
                <div className="rounded-xl p-1 bg-[#f6f6f7] flex items-center gap-x-1">
                  <Image src={Network} alt="icon" width={10} height={10} />
                  <p className="prose text-xs">{followers}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <Button isIconOnly size="sm" variant="light" className="w-4 h-4 data-[hover=true]:bg-transparent min-w-unit-4">
                  <Image src={srcIcon} alt="icon" width={14} height={14} />
                </Button>
                <Link href="#">
                  <p className="text-[#6170b7] prose text-xs">{src}</p>
                </Link>
                <p className="prose text-xs">{messageType}</p>
                <p className="prose text-xs">{date}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <p className="prose max-w-[90%] text-sm font-['Work Sans',sans-serif]">{showFull ? text : shortText}</p>
            <Button variant="light" className="data-[hover=true]:bg-transparent w-fit p-0" disableAnimation={true} onClick={handleShowText}>
              <p className="text-[#6170b7]">{showFull ? 'Скрыть полный текст' : 'Показать полный текст'}</p>
              <Image src={ChevronRight} alt='icon' />
            </Button>
          </div>
        </div>
        <div>
          <Button size="sm" variant="flat" className="bg-[#ebf1fd]">
            <Image src={RotateLeft} alt="icons" />
            <p className="font-['Work Sans',sans-serif] prose prose-sm text-[#4f71b9]">Восстановить</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SpamCard;
