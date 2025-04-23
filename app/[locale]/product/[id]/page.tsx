import React from 'react';
import ProductImages from '../ProductImage';
import { getSingleProduct } from '@/lib/actions/actions';
import Link from 'next/link';
import Image from 'next/image';
import { Mattress, Pad } from '@prisma/client';

type Feature = {
  key: keyof Pad & keyof Mattress;
  label: string;
  labelEn: string;
  href: string;
  logo: string;
};

const HEIGHT_FEATURES: Feature[] = [
  { key: 'height', label: '6 სმ', labelEn: '6 cm', href: '/6', logo: '/filters/6.jpg' },
  { key: 'height', label: '7 სმ', labelEn: '7 cm', href: '/7', logo: '/filters/7.jpg' },
  { key: 'height', label: '25 სმ', labelEn: '25 cm', href: '/25', logo: '/filters/25.jpg' },
  { key: 'height', label: '26 სმ', labelEn: '26 cm', href: '/26', logo: '/filters/26.jpg' },
  { key: 'height', label: '27 სმ', labelEn: '27 cm', href: '/27', logo: '/filters/27.jpg' },
  { key: 'height', label: '28 სმ', labelEn: '28 cm', href: '/28', logo: '/filters/28.jpg' },
  { key: 'height', label: '30 სმ', labelEn: '30 cm', href: '/30', logo: '/filters/30.jpg' },
  { key: 'height', label: '32 სმ', labelEn: '32 cm', href: '/32', logo: '/filters/32.jpg' },
  { key: 'height', label: '33 სმ', labelEn: '33 cm', href: '/33', logo: '/filters/33.jpg' },
];

const FEATURES: Feature[] = [
  { key: 'springTech', label: '7 ზონიანი ჯიბის ზამბარის ტექნოლოგია', labelEn: '7 Zone Pocket Spring Technology', href: '/zone', logo: '/filters/zone.jpg' },
  { key: 'breathable', label: 'სუნთქვადი', labelEn: 'Breathable', href: '/brieth', logo: '/filters/brieth1.jpg' },
  { key: 'doubleSided', label: 'ორმხრივი', labelEn: 'Double Sided', href: '/double', logo: '/filters/ds.jpg' },
  { key: 'orthopaedic', label: 'ორთოპედიული', labelEn: 'Orthopaedic', href: '/ort', logo: '/filters/ort.jpg' },
  { key: 'knitte', label: 'ნაქსოვი', labelEn: 'Knitted', href: '/knitte', logo: '/filters/knitted.jpg' },
  { key: 'wool', label: 'ბამბა', labelEn: 'Wool', href: '/wool', logo: '/filters/wool.jpg' },
  { key: 'visco', label: 'ვისკო', labelEn: 'Visco', href: '/visco', logo: '/filters/visco.jpg' },
  { key: 'dns', label: 'მაღალი  საჰაერო სადინარიანი დამხმარე სპონჯი', labelEn: 'High Dns Air Ducted Support Sponge', href: '/dns', logo: '/filters/dns.jpg' },
  { key: 'latex', label: 'ლატექსი', labelEn: 'Latex', href: '/latex', logo: '/filters/latex.jpg' },
  { key: 'washable', label: 'გასარეცხი ჩასადები ქეისი', labelEn: 'Washable', href: '/wash', logo: '/filters/wash.jpg' },
];

