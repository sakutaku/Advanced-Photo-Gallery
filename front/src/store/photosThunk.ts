import { createAsyncThunk } from '@reduxjs/toolkit';
import { Photo } from '../type';
import axiosApi from '../axiosApi';

export const fetchPhotos = createAsyncThunk<Photo[], void | string>(
  'photos/fetchAll',
  async (user) => {
    if (user) {
      const response = await axiosApi.get<Photo[]>(`/photos?user=${user}`);
      return response.data;
    }
    const response = await axiosApi.get<Photo[]>('/photos');
    return response.data;
  });