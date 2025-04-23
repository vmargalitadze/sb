import { z } from "zod";

export const BaseProductSchema = z.object({
  titleEn: z.string(),
  titleKa: z.string(),
  categoryEn: z.string(),
  categoryKa: z.string(),
  secondtext: z.string(),
  secondtextEn: z.string(),
  images: z.array(z.string()),
  type: z.enum(['MATTRESS', 'PILLOW', 'QUILT', 'PAD']),
});

// Mattress-specific schema
export const MattressSchema = z.object({
  height: z.string(),
  descriptionEn: z.string(),
  descriptionKa: z.string(),
  springTech: z.boolean(),
  orthopaedic: z.boolean(),
  breathable: z.boolean(),
  doubleSided: z.boolean(),
  knitte: z.boolean(),
  wool: z.boolean(),
  visco: z.boolean(),
  dns: z.boolean(),
  latex: z.boolean(),
  washable: z.boolean(),
});

// Pad-specific schema
export const PadSchema = z.object({
  firmness: z.string(),
  firmnessEn: z.string(),
  height: z.string(),
  descriptionEn: z.string(),
  descriptionKa: z.string(),
  springTech: z.boolean(),
  orthopaedic: z.boolean(),
  breathable: z.boolean(),
  doubleSided: z.boolean(),
  knitte: z.boolean(),
  wool: z.boolean(),
  visco: z.boolean(),
  dns: z.boolean(),
  latex: z.boolean(),
  washable: z.boolean(),
});

// Pillow-specific schema
export const PillowSchema = z.object({
  size: z.string(),
  weight: z.number(),
  outerFabric: z.string(),
  filling: z.string(),
  packaging: z.string(),
  outerFabricEn: z.string(),
  fillingEn: z.string(),
  packagingEn: z.string(),
});

// Quilt-specific schema
export const QuiltSchema = z.object({
  dimensions: z.string(),
  fabric: z.string(),
  fabricEn: z.string(),
  filling: z.string(),
  fillingEn: z.string(),
  weight: z.string(),
});


export const ProductSchema = z.discriminatedUnion("type", [
  BaseProductSchema.extend(MattressSchema.shape).extend({ type: z.literal("MATTRESS") }),
  BaseProductSchema.extend(PillowSchema.shape).extend({ type: z.literal("PILLOW") }),
  BaseProductSchema.extend(QuiltSchema.shape).extend({ type: z.literal("QUILT") }),
  BaseProductSchema.extend(PadSchema.shape).extend({ type: z.literal("PAD") }),
]);


const withId = {
  id: z.string().min(1),
};

export const updateProductSchema = z.discriminatedUnion("type", [
  BaseProductSchema.extend(MattressSchema.shape)
    .extend({ type: z.literal("MATTRESS") })
    .extend(withId),

  BaseProductSchema.extend(PillowSchema.shape)
    .extend({ type: z.literal("PILLOW") })
    .extend(withId),

  BaseProductSchema.extend(QuiltSchema.shape)
    .extend({ type: z.literal("QUILT") })
    .extend(withId),

  BaseProductSchema.extend(PadSchema.shape)
    .extend({ type: z.literal("PAD") })
    .extend(withId),
]);