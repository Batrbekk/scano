import Image from "next/image";
import Search from "@public/assets/icons/search.svg";
import {Input} from "@nextui-org/input";
import React, {useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {Button} from "@nextui-org/button";

interface Props {
  onSearch: (searchText: string, dateRange: { startDate: any, endDate: any }) => void;
}

export const SearchFilter: React.FC<Props> = ({onSearch}) => {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex items-center gap-x-6">
      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder="Поиск по материалу"
        radius="none"
        classNames={{
          input: [
            "w-[324px]",
            "placeholder:font-['Montserrat',sans-serif] placeholder:text-base placeholder:font-extralight"
          ],
          inputWrapper: [
            "border border-[rgba(55,71,95,0.80)] bg-transparent rounded",
            "font-['Montserrat',sans-serif] text-base font-semibold",
          ]
        }}
        endContent={
          <Image src={Search} width={16} height={16} alt="icon" />
        }
      />
      <div className="rounded border border-[rgba(55,71,95,0.80)]">
        <Datepicker
          i18n={"ru"}
          inputClassName="bg-transparent w-[264px] placeholder:font-['Montserrat',sans-serif placeholder:text-base placeholder:font-extralight px-3 py-2 ring-offset-transparent ring-transparent"
          placeholder="Выберите даты"
          value={value}
          startWeekOn="mon"
          onChange={handleValueChange}
          readOnly={true}
        />
      </div>
      <Button className="rounded bg-[#5b85ce]" onClick={() => onSearch(search, value)}>
        <p className="prose font-['Work Sans',sans-serif] prose-sm text-white">Поиск</p>
      </Button>
    </div>
  )
}

export default SearchFilter;
