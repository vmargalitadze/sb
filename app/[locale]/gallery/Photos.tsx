/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Image from "next/image";
const images = Array.from({ length: 12 }, (_, i) => `/gallery/${i + 1}.jpg`);

export default function GalleryPage() {
  const [data, setData] = useState({ img: "", i: 0 });

  const viewImage = (img: string, i: number) => {
    setData({ img, i });
  };

  const closeImage = () => {
    setData({ img: "", i: 0 });
  };

  const nextImage = () => {
    if (data.i + 1 < images.length) {
      setData({ img: images[data.i + 1], i: data.i + 1 });
    }
  };

  const prevImage = () => {
    if (data.i > 0) {
      setData({ img: images[data.i - 1], i: data.i - 1 });
    }
  };

  return (
    <section className="w-full mx-auto">
      {/* Header */}
      <div className="flex h-[50vh] items-center flex-wrap bg-overlay sm:p-6 before:bg-title before:bg-opacity-70" style={{ backgroundImage: "url('/prod/breadcumb.jpg')" }}>
        <div className="text-center z-50 w-full">
          <h2 className="text-white text-[25px] sm:pt-10 pt-[50px] md:text-[50px] font-normal text-center">
          გალერია
          </h2>
      
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {data.img && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex justify-center items-center"
          style={{ overflow: "hidden" }}
        >
          <button
            className="absolute cursor-pointer top-6 right-6 text-white text-3xl font-bold hover:text-gray-500"
            onClick={closeImage}
          >
            ✕
          </button>

          {data.i > 0 && (
            <button
              className="absolute cursor-pointer left-6 text-white text-4xl font-bold hover:text-gray-400"
              onClick={prevImage}
            >
              ‹
            </button>
          )}

          <Image   loading="lazy"  quality={80}
            alt="fullscreen"
            src={data.img}
            width={150} height={150}
            className="max-w-[90%] max-h-[90%] object-contain"
          />

          {data.i + 1 < images.length && (
            <button
              className="absolute cursor-pointer right-6 text-white text-4xl font-bold hover:text-gray-400"
              onClick={nextImage}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* Masonry Gallery */}
      <div className="allcontainer">
        <div className="container pt-12 pb-12 lg:pt-16 lg:!pb-16 mx-auto">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="10px">
              {images.map((image, i) => (
                <Image  loading="lazy"  quality={80}
                  key={i} width={300} height={300}
                  src={image}
                  onClick={() => viewImage(image, i)}
                  style={{ width: "100%", display: "block", cursor: "pointer", borderRadius: "10px" }}
                  alt={`gallery-image-${i + 1}`}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </section>
  );
}
