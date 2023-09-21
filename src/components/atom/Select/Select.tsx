import Image from "next/image";
import React, { useState } from "react";
import styles from "./index.module.scss";
import Arrow from "@public/assets/icons/arrow.svg";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Select: React.FC<Props> = ({options,value,onChange}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="select-wrapper w-48 cursor-pointer relative">
      <div className="bg-white rounded border border-[#a0a5b1] py-1 px-4 flex items-center justify-between" onClick={toggleDropdown}>
        <p className="prose prose-base font-['Work Sans',sans-serif]">
          {value}
        </p>
        <div className={`${isDropdownOpen ? 'rotate-180 ease-in duration-200' : 'ease-in duration-200'}`}>
          <Image src={Arrow} width={14} height={14} alt="icon" />
        </div>
      </div>
      {isDropdownOpen && (
        <div className={`absolute ease-in duration-200 bg-white w-full rounded mt-1 flex flex-col shadow-lg ${styles.optionContainer}`}>
          {options.map((item) => (
            <div key={item} className={`px-4 py-2 hover:bg-[rgba(96,202,35)] ease-in duration-100 ${styles.option} ${item === value && 'bg-[#4780a9]'}`} onClick={() => handleOptionClick(item)}>
              <p className={`prose prose-base font-['Work Sans',sans-serif] ${item === value && 'text-white'}`}>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select;
