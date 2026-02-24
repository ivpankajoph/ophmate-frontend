const isObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

const trimSegment = (value: unknown) =>
  String(value ?? "")
    .trim()
    .replace(/^\/+|\/+$/g, "");

export const toRouteSlug = (value: unknown) => {
  const raw = trimSegment(value);
  if (!raw) return "";
  if (isObjectId(raw)) return raw.toLowerCase();

  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

type BuildProductPathInput = {
  category: unknown;
  productId?: unknown;
  productSlug?: unknown;
};

export const buildProductPath = ({
  category,
  productId,
  productSlug,
}: BuildProductPathInput) => {
  const categorySegment = toRouteSlug(category) || "unknown";
  const productSegment =
    toRouteSlug(productSlug) || trimSegment(productId) || "unknown";

  return `/product/${encodeURIComponent(categorySegment)}/${encodeURIComponent(
    productSegment,
  )}`;
};
