import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  padding?: string;
  textColor?: string;
}

export const Input: React.FC<Props> = ({textColor, padding, error, label, ...inputProps }) => {
  return (
    <div className="input-wrapper">
      <input
        {...inputProps}
        className={`w-full border rounded focus-visible:outline-0 focus:border-[#757575] font-['Work Sans',sans-serif] ${textColor ? textColor : 'text-[#757575]'} ${padding ? padding : 'py-4 px-3'} ${error ? `border-rose-500` : `border-[#E0E0E0]`}`}
      />
      {error && (
        <p className="mt-1 ml-4 prose-sm text-rose-500 font-['Work Sans',sans-serif]">{ label }</p>
      )}
    </div>
  )
}

export type { Props as InputProps };
export default Input;
