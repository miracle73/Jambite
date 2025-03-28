// src/store/slices/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
}

interface UserState {
  idToken: string;
  user: User;
}

const initialState: UserState = {
  idToken: "",
  user: {
    id: "",
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearUserInfo: () => initialState,
    // editUserDetails: (state, action: PayloadAction<Partial<User>>) => {
    //   state.user = { ...state.user, ...action.payload };
    // },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
