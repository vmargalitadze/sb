"use client"
import React from 'react'
import first from "../../public/prod/new.jpg";
import Image from 'next/image';
import { useTranslations } from 'next-intl';

function Info() {
  const t = useTranslations("infopage");
  
  return (
    <>
      <section className="lg:py-[50px] mt-[50px] lg:mt-0">
        <section className="py-[20px] lg:py-[70px]">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row lg:flex-row lg:gap-x-[100px]">
          
              <div className="flex-1 order-1 lg:-order-1">
                <Image   loading="lazy" quality={80}
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src={first}
                />
              </div>

              {/* text */}
              <div className="flex-1 flex flex-col gap-y-10 justify-center">
                <h3 className="text-xl lg:text-[25px] leading-tight text-center mb-4 font-semibold">
                {t('Infoheading')}
                </h3>
                <div className="font-normal text-lg max-lg:text-center max-w-2xl mx-auto mb-7 lg:mb-9">
                 
                  <p className="text-[16px] text-center lg:text-[18px] leading-relaxed mb-5 lg:mb-9">
                  {t('Infoparagraph')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Info;
