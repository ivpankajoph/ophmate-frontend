interface CountryStateRecord {
  name?: string;
}

interface CountryStatePayload {
  data?: {
    states?: CountryStateRecord[];
  };
  error?: boolean;
  msg?: string;
}

const COUNTRY_STATES_SOURCE_URL = "https://countriesnow.space/api/v0.1/countries/states";

const normalizeStates = (payload: CountryStatePayload) => {
  const states = Array.isArray(payload?.data?.states) ? payload.data.states : [];
  const normalized = states
    .map((state) => state?.name?.trim() ?? "")
    .filter((stateName) => Boolean(stateName));

  return Array.from(new Set(normalized)).sort((left, right) => left.localeCompare(right));
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country")?.trim() ?? "";

  if (!country) {
    return Response.json(
      { message: "Country query parameter is required.", states: [] },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(COUNTRY_STATES_SOURCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country }),
    });
    const payload = (await response.json()) as CountryStatePayload;

    if (!response.ok || payload?.error) {
      return Response.json(
        {
          message: payload?.msg ?? "Unable to load states right now.",
          states: [],
        },
        { status: response.status || 502 },
      );
    }

    return Response.json({
      states: normalizeStates(payload),
    });
  } catch {
    return Response.json(
      { message: "Unable to load states right now.", states: [] },
      { status: 500 },
    );
  }
}
