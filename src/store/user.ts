import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store';
import { getAccountInfo } from "@/api/user";
import { getCookie } from "@/utils";

interface UserState {
  cookie: string;
  accountInfo: any;
  userInfo: any
}

const initialState: UserState = {
  cookie: getCookie() || "",
  accountInfo: null,
  userInfo: null
};

export const fetchAccountInfo = createAsyncThunk(
  "user/getAccountInfoStatus",
  async () => {
    const res = await getAccountInfo();
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
    setCookie(state, action: PayloadAction<string>) {
      state.cookie = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccountInfo.fulfilled, (state, { payload }) => {
      state.accountInfo = payload
    })
  },
});

export const { setUserInfo, setCookie } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
