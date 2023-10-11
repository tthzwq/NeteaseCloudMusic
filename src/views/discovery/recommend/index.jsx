import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBanners } from "@/store/cache";
import { Link } from "react-router-dom";
import Swiper from "@/components/swiper";
import { invoke } from '@tauri-apps/api/tauri'
import { Body, fetch } from "@tauri-apps/api/http"
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
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.cache);
  async function aaaa() {
    dispatch(setBanners([
      {
        bannerBizType: "force_banner",
        bannerId: "1696927488638882",
        encodeId: "176456056",
        pic: "http://p1.music.126.net/Noc7g2K5Ciy8FWL3EyyJSA==/109951168973904248.jpg",
        showAdTag: true,
        targetId: 176456056,
        targetType: 10,
        titleColor: "red",
        typeTitle: "数字专辑",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696928257323358",
        encodeId: "176386982",
        pic: "http://p1.music.126.net/h0hc3XI0PGnt5dddp2Lxew==/109951168973923665.jpg",
        showAdTag: true,
        targetId: 176386982,
        targetType: 10,
        titleColor: "red",
        typeTitle: "新碟首发",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696928306684369",
        encodeId: "2088079571",
        pic: "http://p1.music.126.net/xaWIxqMuMthfhjF05-C91A==/109951168973928543.jpg",
        showAdTag: true,
        targetId: 2088079571,
        targetType: 1,
        titleColor: "red",
        typeTitle: "热歌推荐",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696928383978496",
        encodeId: "176369838",
        pic: "http://p1.music.126.net/6Wal2Dxt5CMT4t5WdVwenQ==/109951168973917496.jpg",
        showAdTag: true,
        targetId: 176369838,
        targetType: 10,
        titleColor: "red",
        typeTitle: "新碟首发",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696927953937580",
        encodeId: "2058933959",
        pic: "http://p1.music.126.net/O3IC-TpC7nCpNbOKARgF1A==/109951168973918571.jpg",
        showAdTag: true,
        targetId: 2058933959,
        targetType: 1,
        titleColor: "red",
        typeTitle: "新歌首发",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696927814120845",
        encodeId: "2085790646",
        pic: "http://p1.music.126.net/qCogAeM7VyVr4Vwu7fKz6A==/109951168973915124.jpg",
        showAdTag: true,
        targetId: 2085790646,
        targetType: 1,
        titleColor: "red",
        typeTitle: "新歌首发",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696927730700452",
        encodeId: "2089187046",
        pic: "http://p1.music.126.net/A4jGyzbf2IKyEmGZjkY1Aw==/109951168973906867.jpg",
        showAdTag: true,
        targetId: 2089187046,
        targetType: 1,
        titleColor: "red",
        typeTitle: "新歌首发",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696992102441116",
        encodeId: "174519689",
        pic: "http://p1.music.126.net/WGbdsqEKNBrJs_KnFA-Ydw==/109951168975417591.jpg",
        showAdTag: true,
        targetId: 174519689,
        targetType: 10,
        titleColor: "red",
        typeTitle: "热碟推荐",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696982382125750",
        encodeId: "2089556566",
        pic: "http://p1.music.126.net/-bgX8NraBgOYlMw6AAOKiA==/109951168975281016.jpg",
        showAdTag: true,
        song: { name: "水雾", id: 2089556566, pst: 0, t: 0 },
        targetId: 2089556566,
        targetType: 1,
        titleColor: "red",
        typeTitle: "新歌首发",
      },
      {
        bannerBizType: "force_banner",
        bannerId: "1696982465506612",
        encodeId: "2081228361",
        pic: "http://p1.music.126.net/UyhykuPIecxfL51G5auBnQ==/109951168975272756.jpg",
        showAdTag: true,
        song: { name: "风语者（feat.张钰）", id: 2081228361, pst: 0, t: 0 },
        targetId: 2081228361,
        targetType: 1,
        titleColor: "red",
        typeTitle: "新歌首发",
      },
    ]))
    // await invoke('aaaa').then(result => {
    //   // 处理成功的结果
    //   console.log('URL:', result.url);
    //   console.log('Headers:', result.headers);
    //   console.log('Body:', result.body);
    //   const options = {
    //     method: "POST",
    //     headers: result.headers.reduce((total, [key, value]) => {
    //       total[key] = value;
    //       return total;
    //     }, {}),
    //     body: Body.text(result.body)
    //   }
    //   console.log(options);
    //   fetch(result.url, options).then(res => {
    //     const newList = res.data.banners
    //     console.log(newList);
    //     newList && newList.length > 0 && setBanners(newList)
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // })
  }

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
      <button onClick={aaaa}>aaaa</button>
    </div>
  );
});

Recommend.displayName = "Recommend";

export const Component = Recommend;

export default Recommend;
