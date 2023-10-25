export enum PlayType {
  loop = "loop",
  single = "single",
  random = "random",
  sequential = "sequential",
}

export enum PlayerEvent {
  LOAD = "LOAD",
  LOAD_ERROR = "LOAD_ERROR",
  PLAY_ERROR = "PLAY_ERROR",
  PLAY_TYPE_CHANGE = "PLAY_TYPE_CHANGE",
  VOLUME_CHANGE = "VOLUME_CHANGE",
  MUTE_CHANGE = "MUTE_CHANGE",
  PROGRESS_CHANGE = "PROGRESS_CHANGE",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  STOP = "STOP",
  END = "END",
  SEEK = "SEEK",
  CHANGE = "CHANGE",
  PLAYLIST_CHANGE = "PLAYLIST_CHANGE",
  INDEX_CHANGE = "INDEX_CHANGE",
  RESET = "RESET",
  STATUS_CHANGE = "STATUS_CHANGE",
  DURATION_CHANGE = "DURATION_CHANGE",
}

export type PlayerState = {
  howl: Howl | null,
  status: MediaSessionPlaybackState,
  repeatMode: PlayType;
  volume: number;
  mute: boolean;
  duration: number;
  progress: number;
};

export type ArData = {
  id: string | number;
  name: string;
}

export type AlData = {
  id: string | number;
  name: string;
  picUrl: string;
}

export interface PlayData {
  id: string | number;
  name: string;
  artists: ArData[];
  album: AlData;
}

export interface SongData extends PlayData {
  url?: string;
  /** time (ms) */
  time?: number;
  howl?: Howl | null;
}
