import { Photo } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPhotos } from './photosThunk';
import { RootState } from '../app/store';

interface CocktailsState {
  photos: Photo[];
  photosLoading: boolean;
}

const initialState: CocktailsState = {
  photos: [],
  photosLoading: false,
};

export const photosSlice = createSlice({
  name: 'photos',
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
  },
});

export const photosReducer = photosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectPhotosLoading = (state: RootState) => state.photos.photosLoading;

