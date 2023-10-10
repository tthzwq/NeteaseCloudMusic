import { configureStore } from '@reduxjs/toolkit'
import cacheReducer from './cache'


const store = configureStore({
  reducer: {
    cache: cacheReducer,
  },
})

export default store
