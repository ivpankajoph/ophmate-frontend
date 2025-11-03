// Indian States
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
  "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
];

export const BUSINESS_TYPES = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Liability Partnership (LLP)",
  "Private Limited Company",
  "Public Limited Company",
  "One Person Company (OPC)",
  "Hindu Undivided Family (HUF)",
  "Others"
];


export const BUSINESS_NATURES = [
  "Manufacturer",
  "Exporter",
  "Retailer",
  "Trader",
  "Service Provider",
  "Agent",
  "Wholesaler",
  "Distributor",
];

export const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "UAE",
  "Singapore",
  "Others",
];

// Validation helpers
export const isEmpty = (value: string) => !value.trim();
export const validateGST = (gst: string) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
export const validatePAN = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
export const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
export const validatePincode = (pin: string) => /^[1-9][0-9]{5}$/.test(pin);
export const validateIFSC = (ifsc: string) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
export const validateAccount = (acc: string) => /^\d{9,18}$/.test(acc);
export const validateUPI = (upi: string) => upi.includes("@");