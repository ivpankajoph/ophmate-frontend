interface CountryCityPayload {
  data?: string[];
  error?: boolean;
  msg?: string;
}

const COUNTRY_CITIES_SOURCE_URL = "https://countriesnow.space/api/v0.1/countries/state/cities";

const normalizeCities = (payload: CountryCityPayload) => {
  const cities = Array.isArray(payload?.data) ? payload.data : [];
  const normalized = cities
    .map((city) => String(city || "").trim())
    .filter((cityName) => Boolean(cityName));

  return Array.from(new Set(normalized)).sort((left, right) => left.localeCompare(right));
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country")?.trim() ?? "";
  const state = searchParams.get("state")?.trim() ?? "";

  if (!country || !state) {
    return Response.json(
      { message: "Country and state query parameters are required.", cities: [] },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(COUNTRY_CITIES_SOURCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country, state }),
    });
    const payload = (await response.json()) as CountryCityPayload;

    if (!response.ok || payload?.error) {
      return Response.json(
        {
          message: payload?.msg ?? "Unable to load cities right now.",
          cities: [],
        },
        { status: response.status || 502 },
      );
    }

    return Response.json({
      cities: normalizeCities(payload),
    });
  } catch {
    return Response.json(
      { message: "Unable to load cities right now.", cities: [] },
      { status: 500 },
    );
  }
}

