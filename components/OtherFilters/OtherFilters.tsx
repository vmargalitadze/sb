'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SlugLinks from './Sluglinks';
import { useParams } from 'next/navigation';

const OtherFilters = () => {
  const params = useParams();
  const locale = params?.locale as string;
  const isGe = locale === 'ge';

  return (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {SlugLinks.map((item, index) => (
    <Link
      key={index}
      href={item.href}
      className="flex flex-col items-center justify-center text-center p-4  transition-shadow duration-200"
    >
      <Image
        width={50}
        height={50}
        src={item.logo}
        alt={isGe ? item.label : item.labelEn}
        className="mb-2 object-contain"
      />
      <span className="text-[14px] font-medium text-black">
        {isGe ? item.label : item.labelEn}
      </span>
    </Link>
  ))}
</div>

  );
};

export default OtherFilters;
