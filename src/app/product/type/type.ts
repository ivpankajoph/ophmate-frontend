export type VariantImage = {
  url: string;
  publicId: string;
};

export type Variant = {
  _id: string;
  variantSku: string;
  variantAttributes: {
    color: string;
    country: string;
  };
  actualPrice: number;
  discountPercent: number;
  finalPrice: number;
  stockQuantity: number;
  variantsImageUrls: VariantImage[];
  isActive: boolean;
  variantMetaTitle: string;
  variantMetaDescription: string;
  variantMetaKeywords: string[];
  variantCanonicalUrl: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Product = {
  _id: string;
  productName: string;
  productCategory: string;
  brand: string;
  variants: Variant[];
  shortDescription?: string;
  description?: string;
  defaultImages?: { url: string; publicId: string }[];
  isAvailable?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: FAQ[];
  vendor?: {
    name?: string;
    vendor_id?: string;
  };
};