const DetailPage = async(props: {
  params:Promise< {id:string,locale: string} >
}) => {
  const { id, locale } = await props.params;
   const product = await getSingleProduct(id); 
  const isGe = locale === 'ge';

  if (!product) {
    return <div className="text-center text-lg font-bold">Product not found</div>;
  }

  const title = isGe ? product.titleKa : product.titleEn;
  const second = isGe ? product.secondtext : product.secondtextEn;

  const heightValue =
    product.type === 'MATTRESS'
      ? product.mattress?.height?.toString()
      : product.type === 'PAD'
      ? product.pad?.height?.toString()
      : null;

  const matchedHeightFeature = HEIGHT_FEATURES.find(h =>
    h.label.includes(`${heightValue} სმ`)
  );

  const ALL_FEATURES = matchedHeightFeature
    ? [matchedHeightFeature, ...FEATURES]
    : [...FEATURES];

  const getFeatureValue = (key: keyof Mattress & keyof Pad) => {
    if (key === 'height') return true;
    return product.type === 'MATTRESS'
      ? product.mattress?.[key]
      : product.type === 'PAD'
      ? product.pad?.[key]
      : undefined;
  };

  return (
    <section className="w-full mx-auto max-w-[1440px]">
      <div className="text-black py-10">
        <div className="container mx-auto flex flex-col md:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2 flex justify-center">
            <ProductImages images={product.images} />
          </div>
          <div className="w-full lg:w-1/2 lg:mt-16 p-4 sm:p-6 flex flex-col">
            <h2 className="mt-5 text-xl lg:text-[30px] text-center lg:text-start mb-5 font-semibold">
              {title}
            </h2>
            <p className="text-[15px] lg:text-[17px] leading-tight mb-4 font-semibold">
              {second}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.type === 'PILLOW' && product.pillow && (
  <>
    {product.pillow.size && (
      <p><strong>{isGe ? 'ზომა' : 'Size'}:</strong> {product.pillow.size}</p>
    )}
    {product.pillow.weight && (
      <p><strong>{isGe ? 'წონა' : 'Weight'}:</strong> {product.pillow.weight} გრ</p>
    )}
    {(isGe ? product.pillow.outerFabric : product.pillow.outerFabricEn) && (
      <p><strong>{isGe ? 'გარეთა ქსოვილი' : 'Outer Fabric'}:</strong> {isGe ? product.pillow.outerFabric : product.pillow.outerFabricEn}</p>
    )}
    {(isGe ? product.pillow.filling : product.pillow.fillingEn) && (
      <p><strong>{isGe ? 'შევსება' : 'Filling'}:</strong> {isGe ? product.pillow.filling : product.pillow.fillingEn}</p>
    )}
    {(isGe ? product.pillow.packaging : product.pillow.packagingEn) && (
      <p><strong>{isGe ? 'შეფუთვა' : 'Packaging'}:</strong> {isGe ? product.pillow.packaging : product.pillow.packagingEn}</p>
    )}
  </>
)}

{product.type === 'QUILT' && product.quilt && (
  <>
    {product.quilt.dimensions && (
      <p><strong>{isGe ? 'ზომა' : 'Dimensions'}:</strong> {product.quilt.dimensions}</p>
    )}
    {(isGe ? product.quilt.fabric : product.quilt.fabricEn) && (
      <p><strong>{isGe ? 'ქსოვილი' : 'Fabric'}:</strong> {isGe ? product.quilt.fabric : product.quilt.fabricEn}</p>
    )}
    {(isGe ? product.quilt.filling : product.quilt.fillingEn) && (
      <p><strong>{isGe ? 'შევსება' : 'Filling'}:</strong> {isGe ? product.quilt.filling : product.quilt.fillingEn}</p>
    )}
    {product.quilt.weight && (
      <p><strong>{isGe ? 'წონა' : 'Weight'}:</strong> {product.quilt.weight}</p>
    )}
  </>
)}


              {(product.type === 'PAD' || product.type === 'MATTRESS') && (
                <>
                  {ALL_FEATURES.map((feature, index) => {
                    const value = getFeatureValue(feature.key);
                    if (!value) return null;

                    return (
                      <div key={index}>
                        <div className="flex items-center space-x-2 p-2 rounded-lg transition">
                          <Link
                            href={feature.href}
                            className="font-semibold flex items-center gap-2 p-2 text-[15px] text-gray-800 hover:underline"
                          >
                            <Image
                              src={feature.logo}
                              alt="logo"
                              width={42}
                              height={42}
                            
                              className="object-contain"
                            />
                            {isGe ? feature.label : feature.labelEn}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

       
        {(product.type === 'MATTRESS' && product.mattress && (isGe ? product.mattress.descriptionKa : product.mattress.descriptionEn)) ||
 (product.type === 'PAD' && product.pad && (isGe ? product.pad.descriptionKa : product.pad.descriptionEn)) ? (
  <div className="container mt-10 text-center mx-auto gap-6 lg:gap-12">
    <h1 className="text-3xl font-semibold">{isGe ? 'აღწერა' : 'Description'}:</h1>
    <p className="mt-4 text-[16px]">
      {product.type === 'MATTRESS' && product.mattress && (
        isGe ? product.mattress.descriptionKa : product.mattress.descriptionEn
      )}
      {product.type === 'PAD' && product.pad && (
        isGe ? product.pad.descriptionKa : product.pad.descriptionEn
      )}
    </p>
  </div>
) : null}

      </div>
    </section>
  );
};

export default DetailPage;
