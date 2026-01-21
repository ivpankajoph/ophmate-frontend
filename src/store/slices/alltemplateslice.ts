/* eslint-disable @typescript-eslint/no-explicit-any */
import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TemplateState {
  data: any | null;
  products: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  data: null,
  products: [],
  loading: false,
  error: null,
};

const BASE_URL = NEXT_PUBLIC_API_URL;

export const fetchAlltemplatepageTemplate = createAsyncThunk(
  "template/fetchAlltemplatepageTemplate",
  async (vendor_id: string, { rejectWithValue }) => {
    try {
      try {
        const response = await axios.get(
          `${BASE_URL}/templates/${vendor_id}/preview`
        );
        return response.data;
      } catch {
        const response = await axios.get(
          `${BASE_URL}/templates/template-all?vendor_id=${vendor_id}`
        );
        return response.data;
      }
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlltemplatepageTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAlltemplatepageTemplate.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = null;
          state.products = [];
          state.error = action.payload;
        }
      );
  },
});

export const { clearTemplate } = templateSlice.actions;
export default templateSlice.reducer;
