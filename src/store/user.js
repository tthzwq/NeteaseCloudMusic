import { getAccountInfo } from "@/api/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  accountInfo: null,
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
    setUserinfo(state, action) {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    [fetchAccountInfo.fulfilled]: (state, action) => {
      state.accountInfo = action.payload;
    },
  },
});

export const { setUserinfo } = userSlice.actions;

export default userSlice.reducer;
