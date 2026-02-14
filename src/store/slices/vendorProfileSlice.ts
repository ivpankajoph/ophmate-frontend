import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Vendor {
  _id: string;
  email: string;
  phone: string;
  role: string;
  is_email_verified: boolean;
  is_profile_completed: boolean;
  profile_complete_level: number;
  is_active: boolean;
  is_verified: boolean;
  country: string;
  business_type: string;
  categories: string[];
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  gst_number?: string;
  gst_cert?: string;
  pan_number?: string;
  pan_card?: string;
  bank_name?: string;
  bank_account?: string;
  branch?: string;
  ifsc_code?: string;
  upi_id?: string;
  alternate_contact_name?: string;
  alternate_contact_phone?: string;
  return_policy?: string;
  operating_hours?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorProfileState {
  vendor: Vendor | null;
  loading: boolean;
  error: string | null;
  currentVendorId: string | null;
  lastFetchedAt: number | null;
}

const initialState: VendorProfileState = {
  vendor: null,
  loading: false,
  error: null,
  currentVendorId: null,
  lastFetchedAt: null,
};

export const BASE_URL = NEXT_PUBLIC_API_URL;
const REQUEST_TIMEOUT_MS = 8_000;

export const fetchVendorProfile = createAsyncThunk<
  Vendor,
  string,
  { rejectValue: string }
>("vendor/fetchProfile", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/vendors/vendorprofile?id=${id}`, {
      timeout: REQUEST_TIMEOUT_MS,
    });
    const vendor =
      response?.data?.vendor ??
      response?.data?.data?.vendor ??
      response?.data?.data ??
      null;

    if (!vendor || typeof vendor !== "object") {
      return rejectWithValue("Vendor profile not found in API response");
    }

    return vendor as Vendor;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch vendor profile");
  }
});

const vendorProfileSlice = createSlice({
  name: "vendorProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProfile.pending, (state, action) => {
        const requestedVendorId = action.meta.arg;
        const hasCachedVendor =
          state.currentVendorId === requestedVendorId && Boolean(state.vendor);
        state.loading = !hasCachedVendor;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action: PayloadAction<Vendor, string, { arg: string }>) => {
        state.loading = false;
        state.vendor = action.payload;
        state.currentVendorId = action.meta.arg;
        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        const requestedVendorId = action.meta.arg;
        const hasCachedVendor =
          state.currentVendorId === requestedVendorId && Boolean(state.vendor);
        state.loading = false;
        if (!hasCachedVendor) {
          state.vendor = null;
          state.currentVendorId = requestedVendorId || state.currentVendorId;
        }
        state.error = (action.payload as string) ?? "Something went wrong";
      });
  },
});

export default vendorProfileSlice.reducer;
