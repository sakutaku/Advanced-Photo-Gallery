import { GlobalError, User, ValidationError } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchGoogleLogin, loginUser, register } from './usersThunk';
import { RootState } from '../app/store';

interface UsersState {
  user: User | null,
  registerLoading: boolean,
  registerError: ValidationError | null,
  loginLoading: boolean,
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: userResponse}) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, {payload: userResponse}) => {
      state.loginLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(loginUser.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(fetchGoogleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(fetchGoogleLogin.fulfilled, (state, { payload: userResponce }) => {
      state.loginLoading = false;
      state.user = userResponce.user;
    });
    builder.addCase(fetchGoogleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;

export const {unsetUser} = usersSlice.actions;
export const selectLoginError = (state: RootState) => state.users.loginError;