import React from "react";
import Logo from "public/logo.svg";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <div className="bg-[#F8F9FB] w-screen flex items-center justify-between px-6 py-7">
      <p className="text-[#35415A] prose prose-xl font-['Work Sans',sans-serif]">Техникалық қолдау</p>
      <p className="text-[#35415A] prose prose-xl font-['Work Sans',sans-serif]">© 2023 Infinity Enterprises</p>
    </div>
  )
}

export default Footer;
