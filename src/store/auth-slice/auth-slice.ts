import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { USER_AUTH_DATA_INTERFACE } from "interfaces";
import { loginThunk } from "./auth-actions";

interface AUTH_STATE_INTERFACE {
  email: string;
  token: string;
  isLoggedIn: boolean;
  userId: string;
  isLoading: boolean;
  hasError: boolean;
  errorMsgCode: string;
}

const initialState: AUTH_STATE_INTERFACE = {
  email: "",
  token: "",
  isLoggedIn: false,
  userId: "",
  isLoading: false,
  hasError: false,
  errorMsgCode: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
    },
    logout: (state) => {
      state.token = "null";
      state.isLoggedIn = false;
      state.userId = "";
      state.email = "";
    },
    resetAuthErrors: (state) => {
      state.hasError = false;
      state.errorMsgCode = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMsgCode = action.error.message
          ? action.error.message
          : "GENERIC_ERROR_MESSAGE";
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<USER_AUTH_DATA_INTERFACE>) => {
          const { idToken, localId, email } = action.payload;
          state.isLoading = false;
          state.hasError = false;
          state.errorMsgCode = "";
          state.email = email;
          state.isLoggedIn = true;
          state.token = idToken;
          state.userId = localId;
        }
      );
  },
});

export const { setToken, logout, resetAuthErrors } = AuthSlice.actions;

export const selectUserEmail = (state: RootState) => state.auth.email;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectHasAuthError = (state: RootState) => state.auth.hasError;
export const selectAuthErrorMsgCode = (state: RootState) =>
  state.auth.errorMsgCode;

export default AuthSlice.reducer;
