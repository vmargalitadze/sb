/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';
import { z } from "zod";
import { prisma } from "../prisma";
import { ProductSchema, updateProductSchema} from "../validators";


import { revalidatePath } from "next/cache";
import { Mattress, Pillow, Quilt, Pad, Product, ProductType } from "@prisma/client";


 function formatError(error: any) {
    if (error.name === 'ZodError') {
      // Handle Zod error
      const fieldErrors = Object.keys(error.errors).map(
        (field) => error.errors[field].message
      );
  
      return fieldErrors.join('. ');
    } else if (
      error.name === 'PrismaClientKnownRequestError' &&
      error.code === 'P2002'
    ) {
      // Handle Prisma error
      const field = error.meta?.target ? error.meta.target[0] : 'Field';
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    } else {
      // Handle other errors
      return typeof error.message === 'string'
        ? error.message
        : JSON.stringify(error.message);
    }
  }



  export async function createProduct(data: z.infer<typeof ProductSchema>) {
    try {
      const parsed = ProductSchema.parse(data);

      const { type } = parsed;
  
      const createdProduct = await prisma.product.create({
        data: {
          type,
          images: parsed.images,
          titleEn: parsed.titleEn,
          titleKa: parsed.titleKa,
          categoryEn: parsed.categoryEn,
          categoryKa: parsed.categoryKa,
          secondtext: parsed.secondtext,
          secondtextEn: parsed.secondtextEn 
        },
      });
  
      
      switch (type) {
        case 'MATTRESS':
          await prisma.mattress.create({
            data: {
              id: createdProduct.id,
              height: parsed.height,
              descriptionEn: parsed.descriptionEn , 
              descriptionKa: parsed.descriptionKa ,
              
              breathable: parsed.breathable ,
doubleSided: parsed.doubleSided,
springTech: parsed.springTech ,
orthopaedic: parsed.orthopaedic ,
knitte: parsed.knitte ,
wool: parsed.wool ,
visco: parsed.visco ,
dns: parsed.dns ,
latex: parsed.latex ,
washable: parsed.washable ,

            },
          });

          break;
  
        case 'PILLOW':
          await prisma.pillow.create({
            data: {
              id: createdProduct.id,
              size: parsed.size,
              weight: parsed.weight,
              outerFabric: parsed.outerFabric,
              filling: parsed.filling,
              packaging: parsed.packaging,
              outerFabricEn: parsed.outerFabricEn,
              fillingEn: parsed.fillingEn,
              packagingEn: parsed.packagingEn,
            },
          });
       
          break;
  
        case 'QUILT':
          await prisma.quilt.create({
            data: {
              id: createdProduct.id,
              dimensions: parsed.dimensions,
              fabric: parsed.fabric,
              filling: parsed.filling,
              fabricEn: parsed.fabricEn,
              fillingEn: parsed.fillingEn,
              weight: parsed.weight,
        
            },
          });

          break;
  
        case 'PAD':
          await prisma.pad.create({
            data: {
              id: createdProduct.id,
              firmness: parsed.firmness,
              firmnessEn: parsed.firmnessEn,
              height: parsed.height,
           
              
              breathable: parsed.breathable,
              doubleSided: parsed.doubleSided,
           
              
              springTech: parsed.springTech,
              orthopaedic: parsed.orthopaedic,
              descriptionEn: parsed.descriptionEn,
              descriptionKa: parsed.descriptionKa,
              knitte: parsed.knitte,
              wool: parsed.wool,
              visco: parsed.visco,
              dns: parsed.dns,
              latex: parsed.latex,
              washable:parsed.washable
            },
          });
 
          break;
      }
    

      revalidatePath('/admin');
  
      return { success: true, message: 'Product created successfully' };
    } catch (error) {
      console.error("Error in createProduct:", error); 
      return { success: false, message: formatError(error) };
    }
  }

  type SingleProduct =
  | (Product & { type: "MATTRESS"; mattress: Mattress })
  | (Product & { type: "PILLOW"; pillow: Pillow })
  | (Product & { type: "QUILT"; quilt: Quilt })
  | (Product & { type: "PAD"; pad: Pad });

  export async function getSingleProduct(id: string): Promise<SingleProduct | null> {
    const product = await prisma.product.findUnique({ where: { id } });
  
    if (!product) return null;
  
    const extra =
      product.type === "MATTRESS"
        ? await prisma.mattress.findUnique({ where: { id } })
        : product.type === "PILLOW"
        ? await prisma.pillow.findUnique({ where: { id } })
        : product.type === "QUILT"
        ? await prisma.quilt.findUnique({ where: { id } })
        : await prisma.pad.findUnique({ where: { id } });
  
    return {
      ...product,
      ...(product.type === "MATTRESS"
        ? { mattress: extra as Mattress }
        : product.type === "PILLOW"
        ? { pillow: extra as Pillow }
        : product.type === "QUILT"
        ? { quilt: extra as Quilt }
        : { pad: extra as Pad }),
    } as SingleProduct;
  }
  
  export async function getAllProduct(type?: ProductType) {
    try {
      const products = await prisma.product.findMany({
        where: type ? { type: type } : {}, // Filtering by ProductType if provided
        select: {
          id: true,
          titleEn: true,
          titleKa: true,
          type: true,
          createdAt: true,
          images: true,
        },
        orderBy: { createdAt: "asc" },
      });
  
      return { data: products };
    } catch (error) {
      console.error("Error fetching products", error);
      return { data: [] };
    }
  }
  
  

