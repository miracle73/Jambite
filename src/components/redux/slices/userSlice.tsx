// src/store/slices/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
}

interface UserState {
  idToken: string;
  user: User;
}

const initialState: UserState = {
  idToken: "",
  user: {
    id: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, status: "success" };
    },
    clearUserInfo: () => initialState,
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
