"use client"
import { SetStateAction, useState } from "react";
import All from "./components/all";
import Companies from "./components/companies";
import Phones from "./components/phones";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <main
      className={`flex flex-col items-center justify-between`}
    >    
      <div className="flex justify-center items-center my-[2rem]">
        <img
          src="/svgs/logo-expanzo-black.svg"
          alt="Expanzo Icon"
          className="cursor-pointer"
        />
      </div>

      <div className="flex justify-center gap-3 my-[1rem]">
        <p
          onClick={() => handleTabClick("all")}
          className={`border-b-2 w-[8rem] flex justify-center ${
            activeTab === "all" ? "border-[#00C29D] text-[#00C29D]" : "border-transparent"
          } cursor-pointer`}
        >
          All
        </p>
        <p
          onClick={() => handleTabClick("companies")}
          className={`border-b-2 w-[8rem] flex justify-center ${
            activeTab === "companies"
              ? "border-[#00C29D] text-[#00C29D]"
              : "border-transparent"
          } cursor-pointer`}
        >
          Companies
        </p>
        <p
          onClick={() => handleTabClick("phones")}
          className={`border-b-2 w-[8rem] flex justify-center ${
            activeTab === "phones" ? "border-[#00C29D] text-[#00C29D]" : "border-transparent"
          } cursor-pointer`}
        >
          Phones
        </p>
      </div>

      <div className="h-[4rem]">
        {activeTab === "all" && <All />}
        {activeTab === "companies" && <Companies />}
        {activeTab === "phones" && <Phones />}
      </div>
      
    </main>
  );

}
