import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const DEFAULT_TEMPLATE_APP_URL = process.env.NEXT_PUBLIC_VENDOR_TEMPLATE_URL 

const getTemplateAppBaseUrl = () => {
  const configured = process.env.NEXT_PUBLIC_VENDOR_TEMPLATE_URL;
  if (!configured || !configured.trim()) return DEFAULT_TEMPLATE_APP_URL;
  return configured.replace(/\/+$/, "");
};

const serializeSearchParams = (
  searchParams?: Record<string, string | string[] | undefined>
) => {
  if (!searchParams) return "";
  const query = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      query.set(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    }
  });

  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
};
 
export default async function TemplateRedirectPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const baseUrl = getTemplateAppBaseUrl();
  const slugPath = (resolvedParams.slug || []).join("/");
  const nextPath = slugPath ? `/template/${slugPath}` : "/template";
  const query = serializeSearchParams(resolvedSearchParams);

  redirect(`${baseUrl}${nextPath}${query}`);
}
