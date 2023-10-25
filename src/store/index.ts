import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cacheReducer from './cache'
import userReducer from './user'
import playerReducer from './player'
import persist, { setInitialState } from "./middleware/persist"
import playerIn from "@/lib/player"

const reducers = combineReducers({
  cache: cacheReducer,
  user: userReducer,
  player: playerReducer,
})

function reducer(state:any, action:any) {
  if (action.type === 'INITIAL_STATE_LOADED') {
    try {
      setTimeout(() => {
        playerIn.init(action.payload.player)
      })
    } catch (error) {
    }

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
export type RootState = ReturnType<typeof reducers>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
