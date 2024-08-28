import { ICategory } from "../type";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesThunk";
import { RootState } from "../app/store";

interface CategoriesState {
  categories: ICategory[];
  fetchLoading: boolean;
  category: string;
}

const initialState: CategoriesState = {
  categories: [],
  fetchLoading: false,
  category: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addTitle: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectCategoriesLoading = (state: RootState) =>
  state.categories.fetchLoading;

export const { addTitle } = categoriesSlice.actions;
export const selectCategory = (state: RootState) => state.categories.category;
