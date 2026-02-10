// Initial state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../../utils/constants";
import { bookApi } from "./booksApi";

// create TS types for IS
const initialState = {
  book: null,
  accessToken: localStorage.getItem(TOKEN_KEY),
  isLoading: false,
  error: null,
  // isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
};

export const getBookId = createAsyncThunk(
  "book/:id",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await bookApi.getBookById(id);
      localStorage.setItem(TOKEN_KEY, response.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to retrieve book",
      );
    }
  },
);

// Slice
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookId.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.book = action.payload));
        state.accessToken = action.payload.accessToken;
        // state.isAuthenticated = true
      })
      .addCase(getBookId.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload as string
      });
  },
});

export default bookSlice.reducer;
