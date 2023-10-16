import React, { memo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swiper from "@/components/swiper";
import { invoke } from "@tauri-apps/api";
import { loadDB } from "@/utils/db";
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
  const db = useRef(null);
  async function LOADDB() {
    db.current = await loadDB
    console.log("loadDB", db.current)
  }
  async function CREATE() {
    const result = await db.current.execute(
      "CREATE TABLE IF NOT EXISTS store (id INTEGER PRIMARY KEY, name TEXT, value TEXT)",
    )
    console.log("CREATE", result)
    SELECT()
  }

  async function INSERT() {
    const result = await db.current.execute(
      "INSERT into store (name, value) VALUES ($1, $2)",
      ['app', JSON.stringify({ name: "tauri", age: 1 })],
    )
    console.log("INSERT", result)
    SELECT()
  }
  async function UPDATE() {
    const result = await db.current.execute(
      "INSERT OR REPLACE INTO store (name, value) VALUES ($1, $2)",
      ["app", JSON.stringify({ name: "change", age: 2 })],
    )
    console.log("UPDATE", result)
    SELECT()

  }
  async function SELECT() {
    const result = await db.current.select("SELECT * from store")
    console.log("SELECT", result, Array.isArray(result))
    result.map(item => {
      console.log(JSON.parse(item.value))
    })
  }


  async function CLEAR() {
    const result = await db.current.select("DELETE FROM store")
    console.log("SELECT", result, Array.isArray(result))
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
      <div><button onClick={LOADDB}>loadDB</button></div>
      <div><button onClick={CREATE}>创建表</button></div>
      <div><button onClick={INSERT}>INSERT</button></div>
      <div><button onClick={UPDATE}>UPDATE</button></div>
      <div><button onClick={SELECT}>SELECT</button></div>
      <div><button onClick={CLEAR}>CLEAR</button></div>
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
