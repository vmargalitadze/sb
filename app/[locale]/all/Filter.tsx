"use client";
import { ProductType } from "@prisma/client";
import React from "react";
import { useTranslations } from "next-intl"; // ქართული და ინგლისური ტექსტისთვის

function Filter({ selectedCategory, setSelectedCategory }: FilterProps) {
  const t = useTranslations("products"); // თარგმანის ჰუკი
  const categories: ProductType[] = ["MATTRESS", "PILLOW", "QUILT", "PAD"];
  
  const handleCategoryChange = (category: ProductType) => {
    setSelectedCategory(category);
  };

  const handleReset = () => {
    setSelectedCategory(undefined); // Reset to show all products
  };

  return (
    <div className="pt-[70px] pb-[70px]">
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">

          {/* All button */}
          <button
            className={`outline-none rounded-lg cursor-pointer transition-all duration-150 ease-in-out 
            border border-solid border-black px-4 py-2 sm:px-6 sm:py-3 
            text-[14px] sm:text-[18px] uppercase focus:outline-none 
            hover:bg-[#052C46] hover:text-white
            ${selectedCategory === undefined ? "bg-[#052C46] text-white" : "text-black"}`}
            onClick={handleReset}
          >
            {t("all")} {/* Translate "All" to Georgian or English */}
          </button>

          {/* Categories */}
          {categories.map((category, i) => (
            <div key={i}>
           
            
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                outline-none rounded-lg cursor-pointer transition-all duration-150 ease-in-out 
                border border-solid border-black px-4 py-2 sm:px-6 sm:py-3 
                text-[14px] sm:text-[18px] uppercase focus:outline-none 
                hover:bg-[#052C46] hover:text-white
                ${selectedCategory === category ? "bg-[#052C46] text-white" : "text-black"}
              `}
            >
              {t(category)} {/* Translate category text */}
            </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

type FilterProps = {
  selectedCategory: ProductType | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
};

export default Filter;
