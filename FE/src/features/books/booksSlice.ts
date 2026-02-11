import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookApi } from "./booksApi";
import type { BookState } from "./types";

// create TS types for IS
const initialState: BookState = {
  book: null,
  books: [],
  isLoading: false,
  error: null,
};

export const getBookId = createAsyncThunk(
  "book/:id",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await bookApi.getBookById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to retrieve book",
      );
    }
  },
);

export const getAllBooks = createAsyncThunk(
  "book/",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookApi.getAllBooks();
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
        ((state.isLoading = false), (state.book = action.payload.data));
      })
      .addCase(getBookId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.books = action.payload.data.data;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
