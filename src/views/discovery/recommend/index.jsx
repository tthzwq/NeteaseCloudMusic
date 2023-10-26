import React, { memo, useCallback } from "react";
import { useAppSelector } from "@/hooks";
import { Link } from "react-router-dom";
import Swiper from "@/components/swiper";
import player from "@/lib/player";
import { getPlaylistDetail } from "@/api";

function Card({ info }) {
  const handlePlay = useCallback((id) => {
    getPlaylistDetail({id}).then(res => {
      const playlist = res.data.playlist.tracks.map(item => ({
        id: item.id,
        name: item.name,
        artists: item.artists || item.ar,
        album: item.album || item.al,
      }))
      player.setPlaylist(playlist, 0, true)
    })
  }, []);
  return (
    <div className="group relative box-content w-full pt-[100%]">
      <div
        className="absolute w-full pt-[100%] top-0 left-0 rounded-md bg-[length:100%_100%] shadow-innercard"
        style={{ backgroundImage: `url("${info.picUrl}")` }}
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

const Recommend = memo((props) => {
  const cookie = useAppSelector((state) => state.user.cookie);
  const banners = useAppSelector((state) => state.cache.banners);
  const personalizedPlaylist = useAppSelector(
    (state) => state.cache.personalizedPlaylist
  );
  const resource = useAppSelector((state) => state.cache.resource);

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
              <Card key="songs" info={{ name: "每日歌曲推荐" }} />,
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
