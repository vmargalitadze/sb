
import Contact from "../../components/Contact/Contact";

import Info from "../../components/Info/Info";
import Products from "../../components/Products/Products";
import Video from "./why/Video";

import Hero from "../../components/Hero/Hero";


export default function Home() {
  return (
   <>
   
   <div className="w-full   bg-[#EBEBEB]">
    <Hero />

   <Info />
   <div className="flex rounded-lg container bg-[#052C46] mt-10  j py-10">

   <Video />
   </div>
   <Products />
    <Contact />
   </div>
   </>
  );
}
