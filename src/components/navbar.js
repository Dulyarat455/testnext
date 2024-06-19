import React, {useState,useEffect} from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link';
import { Anton } from "next/font/google";

import Remove2 from '../../public/images/Remove2.png' 

const inter = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Navbar  (){
  

return(
  <div className={` ${inter.className}`}>
      <nav
    className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50  shadow-dark-mild dark:bg-neutral-700 lg:py-1"
  >
    <div className="flex w-full flex-wrap items-center justify-between px-2">
      <div>
        <div className="mx-3  flex items-center lg:mb-0 lg:mt-0">
          <span className="text-black dark:text-white">Thai</span>
            <Image src={Remove2} alt="user"  style={{ width: 'auto', height: '100px' }}  className= "ml-0"/>
          <span className="text-black dark:text-white ">Clound</span>         
        </div>   
      </div>     
    </div>
  </nav>
</div>



) 

}