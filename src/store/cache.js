import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'


const initialState = {
  banners: [
    { bannerId: 0, pic: "https://p1.music.126.net/eobL2jxNOKpeNZx65jCQJA==/109951168972553973.jpg" },
    { bannerId: 1, pic: "https://p1.music.126.net/AoPi5oRHRqx7g2O6Yb-ERA==/109951168972569108.jpg" },
    { bannerId: 2, pic: "https://p1.music.126.net/TkkOTwD0mhjtRtTfM9PzDw==/109951168972733136.jpg" },
    { bannerId: 3, pic: "https://p1.music.126.net/ByErBz9iQey_FDaLNxH72A==/109951168972581657.jpg" },
    { bannerId: 4, pic: "https://p1.music.126.net/tF_AoWcRtgxhPUUf168qyA==/109951168972589051.jpg" },
    { bannerId: 5, pic: "https://p1.music.126.net/oQ8kXJVaLoQ12b_GLmgXaA==/109951168972581383.jpg" },
    { bannerId: 6, pic: "https://p1.music.126.net/WeD6Df9oTWKT-hXJ0HRZ6Q==/109951168972590705.jpg" },
    { bannerId: 7, pic: "https://p1.music.126.net/e8tdK93SZ_akD8IoNI4yIw==/109951168972591930.jpg" },
  ],
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Thunk functions
export const fetchData = createAsyncThunk('cache/fetchData', async () => {
  await sleep(1000)
  return []
})

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setBanners(state, action) {
      console.log('setBanners', action);
      const newList = action.payload;
      state.banners = newList;
    },
  },
})

export const { setBanners } = cacheSlice.actions

export default cacheSlice.reducer

