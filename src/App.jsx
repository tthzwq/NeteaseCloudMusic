import { RouterProvider } from "react-router-dom";
import router from "./router";
import player, { PlayerEvent } from "@/lib/player";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { setIndex, setPlaylist, setVolume, setMute, setRepeatMode } from "@/store/player";

function App() {
  const dispatch = useAppDispatch();
  // init player
  useEffect(() => {
    const unListeners = [
      player.on(PlayerEvent.PLAY_TYPE_CHANGE, (repeatMode) => {
        dispatch(setRepeatMode(repeatMode));
      }),
      player.on(PlayerEvent.VOLUME_CHANGE, (volume) => {
        dispatch(setVolume(volume));
      }),
      player.on(PlayerEvent.MUTE_CHANGE, (mute) => {
        dispatch(setMute(mute));
      }),
      player.on(PlayerEvent.INDEX_CHANGE, (index) => {
        dispatch(setIndex(index));
      }),
      player.on(PlayerEvent.PLAYLIST_CHANGE, (playlist) => {
        const list = playlist.map((item) => ({
          id: item.id,
          name: item.name,
          artists: item.artists,
          album: item.album,
        }));
        dispatch(setPlaylist(list));
      }),
    ];
    return () => {
      unListeners.forEach((unListener) => unListener());
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
