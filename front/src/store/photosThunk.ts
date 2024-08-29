import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError, Photo, PhotoMutation } from "../type";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const fetchPhotos = createAsyncThunk<Photo[], void | string>(
  "photos/fetchAll",
  async (user) => {
    if (user) {
      const response = await axiosApi.get<Photo[]>(`/photos?user=${user}`);
      return response.data;
    }
    const response = await axiosApi.get<Photo[]>("/photos");
    return response.data;
  },
);

export const fetchByCategory = createAsyncThunk<Photo[], void | string>(
  "photos/fetchByCategory",
  async (category) => {
    if (category) {
      const response = await axiosApi.get<Photo[]>(`/photos?category=${category}`);
      return response.data;
    }

    return [];
  },
);

export const createPhoto = createAsyncThunk<
  void,
  PhotoMutation,
  { rejectValue: GlobalError }
>(
  "photos/create",
  async (PhotoMutation: PhotoMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(PhotoMutation) as (keyof PhotoMutation)[];

      keys.forEach((key) => {
        const value = PhotoMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post("/photos", formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  },
);

export const deletePhoto = createAsyncThunk<Photo[], string>(
  "photos/delete",
  async (id) => {
    const response = await axiosApi.delete("/photos/" + id);
    console.log(response.data);
    return response.data;
  },
);
