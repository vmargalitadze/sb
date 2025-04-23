import React from "react";

import logo from "@/public/about/axali.jpg";
import Link from "next/link";
import Image from "next/image";
import { getAllProduct } from "@/lib/actions/actions";
import AdminSwitch from "./AdminSwitch";

async function AdminHelper() {
  const productsData = await getAllProduct();

  return (
    <main className="sm:p-10 space-y-6 items-center">
        <div className="mr-6">
          <Link className="p-2 w-[200px] cursor-pointer" href="/">
            <div className="border w-[70px] border-gray-500 rounded-full">
              <Image src={logo} height={70}  loading="lazy"  quality={80} width={70} alt="logo" className="rounded-full" />
            </div>
          </Link>
          <h2 className="text-gray-600 text-4xl ml-0.5">Sleepandbad.ge</h2>
        </div>
      <div className="flex flex-col   justify-center ">
        <div className="sm:p-10 space-y-6 flex flex-col items-center">
   
        <div className="w-full ">
    <AdminSwitch products={productsData.data} />
  </div>
        </div>

      </div>
    </main>
  );
}

export default AdminHelper;
