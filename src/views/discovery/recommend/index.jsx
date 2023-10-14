import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swiper from "@/components/swiper";
import { invoke } from "@tauri-apps/api";
function Card() {
  return (
    <div className="relative box-content w-full pt-[100%]">
      <div className="absolute w-full pt-[100%] top-0 left-0">
        <img
          className="absolute w-full h-full top-0 left-0 rounded-md"
          src="http://p2.music.126.net/BJgUd9aD9gpougZFASRTTw==/18548761162235571.jpg"
        />
      </div>
      <div className="h-[45px] py-1 text-ellipsis-l2">见素抱朴 不忘初心</div>
    </div>
  );
}

const Recommend = memo((props) => {
  const { banners } = useSelector((state) => state.cache);

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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
});

Recommend.displayName = "Recommend";

export const Component = Recommend;

export default Recommend;
