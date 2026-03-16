interface RestCountryRecord {
  cca2?: string;
  flags?: {
    png?: string;
    svg?: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  name?: {
    common?: string;
  };
}

interface CountryOption {
  code: string;
  dialCode: string;
  flagUrl: string;
  name: string;
}

const COUNTRY_SOURCE_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2";

const normalizeCountries = (countries: RestCountryRecord[]): CountryOption[] => {
  const uniqueCountries = new Map<string, CountryOption>();

  countries.forEach((country) => {
    const countryName = country.name?.common?.trim();
    const root = country.idd?.root?.trim();
    const suffixes = country.idd?.suffixes?.length ? country.idd.suffixes : [""];

    if (!countryName || !root) return;

    // Some sources return telecom area-code suffixes for countries like the US.
    // Use the full root+suffix only when the country exposes a single calling-code suffix.
    const dialCode =
      suffixes.length === 1
        ? `${root}${suffixes[0] || ""}`.replace(/\s+/g, "")
        : root.replace(/\s+/g, "");
    const key = `${country.cca2 ?? countryName}-${dialCode}`;

    if (!/\+\d+/.test(dialCode) || uniqueCountries.has(key)) return;

    uniqueCountries.set(key, {
      code: country.cca2 ?? key,
      dialCode,
      flagUrl: country.flags?.png ?? country.flags?.svg ?? "",
      name: countryName,
    });
  });

  return Array.from(uniqueCountries.values()).sort(
    (left, right) =>
      left.name.localeCompare(right.name) || left.dialCode.localeCompare(right.dialCode),
  );
};

export async function GET() {
  try {
    const response = await fetch(COUNTRY_SOURCE_URL, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return Response.json(
        { message: "Unable to load countries right now." },
        { status: response.status },
      );
    }

    const data = (await response.json()) as RestCountryRecord[];
    return Response.json(normalizeCountries(data));
  } catch {
    return Response.json(
      { message: "Unable to load countries right now." },
      { status: 500 },
    );
  }
}
