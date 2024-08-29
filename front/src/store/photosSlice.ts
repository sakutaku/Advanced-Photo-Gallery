import { GlobalError, Photo } from "../type";
import { createSlice } from "@reduxjs/toolkit";
import {
  createPhoto,
  deletePhoto,
  fetchByCategory,
  fetchPhotos,
} from "./photosThunk";
import { RootState } from "../app/store";

interface CocktailsState {
  photos: Photo[];
  photosLoading: boolean;
  addError: GlobalError | null;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: CocktailsState = {
  photos: [],
  photosLoading: false,
  addError: null,
  createLoading: false,
  deleteLoading: false,
};

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.photosLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, { payload: cocktails }) => {
      state.photos = cocktails;
      state.photosLoading = false;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.photosLoading = false;
    });
    builder.addCase(fetchByCategory.pending, (state) => {
      state.photosLoading = true;
    });
    builder.addCase(fetchByCategory.fulfilled, (state, { payload: cat }) => {
      state.photos = cat;
      state.photosLoading = false;
    });
    builder.addCase(fetchByCategory.rejected, (state) => {
      state.photosLoading = false;
    });
    builder.addCase(createPhoto.pending, (state) => {
      state.createLoading = true;
      state.addError = null;
    });
    builder.addCase(createPhoto.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPhoto.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.addError = error || null;
    });
    builder.addCase(deletePhoto.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state, { payload: photos }) => {
      state.deleteLoading = false;
      state.photos = photos;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const photosReducer = photosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectPhotosLoading = (state: RootState) =>
  state.photos.photosLoading;
export const selectAddError = (state: RootState) => state.photos.addError;
export const selectCreateLoading = (state: RootState) =>
  state.photos.createLoading;
