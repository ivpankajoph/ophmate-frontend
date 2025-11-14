/* eslint-disable @typescript-eslint/no-explicit-any */
import { NEXT_PUBLIC_API_URL } from "@/config/variables";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TemplateState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  data: null,
  loading: false,
  error: null,
};

const BASE_URL = NEXT_PUBLIC_API_URL;

export const fetchAlltemplatepageTemplate = createAsyncThunk(
  "template/fetchAlltemplatepageTemplate",
  async (vendor_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/templates/template-all?vendor_id=${vendor_id}`
      );
      return response.data;
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
          if (action.payload?.data) {
            state.data = action.payload.data;
          } else {
            state.data = null;
            state.error = action.payload?.message || "Template not found";
          }
        }
      )

      .addCase(
        fetchAlltemplatepageTemplate.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = null;
          state.error = action.payload;
        }
      );
  },
});

export const { clearTemplate } = templateSlice.actions;
export default templateSlice.reducer;
