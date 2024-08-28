import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { ICategory } from "../type";

export const fetchCategories = createAsyncThunk<ICategory[]>(
  "categories/fetch",
  async () => {
    const categoriesResponse = await axiosApi.get<ICategory[]>("/categories");
    return categoriesResponse.data;
  },
);
