import React from "react";
import Link from "next/link";
import Image from "next/image";

import Search from "./Search";
import ShiftingDropDown from "./Nav"

import logo from "../../public/about/axali.jpg";


export default function Navbar() {
  return (
    <header className="fixed  top-0 left-0 w-full bg-[#052032] shadow-md z-50">
      <div className="wrapper container flex items-center justify-between px-4 ">
        
  
        <Link className="p-2 cursor-pointer" href="/">
          <div className="border   border-gray-500 rounded-full">
            <Image src={logo} loading="lazy"   quality={70}  height={70} width={70} alt="logo" className="rounded-full " />
          </div>
        </Link>

        {/* Center: Navbar */}
        <div className="flex-1  flex lg:mt-0 md:mt-0  mb-6 justify-end md:justify-start lg:justify-start ">
          <ShiftingDropDown />
     
        </div>

        {/* Right: Search */}
        <div className="hidden z-50 mt-11 md:block">
          <Search />
        </div>
      </div>
    </header>
  );
}
