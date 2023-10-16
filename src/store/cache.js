import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'


const initialState = {
  banners: [],
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

