import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


// ✅ Vendor type — based on your response structure
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

// ✅ Slice state type
export interface VendorProfileState {
  vendor: Vendor | null;
  loading: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: VendorProfileState = {
  vendor: null,
  loading: false,
  error: null,
};

export const BASE_URL = NEXT_PUBLIC_API_URL;
// ✅ Async thunk
export const fetchVendorProfile = createAsyncThunk<
  Vendor, // return type
  string, // input (id)
  { rejectValue: string } // error type
>("vendor/fetchProfile", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/vendor/vendorprofile?id=${id}`);
    return response.data.vendor as Vendor;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch vendor profile");
  }
});

// ✅ Slice
const vendorProfileSlice = createSlice({
  name: "vendorProfile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action: PayloadAction<Vendor>) => {
        state.loading = false;
        state.vendor = action.payload;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default vendorProfileSlice.reducer;
