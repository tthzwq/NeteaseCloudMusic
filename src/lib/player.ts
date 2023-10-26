import { Howl, Howler } from "howler";
import mitt, { Handler } from 'mitt';
import { PlayType, SongData, PlayerEvent, PlayerState } from "./playerType.ts";
import { getSongUrl } from "@/api/song.js";



export class Player {
  private readonly emitter = mitt();
  public on(type: PlayerEvent, handler: Handler<unknown>) {
    this.emitter.on(type, handler);
    return () => this.emitter.off(type, handler);
  };
  public off = this.emitter.off.bind(this.emitter);
  public emit = this.emitter.emit.bind(this.emitter);

  public current: SongData | null = null;

  public _playlist: SongData[] = [];
  get playlist(): SongData[] {
    return this._playlist;
  }
  set playlist(value: SongData[]) {
    if (value === this._playlist) return;
    this._playlist = value;
    this.emit(PlayerEvent.PLAYLIST_CHANGE, value);
  }

  private _index: number = 0;
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    if (value === this._index) return;
    this._index = value;
    this.emit(PlayerEvent.INDEX_CHANGE, value);
  }

  private _repeatMode: PlayType = PlayType.loop;
  /** 歌单循环播放类型 */
  get repeatMode(): PlayType {
    return this._repeatMode;
  }
  set repeatMode(value: PlayType) {
    if (value === this._repeatMode) return;
    this._repeatMode = value;
    this.emit(PlayerEvent.PLAY_TYPE_CHANGE, value);
  }

  private _volume: number = 100;
  /** 音量 volume 0-100 */
  get volume(): number {
    return this._volume;
  }
  set volume(value: number) {
    if (value === this._volume) return;
    this._volume = value;
    this.emit(PlayerEvent.VOLUME_CHANGE, value);
  }

  private _mute: boolean = false;
  /** 是否静音 */
  get mute(): boolean {
    return this._mute;
  }
  set mute(value: boolean) {
    if (value === this._mute) return;
    this._mute = value;
    this.emit(PlayerEvent.MUTE_CHANGE, value);
  }

  private _status: MediaSessionPlaybackState = "none";
  get status(): MediaSessionPlaybackState {
    return this._status;
  }
  set status(value: MediaSessionPlaybackState) {
    if (value === this._status) return;
    this._status = value;
    this.emit(PlayerEvent.STATUS_CHANGE, value);
  }

  private _duration: number = 0;
  /** 歌曲时长 duration (s) */
  get duration(): number {
    return this._duration;
  }
  set duration(value: number) {
    if (value === this._duration) return;
    this._duration = value;
    this.emit(PlayerEvent.DURATION_CHANGE, value);
  }

  private _progress: number = 0;
  /** 歌曲进度 progress 0-100 */
  get progress(): number {
    return this._progress;
  }
  set progress(value: number) {
    if (value === this._progress) return;
    this._progress = value;
    this.emit(PlayerEvent.PROGRESS_CHANGE, value);
  }

  get state(): PlayerState {
    return {
      howl: this.current?.howl || null,
      status: this.status,
      repeatMode: this.repeatMode,
      volume: this.volume,
      mute: this.mute,
      duration: this.duration,
      progress: this.progress,
    }
  }

  constructor(playlist: SongData[], index: number = 0, repeatMode = PlayType.loop, volume: number = 100, mute: boolean = false) {
    this.setPlaylist(playlist, index);
    this.setRepeatMode(repeatMode);
    this.setVolume(volume)
    this.setMute(mute)

    if ("mediaSession" in navigator) {
      const mediaSession = navigator.mediaSession;
      mediaSession.setActionHandler("nexttrack", () => this.next());
      mediaSession.setActionHandler("pause", () => this.pause());
      mediaSession.setActionHandler("play", () => this.play());
      mediaSession.setActionHandler("previoustrack", () => this.back());
      mediaSession.setActionHandler("seekto", details => this.seekTo(details.seekTime));
      mediaSession.setActionHandler("stop", () => this.stop());
    }
  }


  public setPlaylist(playlist: SongData[], index: number = 0, autoplay: boolean = false) {
    this.reset()
    this.playlist = playlist.map(item => {
      return {
        id: item.id,
        name: item.name,
        artists: item.artists,
        album: item.album,
        howl: null,
        url: "",
        time: 0,
      }
    });
    this._index = -1;
    this.setIndex(index, autoplay)
  }

  public async setIndex(index: number, autoplay: boolean = false) {
    const beforeHowl = this.getCurrentHowl();
    if (beforeHowl) {
      this.removeListeners(beforeHowl);
      beforeHowl.stop();
    }
    this.current = this.playlist[index];
    if (!this.current) return;
    if (!this.current.howl) {
      const { url, time } = await getSongUrl({ id: this.current.id }).then(res => res.data.data[0])
      this.current.url = url as string;
      this.current.time = time;
      this.current.howl = new Howl({
        src: [url],
        html5: true,
      })
    }
    this.index = index;
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.current.name,
        artist: this.current.artists.map(a => a.name).join(" / "),
        album: this.current.album.name,
        artwork: [{ src: `${this.current.album.picUrl}?param=128y128`, sizes: "128x128", }],
      });
    }
    const howl = this.current.howl;
    howl.loop(this.repeatMode === PlayType.single);
    this.initListeners(howl);

    this.status = "none";
    this.duration = this.current.time ? this.current.time / 1000 : 0;
    this.progress = 0;
    if (autoplay) {
      this.play();
    }
    this.emit(PlayerEvent.CHANGE, this.state);
  }

  public update() {
    this.step();
    const howl = this.getCurrentHowl();
    if (!howl) return;
    if (howl.playing()) {
      requestAnimationFrame(() => this.update());
    }
  }

  private onPlay = () => {
    this.status = "playing";
    this.update();
    this.emit(PlayerEvent.PLAY, this.state);
    this.emit(PlayerEvent.CHANGE, this.state);
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = this.status;
    }
  }
  private onPause = () => {
    this.status = "paused";
    this.emit(PlayerEvent.PAUSE, this.state);
    this.emit(PlayerEvent.CHANGE, this.state);
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = this.status;
    }
  }
  private onStop = () => {
    this.status = "none";
    this.emit(PlayerEvent.STOP, this.state);
    this.emit(PlayerEvent.CHANGE, this.state)
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = this.status;
    }
  }
  private onEnd = () => {
    switch (this.repeatMode) {
      case PlayType.loop:
      case PlayType.random:
        this.next();
        break;
      case PlayType.single:
        break;
      case PlayType.sequential:
        if (this.index < this.playlist.length - 1) {
          this.next();
        }
        break;

      default:
        break;
    }
    this.emit(PlayerEvent.END, this.state);
  }
  private onSeek = () => {
    this.emit(PlayerEvent.SEEK, this.state);
  }
  private initListeners(howl: Howl) {
    howl.on("play", this.onPlay)
    howl.on("pause", this.onPause)
    howl.on("stop", this.onStop)
    howl.on("end", this.onEnd)
    howl.on("seek", this.onSeek)
  }
  private removeListeners(howl: Howl) {
    howl.off("play", this.onPlay)
    howl.off("pause", this.onPause)
    howl.off("stop", this.onStop)
    howl.off("end", this.onEnd)
    howl.off("seek", this.onSeek)
  }

  public getCurrentHowl(): Howl | null {
    return this.current?.howl || null;
  }

  public reset(): void {
    const howl = this.getCurrentHowl();
    if (howl) {
      this.removeListeners(howl);
      howl.stop();
    }
    this.current = null;
    this._playlist = [];
    this._index = 0;
    this._status = "none";
    this._duration = 0;
    this._progress = 0;
    this.emit(PlayerEvent.RESET, this);
    Howler.unload();
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = this.status;
      navigator.mediaSession.metadata = null;
    }
  }

  public setRepeatMode(mode: PlayType): void {
    this.repeatMode = mode;
    const howl = this.getCurrentHowl();
    howl && howl.loop(mode === PlayType.single);
  }

  public next(): void {
    const nextIndex = this.index < this.playlist.length - 1 ? this.index + 1 : 0;
    this.setIndex(nextIndex, true);
  }

  public back(): void {
    const backIndex = this.index > 0 ? this.index - 1 : this.playlist.length - 1;
    this.setIndex(backIndex, true);
  }

  public play() {
    const howl = this.getCurrentHowl();
    if (!howl) return;
    if (howl.playing()) return;
    howl.play();
  }

  public stop(): void {
    const howl = this.getCurrentHowl();
    if (!howl) return;
    howl.stop();
  }

  public pause(): void {
    const howl = this.getCurrentHowl();
    if (!howl) return;
    howl.pause();
  }

  public switchPlay(): void {
    const howl = this.getCurrentHowl();
    if (!howl) return;
    if (howl.playing()) {
      this.pause();
    } else {
      this.play();
    }
  }
  /**
   * @param seekTime 秒
   */
  public seekTo(seekTime?: number) {
    const howl = this.getCurrentHowl();
    howl && howl.seek(seekTime);
  }
  /**
   * @param progress 0-100
   */
  public progressTo(progress: number) {
    const seekTime = Math.max(0, Math.min(100, progress)) / 100 * this.duration;
    this.seekTo(seekTime);
  }
  public step() {
    const howl = this.getCurrentHowl();
    if (!howl) return;
    const seekTime = howl.seek() || 0;
    const duration = howl.duration() || 0;
    const progress = (seekTime / duration) * 100
    this.progress = Math.max(0, Math.min(100, progress));
    this.duration = duration;
    this.emit(PlayerEvent.CHANGE, this.state);

    if ("mediaSession" in navigator) {
      navigator.mediaSession.setPositionState({
        duration,
        position: seekTime
      });
    }
  }
  /**
   * @param volume 0-100
   */
  public setVolume(volume: number): void {
    const newVolume = Math.max(0, Math.min(100, volume));
    Howler.volume(newVolume / 100)
    this.volume = newVolume;
  }
  public setMute(mute: boolean): void {
    Howler.mute(mute);
    this.mute = mute;
  }
  public init(state: InitState) {
    this.setVolume(state.volume);
    this.setMute(state.mute);
    this.setRepeatMode(state.repeatMode);
    this.setPlaylist(state.playlist, state.index);
  }
}

export type InitState = {
  volume: number;
  mute: boolean;
  repeatMode: PlayType;
  playlist: SongData[];
  index: number;
}

export * from "./playerType.ts";

export default new Player([]);
