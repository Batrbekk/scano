import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import Arrow from "@public/assets/icons/arrow.svg";
import {Mode} from "@/types";

interface Props {
  options: Mode[];
  value: Mode;
  onChange: (value: Mode) => void;
  classSelect?: string;
}

export const Select: React.FC<Props> = ({ classSelect, options, value, onChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Mode) => {
    onChange(option);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: Event) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`select-wrapper w-48 cursor-pointer relative ${classSelect}`}>
      <div className="bg-white rounded border border-[#a0a5b1] py-1 px-4 flex items-center justify-between" onClick={toggleDropdown}>
        <p className="prose prose-base font-['Work Sans',sans-serif]">{value.label}</p>
        <div className={`${isDropdownOpen ? 'rotate-180 ease-in duration-200' : 'ease-in duration-200'}`}>
          <Image src={Arrow} width={14} height={14} alt="icon" />
        </div>
      </div>
      {isDropdownOpen && (
        <div className={`absolute ease-in duration-200 bg-white w-full rounded mt-1 flex flex-col shadow-lg z-50 ${options.length > 4 && 'h-[132px] overflow-y-scroll'} ${styles.optionContainer}`}>
          {options.map((item) => (
            <div key={item.key} className={`px-4 py-2 hover:bg-gray-200 ease-in duration-100 ${styles.option} ${item === value && 'bg-[#4780a9]'}`} onClick={() => handleOptionClick(item)}>
              <p className={`prose prose-base font-['Work Sans',sans-serif] ${item === value && 'text-white'}`}>{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
