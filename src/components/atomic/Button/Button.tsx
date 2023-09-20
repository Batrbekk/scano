import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: string;
}

export const Button: React.FC<Props> = ({label, color, ...buttonProps}) => {
  return (
    <div className="button-wrapper">
      <button
        {...buttonProps}
        className={`${color ? color : 'bg-[#60CA23]'} w-full prose-2xl text-white font-['Work Sans',sans-serif] py-3 rounded`}
      >
        {label}
      </button>
    </div>
  )
}

export type {Props as ButtonProps};
export default Button;
