import type { Middleware } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@/store';
import { updateDB, selectDB } from "@/utils/db"

enum KeyList {
  Cache = 'cache',
  User = 'user',
  Player = 'player',
}
const keyList = Object.values(KeyList)


const persist: Middleware = (store) => (next) => (action) => {

  let result = next(action)
  const key = keyList.find(key => action.type.startsWith(`${key}/`))
  if (key) {
    if (action.meta) {
      if (action.meta.requestStatus === "fulfilled") {
        update(key, store.getState()[key])
      }
    } else {
      update(key, store.getState()[key])
    }
  }
  return result
}

export default persist

function update(key: string, state: any) {
  try {
    updateDB({ name: key, value: JSON.stringify(state) })
  } catch (error) { }
}

export const setInitialState = () => {

  return async function (dispatch: AppDispatch, getState: () => RootState) {
    try {
      const state = getState();
      const cache = Object.assign({}, state)
      Promise.allSettled(keyList.map(name => selectDB(name))).then((res) => {
        res.map((item) => {
          if (item.status === "fulfilled") {
            const result = item.value
            if (Array.isArray(result) && result.length > 0) {
              const { name, value } = result[0]
              try {
                // @ts-ignore
                cache[name] = Object.assign({}, cache[name], JSON.parse(value))
              } catch (error) {

              }
            }
          }
        })
        dispatch({ type: 'INITIAL_STATE_LOADED', payload: cache });
      })

    } catch (error) {
      console.error('Error loading initial state from DB:', error);
    }
  };
};
