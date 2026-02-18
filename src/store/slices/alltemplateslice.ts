/* eslint-disable @typescript-eslint/no-explicit-any */
import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TemplateState {
  data: any | null;
  products: any[];
  loading: boolean;
  error: string | null;
  currentVendorId: string | null;
  lastFetchedAt: number | null;
}

const initialState: TemplateState = {
  data: null,
  products: [],
  loading: false,
  error: null,
  currentVendorId: null,
  lastFetchedAt: null,
};

const BASE_URL = NEXT_PUBLIC_API_URL;
const REQUEST_TIMEOUT_MS = 8_000;
const templateEndpointPreference = new Map<string, "preview" | "fallback">();

const asRecord = (value: unknown): Record<string, any> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, any>)
    : {};

const mergeTemplateDraft = (
  existingTemplate: unknown,
  incomingTemplate: unknown,
  sectionOrder?: string[]
) => {
  const existing = asRecord(existingTemplate);
  const incoming = asRecord(incomingTemplate);

  const merged = {
    ...existing,
    ...incoming,
    components: {
      ...asRecord(existing.components),
      ...asRecord(incoming.components),
    },
  } as Record<string, any>;

  if (Array.isArray(sectionOrder) && sectionOrder.length > 0) {
    merged.section_order = sectionOrder;
    merged.sectionOrder = sectionOrder;
    merged.components = {
      ...asRecord(merged.components),
      section_order: sectionOrder,
    };
  }

  return merged;
};

const fetchTemplatePayload = async (vendorId: string) => {
  const preferredEndpoint = templateEndpointPreference.get(vendorId);
  const previewUrl = `${BASE_URL}/templates/${vendorId}/preview`;
  const fallbackUrl = `${BASE_URL}/templates/template-all?vendor_id=${vendorId}`;

  const fetchPreview = async () => {
    const response = await axios.get(previewUrl, { timeout: REQUEST_TIMEOUT_MS });
    templateEndpointPreference.set(vendorId, "preview");
    return response.data;
  };

  const fetchFallback = async () => {
    const response = await axios.get(fallbackUrl, { timeout: REQUEST_TIMEOUT_MS });
    templateEndpointPreference.set(vendorId, "fallback");
    return response.data;
  };

  if (preferredEndpoint === "fallback") {
    try {
      return await fetchFallback();
    } catch {
      return fetchPreview();
    }
  }

  try {
    return await fetchPreview();
  } catch {
    return fetchFallback();
  }
};

export const fetchAlltemplatepageTemplate = createAsyncThunk(
  "template/fetchAlltemplatepageTemplate",
  async (vendor_id: string, { rejectWithValue }) => {
    try {
      return await fetchTemplatePayload(vendor_id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    clearTemplate: (state) => {
      state.data = null;
      state.products = [];
      state.loading = false;
      state.error = null;
      state.currentVendorId = null;
      state.lastFetchedAt = null;
    },
    applyTemplatePreviewUpdate: (
      state,
      action: PayloadAction<{
        vendorId?: string;
        payload?: unknown;
        sectionOrder?: string[];
      }>
    ) => {
      const { vendorId, payload, sectionOrder } = action.payload;
      if (!payload || typeof payload !== "object") return;

      if (typeof vendorId === "string" && vendorId) {
        state.currentVendorId = vendorId;
      }

      state.data = mergeTemplateDraft(state.data, payload, sectionOrder);
      state.lastFetchedAt = Date.now();
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlltemplatepageTemplate.pending, (state, action) => {
        const requestedVendorId = action.meta.arg;
        const hasCachedData =
          state.currentVendorId === requestedVendorId && Boolean(state.data);
        state.loading = !hasCachedData;
        state.error = null;
      })
      .addCase(
        fetchAlltemplatepageTemplate.fulfilled,
        (state, action: PayloadAction<any, string, { arg: string }>) => {
          state.loading = false;
          state.currentVendorId = action.meta.arg;
          state.lastFetchedAt = Date.now();
          const payload = action.payload;
          const template =
            payload?.data?.template || payload?.data || payload?.template || null;
          const products = Array.isArray(payload?.data?.products)
            ? payload.data.products
            : [];
          if (template) {
            state.data = template;
            state.products = products;
            state.error = null;
          } else {
            state.data = null;
            state.products = [];
            state.error = payload?.message || "Template not found";
          }
        }
      )

      .addCase(
        fetchAlltemplatepageTemplate.rejected,
        (state, action: any) => {
          const requestedVendorId = action?.meta?.arg;
          const hasCachedData =
            state.currentVendorId === requestedVendorId && Boolean(state.data);
          state.loading = false;
          if (!hasCachedData) {
            state.data = null;
            state.products = [];
            state.currentVendorId = requestedVendorId || state.currentVendorId;
          }
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "Failed to fetch template";
        }
      );
  },
});

export const { clearTemplate, applyTemplatePreviewUpdate } =
  templateSlice.actions;
export default templateSlice.reducer;