// ახალი ფუნქცია ფილტრაციისთვის
export async function getFilteredProducts(filters: any) {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        titleEn: true,
        titleKa: true,
        type: true,
        images: true,
        createdAt: true,
        mattress: {
          select: {
            height: true, // ✅ height დაემატა
            breathable: true,
            springTech: true,
            doubleSided: true,
            orthopaedic: true,
            knitte: true,
            wool: true,
            visco: true,
            dns: true,
            latex: true,
            washable: true,
          },
        },
        pad: {
          select: {
            height: true, // ✅ height დაემატა
            breathable: true,
            springTech: true,
            doubleSided: true,
            orthopaedic: true,
            knitte: true,
            wool: true,
            visco: true,
            dns: true,
            latex: true,
            washable: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const filteredProducts = products.filter((product) => {
      const mattress = product.mattress;
      const pad = product.pad;

      if (filters.breathable === undefined) return true;

      return (
        (mattress && mattress.breathable === filters.breathable) ||
        (pad && pad.breathable === filters.breathable)
      );
    });

    return filteredProducts;
  } catch (error) {
    console.error("Error filtering products", error);
    return [];
  }
}



  export async function deleteProduct(id: string) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });
  
      if (!product) throw new Error("Product not found");
  
      // წაშლა ტიპის მიხედვით
      if (product.type === "MATTRESS") {
        await prisma.mattress.delete({ where: { id: id } });
      } else if (product.type === "PILLOW") {
        await prisma.pillow.delete({ where: { id: id } });
      } else if (product.type === "PAD") {
        await prisma.pad.delete({ where: { id: id } });
      } else if (product.type === "QUILT") {
        await prisma.quilt.delete({ where: { id: id } });
      }
  
      // ბოლოს ვშლით მთავარ პროდუქტს
      await prisma.product.delete({
        where: { id },
      });
  
      revalidatePath("/admin");
  
      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: formatError(error),
      };
    }
  }
  export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
    try {
      const product = updateProductSchema.parse(data);
  
      const productExists = await prisma.product.findUnique({
        where: { id: product.id },
      });
  
      if (!productExists) throw new Error("Product not found");
  
      // Update shared fields from Product model
      await prisma.product.update({
        where: { id: product.id },
        data: {
          titleEn: product.titleEn,
          titleKa: product.titleKa,
          categoryEn: product.categoryEn,
          categoryKa: product.categoryKa,
          secondtext: product.secondtext,
          secondtextEn: product.secondtextEn,
          images: product.images,
          type: product.type,
        },
      });
  
      // Update type-specific data
      if (product.type === "MATTRESS") {
        await prisma.mattress.update({
          where: { id: product.id },
          data: {
            height: product.height,
            descriptionEn: product.descriptionEn,
            descriptionKa: product.descriptionKa,
            springTech: product.springTech,
            orthopaedic: product.orthopaedic,
            breathable: product.breathable,
            doubleSided: product.doubleSided,
            knitte: product.knitte,
            wool: product.wool,
            visco: product.visco,
            dns: product.dns,
            latex: product.latex,
            washable: product.washable,
          },
        });
      } else if (product.type === "PAD") {
        await prisma.pad.update({
          where: { id: product.id },
          data: {
            firmness: product.firmness,
            firmnessEn: product.firmnessEn,
            height: product.height,
            descriptionEn: product.descriptionEn,
            descriptionKa: product.descriptionKa,
            springTech: product.springTech,
            orthopaedic: product.orthopaedic,
            breathable: product.breathable,
            doubleSided: product.doubleSided,
            knitte: product.knitte,
            wool: product.wool,
            visco: product.visco,
            dns: product.dns,
            latex: product.latex,
            washable: product.washable,
          },
        });
      } else if (product.type === "PILLOW") {
        await prisma.pillow.update({
          where: { id: product.id },
          data: {
            size: product.size,
            weight: product.weight,
            outerFabric: product.outerFabric,
            outerFabricEn: product.outerFabricEn,
            filling: product.filling,
            fillingEn: product.fillingEn,
            packaging: product.packaging,
            packagingEn: product.packagingEn,
          },
        });
      } else if (product.type === "QUILT") {
        await prisma.quilt.update({
          where: { id: product.id },
          data: {
            dimensions: product.dimensions,
            fabric: product.fabric,
            fabricEn: product.fabricEn,
            filling: product.filling,
            fillingEn: product.fillingEn,
            weight: product.weight,
          },
        });
      }
  
      revalidatePath("/admin");
  
      return {
        success: true,
        message: "Product updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }