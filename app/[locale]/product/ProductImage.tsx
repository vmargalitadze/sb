
"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import Image from "next/image";
const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex mt-[200px] flex-col  space-y-4">
    
      <Image   
        src={images[current]}
        alt="Product Image"
        width={400}
        height={400}
        className="w-[450px] h-[450px] object-cover rounded-md"
      />
      
      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              " p-1 cursor-pointer rounded-md ",
              current === index && ""
            )}
          >
            <Image   src={image} alt="Thumbnail" width={80} height={80} className="w-[80px] h-[80px] object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
