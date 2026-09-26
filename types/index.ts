export interface ICloudinaryImage {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  originCountry?: string;
  featured: boolean;
  logo?: ICloudinaryImage;
  banner?: ICloudinaryImage;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string | ICategory;
  level: number;
  featured: boolean;
  order: number;
  image?: ICloudinaryImage;
  banner?: ICloudinaryImage;
  children?: ICategory[];
}

export interface IProductVariant {
  _id: string;
  product: string;
  sku: string;
  color: string;
  colorCode?: string;
  size: string;
  price: number;
  salePrice?: number;
  stock: number;
  images: ICloudinaryImage[];
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;
  brand: IBrand;
  category: ICategory;
  subCategory?: ICategory;
  collections: string[];
  tags: string[];
  gender: 'MEN' | 'WOMEN' | 'UNISEX' | 'KIDS' | 'HOME' | 'ELECTRONICS';
  material?: string;
  colors: string[];
  sizes: string[];
  variants?: IProductVariant[];
  images: ICloudinaryImage[];
  price: number;
  compareAtPrice?: number;
  salePrice?: number;
  currency: string;
  tax: number;
  inventory: number;
  ratings: number;
  reviewsCount: number;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  details?: {
    careInstructions?: string[];
    fit?: string;
    origin?: string;
    highlights?: string[];
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface ICartItem {
  _id?: string;
  product: string | IProduct;
  variant?: string | IProductVariant;
  sku: string;
  name: string;
  color?: string;
  size?: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ICartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  giftWrapCost: number;
  tax: number;
  total: number;
}

export interface IUserAddress {
  _id?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface IUser {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN' | 'MANAGER';
  avatar?: ICloudinaryImage;
  addresses?: IUserAddress[];
  preferences?: {
    newsletter: boolean;
    currency: string;
  };
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  user?: IUser;
  guestEmail?: string;
  items: {
    product: string | IProduct;
    variant?: string;
    sku: string;
    name: string;
    color?: string;
    size?: string;
    image: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  shippingAddress: IUserAddress;
  billingAddress: IUserAddress;
  paymentMethod: 'STRIPE' | 'RAZORPAY' | 'COD';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus:
    | 'PENDING'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'RETURN_REQUESTED'
    | 'RETURNED'
    | 'REFUNDED';
  statusHistory: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface IReview {
  _id: string;
  product: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: ICloudinaryImage[];
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}
