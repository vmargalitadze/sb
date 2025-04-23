export interface ProductType {
  id: string;

  type: "MATTRESS" | "PILLOW" | "QUILT" | "PAD";
  images?: string[];
  titleEn: string;
  titleKa: string;
  categoryEn?: string;
  categoryKa?: string;

  mattress?: {
    height: string | number;
  } | null;

  pad?: {
    height: string | number;
  } | null;
}


export interface FeatureFields {
  height: string | number;
  springTech?: boolean;
  breathable?: boolean;
  doubleSided?: boolean;
  orthopaedic?: boolean;
  knitte?: boolean;
  wool?: boolean;
  visco?: boolean;
  dns?: boolean;
  latex?: boolean;
  washable?: boolean;
}

export interface ProductTypes {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  type: "MATTRESS" | "PILLOW" | "QUILT" | "PAD";
  images?: string[];
  titleEn: string;
  titleKa: string;
  categoryEn?: string;
  categoryKa?: string;

  mattress?: FeatureFields | null;
  pad?: FeatureFields | null;
}
