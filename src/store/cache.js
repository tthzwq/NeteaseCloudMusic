import { getBanners, getPersonalized } from '@/api'
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'


const initialState = {
  banners: [],
  personalizedPlaylist: [],
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}


export const fetchRecommendData = createAsyncThunk('cache/fetchRecommendData', async () => {
  const data = {}
  const fetchList = [
    getBanners().then(res => data['banners'] = res.data.banners),
    getPersonalized().then(res => data['personalizedPlaylist'] = res.data.result),
  ]
  await Promise.allSettled(fetchList)
  return data
})

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecommendData.fulfilled, (state, { payload }) => {
      Object.assign(state, payload)
    })
  },
})

export const { } = cacheSlice.actions

export default cacheSlice.reducer

