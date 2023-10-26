import React, { memo, useCallback } from "react";
import { useAppSelector } from "@/hooks";
import { Link } from "react-router-dom";
import Swiper from "@/components/swiper";
import player from "@/lib/player";
import { getPlaylistDetail } from "@/api";
import IconDate from "@/components/icon-date";
import { formatImgUrl } from "@/utils";

function Card({ info }) {
  const handlePlay = useCallback((id) => {
    getPlaylistDetail({ id }).then((res) => {
      const playlist = res.data.playlist.tracks.map((item) => ({
        id: item.id,
        name: item.name,
        artists: item.artists || item.ar,
        album: item.album || item.al,
      }));
      player.setPlaylist(playlist, 0, true);
    });
  }, []);
  return (
    <div className="group relative box-content w-full pt-[100%]">
      <div
        className="absolute w-full pt-[100%] top-0 left-0 rounded-md bg-[length:100%_100%] shadow-innercard"
        style={{ backgroundImage: `url("${formatImgUrl(info.picUrl, 320)}")` }}
      >
        <button
          className="flex items-center justify-center absolute bottom-2 right-2 w-10 h-10 backdrop-blur-[2px] bg-white/60 rounded-full transition-opacity opacity-0 group-hover:opacity-100 "
          onClick={() => handlePlay(info.id)}
        >
          <img className="w-5 h-5 ml-1" src="/svg/play-single.svg" />
        </button>
      </div>
      <div className="h-[45px] py-1 text-ellipsis-l2">{info.name}</div>
    </div>
  );
}

function DailyCard() {
  const accountInfo = useAppSelector((state) => state.user.accountInfo);
  const songs = useAppSelector((state) => state.cache.songs);
  const avatarUrl = accountInfo?.profile?.avatarUrl;
  const day = new Date().getDate();
  function handlePlay() {
    player.setPlaylist(songs, 0, true);
  }
  return (
    <div className="group relative box-content w-full pt-[100%]">
      <div
        className="absolute w-full pt-[100%] top-0 left-0 rounded-md bg-[length:100%_100%] shadow-innercard overflow-hidden"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      >
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IconDate value={day} type="white" />
          </div>
        </div>
        <button
          className="flex items-center justify-center absolute bottom-2 right-2 w-10 h-10 backdrop-blur-[2px] bg-white/60 rounded-full transition-opacity opacity-0 group-hover:opacity-100 "
          onClick={handlePlay}
        >
          <img className="w-5 h-5 ml-1" src="/svg/play-single.svg" />
        </button>
      </div>
      <div className="h-[45px] py-1 text-ellipsis-l2">每日歌曲推荐</div>
    </div>
  );
}

const Recommend = memo((props) => {
  const cookie = useAppSelector((state) => state.user.cookie);
  const banners = useAppSelector((state) => state.cache.banners) || [];
  const personalizedPlaylist = useAppSelector(
    (state) => state.cache.personalizedPlaylist
  ) || [];
  const resource = useAppSelector((state) => state.cache.resource) || [];

  return (
    <div className="px-8 py-6">
      <Swiper banners={banners}></Swiper>
      <div className="py-3">
        <Link className="text-lg font-bold" to="/discovery/playlist">
          推荐歌单
          <i className="iconfont icon-ar ml-1"></i>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-x-5 gap-y-10">
        {cookie
          ? [
              <DailyCard />,
              resource
                .slice(0, 14)
                .map((item) => <Card key={item.id} info={item} />),
            ]
          : personalizedPlaylist.map((item) => (
              <Card key={item.id} info={item} />
            ))}
      </div>
    </div>
  );
});

Recommend.displayName = "Recommend";

export const Component = Recommend;

export default Recommend;
