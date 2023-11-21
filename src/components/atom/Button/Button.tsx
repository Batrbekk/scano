import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: any;
  color?: string;
  size: 'lg' | 'md' | 'sm';
  classBtn?: string;
}

export const Button: React.FC<Props> = ({classBtn, label, size, color, ...buttonProps}) => {
  return (
    <div className="button-wrapper">
      {size === 'lg' && (
        <button
          {...buttonProps}
          className={`${color ? color : 'bg-[#60CA23]'} ${classBtn} w-full prose-lg text-white font-['Work Sans',sans-serif] py-3 rounded`}
        >
          {label}
        </button>
      )}
      {size === 'sm' && (
        <button
          {...buttonProps}
          className={`${color ? color : 'bg-[#60CA23]'} ${classBtn} w-full prose prose-base text-white font-['Work Sans',sans-serif] py-1 px-4 rounded`}
        >
          {label}
        </button>
      )}
    </div>
  )
}

export type {Props as ButtonProps};
export default Button;
