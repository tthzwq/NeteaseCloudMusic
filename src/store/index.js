import { configureStore } from '@reduxjs/toolkit'
import cacheReducer from './cache'
import userReducer from './user'


const store = configureStore({
  reducer: {
    cache: cacheReducer,
    user: userReducer,
  },
})

export default store
