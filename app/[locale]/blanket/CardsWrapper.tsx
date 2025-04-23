"use client";
import React, { useMemo } from 'react';
import Cards from '@/components/Cards/Cards';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '../all/PaginationComponent';
import { useTranslations } from 'next-intl';
import { ProductType } from '@/lib/ProductType';
import './item.css'
import Image from 'next/image';
interface Props {
  products: ProductType[];
}

export default function CardsWrapper({ products }: Props) {
  const ITEMS_PER_PAGE = 8;
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const t = useTranslations("about");

  const filteredProducts = useMemo(
    () => products.filter(product => product.type === "QUILT"),
    [products]
  );

  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filteredProducts, currentPage]
  );

  return (
    <section className="w-full mx-auto">
    {/* Header Section with Background Image */}
    <div className="flex h-[50vh] items-center flex-wrap bg-overlay sm:p-6 before:bg-title before:bg-opacity-70" >
     <Image
    src="/prod/breadcumb.jpg"
    alt="Background"
    width={1920}
    loading="lazy"
    height={500}

    quality={80}
    className="absolute inset-0 w-full h-full object-cover z-0"
    />
      <div className="text-center z-50 w-full">
        <h2 className="text-white text-[25px] sm:pt-10 pt-[50px] md:text-[50px] font-normal text-center">
          {t('products')}
        </h2>
        <p className="max-w-[672px] text-white mx-auto lg:text-xl">
          {t('sleep')}
        </p>
      </div>
    </div>

    {/* Product List Section */}
 {/* Product List Section */}
<div className="allcontainer">
<div className="container pt-12 lg:pt-16 lg:!pb-16 mx-auto">
  {filteredProducts.length === 0 ? (
    <div className="text-center py-12">
      <p className="text-xl text-gray-500">{t("wait")}</p>
    </div>
  ) : (
    <>
      <Cards products={paginatedProducts} />
      <div className="col-span-full flex justify-center items-center mt-3">
        <PaginationComponent pageCount={pageCount} />
      </div>
    </>
  )}
</div>
</div>

  </section>
  );
}
