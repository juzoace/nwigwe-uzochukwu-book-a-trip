"use client"

import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row w-[100%] md:h-[15rem] pt-4 bg-gray-100">
      {/* Left Container (45% width) */}
      <div className="md:w-[45%]  flex justify-center items-center">
        <img
          src="/svgs/logo-expanzo-black.svg"
          alt="Expanzo Icon"
          className="cursor-pointer"
        />
      </div>

      {/* Center Container (30% width) */}
      <div className="md:w-[30%] p-4 flex justify-center items-center">
       
        <div>
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-7">
            <p className="font-bold">
              <Link href="/contact">CONTACTS</Link>
            </p>
            <p className="font-bold">
              PHONES
            </p>
            <p className="font-bold">
              TOP SEARCH
            </p>
          </div>
        </div>
      </div>

      {/* Right Container (25% width) */}
      <div className="w-0 md:w-[25%] p-4 hidden md:block ">

      </div>
    </div>
  );
};

export default Footer;
