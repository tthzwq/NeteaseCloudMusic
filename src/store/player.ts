import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store';
import { PlayType, PlayData } from "@/lib/playerType";


interface PlayerState {
  repeatMode: PlayType;
  /** volume 0-100 */
  volume: number;
  mute: boolean;
  playlist: PlayData[];
  index: number;
}

const initialState: PlayerState = {
  repeatMode: PlayType.loop,
  volume: 100,
  mute: false,
  playlist: [],
  index: 0,
};


const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<PlayData[]>) {
      state.playlist = action.payload;
    },
    setRepeatMode(state, action: PayloadAction<PlayType>) {
      state.repeatMode = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = Math.max(0, Math.min(100, action.payload));
    },
    setMute(state, action: PayloadAction<boolean>) {
      state.mute = action.payload;
    },
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    }
  },
  extraReducers: (builder) => {
  },
});

export const { setPlaylist, setRepeatMode, setVolume, setMute, setIndex } = PlayerSlice.actions;

export const selectPlayerInfo = (state: RootState) => state.player;

export default PlayerSlice.reducer;
