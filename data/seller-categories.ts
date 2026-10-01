export type SellerCategory = {
  id: string;
  name: string;
  products: string[];
};

// Edit this file to add, remove, or rename seller categories and products.
export const SELLER_CATEGORIES: SellerCategory[] = [
  { id: 'apparel', name: 'Apparel & Fashion', products: ['T-Shirts', 'Shirts', 'Dresses', 'Jeans', 'Jackets', 'Activewear', 'Ethnic Wear', 'Kids Wear', 'Uniforms', 'Lingerie'] },
  { id: 'textiles', name: 'Textiles, Fabrics & Yarn', products: ['Cotton Fabric', 'Silk Fabric', 'Linen', 'Wool', 'Denim', 'Knitted Fabric', 'Technical Textiles', 'Yarn', 'Home Textiles'] },
  { id: 'footwear', name: 'Footwear', products: ['Sneakers', 'Formal Shoes', 'Sandals', 'Boots', 'Sports Shoes', 'Safety Shoes', 'Kids Footwear', 'Slippers'] },
  { id: 'accessories', name: 'Fashion Accessories', products: ['Handbags', 'Wallets', 'Belts', 'Scarves', 'Hats & Caps', 'Sunglasses', 'Watches', 'Costume Jewellery', 'Travel Luggage'] },
  { id: 'beauty', name: 'Beauty & Personal Care', products: ['Skincare', 'Haircare', 'Cosmetics', 'Fragrances', 'Personal Hygiene', 'Beauty Tools', 'Salon Products', 'Ayurvedic Products'] },
  { id: 'food', name: 'Food & Agriculture', products: ['Rice & Grains', 'Spices', 'Tea & Coffee', 'Fresh Produce', 'Dry Fruits', 'Processed Food', 'Organic Food', 'Edible Oils', 'Dairy Products'] },
  { id: 'home', name: 'Home, Furniture & Decor', products: ['Furniture', 'Lighting', 'Kitchenware', 'Bedding', 'Rugs & Carpets', 'Decorative Items', 'Bathroom Products', 'Garden Supplies'] },
  { id: 'electronics', name: 'Electronics & Electrical', products: ['Mobile Accessories', 'Consumer Electronics', 'Computer Hardware', 'Smart Devices', 'LED Lighting', 'Cables & Connectors', 'Batteries', 'Electrical Equipment'] },
  { id: 'machinery', name: 'Machinery & Industrial Equipment', products: ['Packaging Machinery', 'Textile Machinery', 'Food Processing Equipment', 'Machine Tools', 'Pumps & Motors', 'Construction Machinery', 'Industrial Automation'] },
  { id: 'automotive', name: 'Automotive & Parts', products: ['Auto Components', 'Two-Wheeler Parts', 'Tyres', 'EV Components', 'Car Accessories', 'Lubricants', 'Commercial Vehicle Parts'] },
  { id: 'healthcare', name: 'Healthcare & Medical', products: ['Medical Devices', 'Diagnostic Equipment', 'Surgical Supplies', 'Hospital Furniture', 'Wellness Products', 'Disposable Medical Supplies'] },
  { id: 'chemicals', name: 'Chemicals & Raw Materials', products: ['Industrial Chemicals', 'Dyes & Pigments', 'Polymers', 'Adhesives', 'Cosmetic Ingredients', 'Food Ingredients', 'Rubber', 'Metals & Alloys'] },
  { id: 'packaging', name: 'Packaging & Printing', products: ['Paper Packaging', 'Flexible Packaging', 'Glass Packaging', 'Plastic Packaging', 'Labels', 'Corrugated Boxes', 'Luxury Packaging', 'Printing Services'] },
  { id: 'gifts', name: 'Gifts, Toys & Handicrafts', products: ['Corporate Gifts', 'Toys & Games', 'Handicrafts', 'Festive Decor', 'Stationery', 'Souvenirs', 'Art Products'] },
  { id: 'sports', name: 'Sports & Outdoor', products: ['Fitness Equipment', 'Sportswear', 'Camping Gear', 'Cycling Products', 'Team Sports Equipment', 'Yoga Products', 'Outdoor Furniture'] },
  { id: 'services', name: 'Business & Professional Services', products: ['Product Sourcing', 'Quality Inspection', 'Factory Audit', 'Freight Forwarding', 'Customs Clearance', 'Warehousing', 'Product Design', 'Private Labelling'] }
];
