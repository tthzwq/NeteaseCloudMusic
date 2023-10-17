import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cacheReducer from './cache'
import userReducer from './user'
import persist, { setInitialState } from "./middleware/persist"

const reducers = combineReducers({
  cache: cacheReducer,
  user: userReducer,
})

function reducer(state:any, action:any) {
  if (action.type === 'INITIAL_STATE_LOADED') {
    return action.payload
  }
  return reducers(state, action)
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persist),
})

store.dispatch(setInitialState())

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
