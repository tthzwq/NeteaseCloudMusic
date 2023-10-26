import React, { memo, useCallback, useEffect, useState } from "react";
import ProgressBar from "@/components/progress-bar";
import VolumeControler from "@/components/volume-controler";
import player, { PlayType, PlayerEvent, SongData } from "@/lib/player";
import { useAppSelector } from "@/hooks";
import ArtistsLink from "@/components/artists-link";
import { formatImgUrl, formatTime } from "@/utils";

const PlayBar = memo(() => {
  const repeatMode = useAppSelector((state) => state.player.repeatMode);
  const [percent, setpercent] = useState(player.state.progress);
  const [songData, setSongData] = useState(player.current);
  const [duration, setDuration] = useState(player.duration);

  useEffect(() => {
    const unListeners = [
      player.on(PlayerEvent.PROGRESS_CHANGE, (progress) => {
        setpercent(progress as number)
      }),
      player.on(PlayerEvent.INDEX_CHANGE, (index) => {
        setSongData(player.current)
      }),
      player.on(PlayerEvent.DURATION_CHANGE, (duration) => {
        setDuration(duration as number)
      })
    ]
    return () => {
      unListeners.forEach(unListener => unListener())
    }
  }, []);

  const handleProgressChange = useCallback((percent: number) => {
    player.progressTo(percent);
  }, [])

  const handlePlayTypeChange = useCallback((type: PlayType) => {
    player.setRepeatMode(type);
  }, [])

  return (
    <div className="w-full h-full relative">
      <div className="absolute w-full top-0 left-0">
        <ProgressBar percent={percent} onChange={handleProgressChange} />
      </div>
      {
        songData && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SongInfo info={songData} percent={percent} duration={duration} />
          </div>
        )
      }
      <div className="flex space-x-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button>
          <i className="iconfont icon-like_full text-primary text-xl"></i>
        </button>
        <button onClick={() => player.back()}>
          <i className="iconfont icon-previous text-primary text-base"></i>
        </button>
        <button className="w-12 h-12" onClick={() => player.switchPlay()}>
          {player.state.status === "playing" ? (
            <img src="/svg/pause.svg" className="w-full h-full" />
          ) : (
            <img src="/svg/play.svg" className="w-full h-full" />
          )}
        </button>
        <button onClick={() => player.next()}>
          <i className="iconfont icon-next text-primary text-base"></i>
        </button>
        <button>
          <i className="iconfont icon-share text-ct"></i>
        </button>
      </div>
      <div className="flex space-x-6 absolute right-6 top-1/2 -translate-y-1/2">
        <PlayTypeIcon type={repeatMode} onChange={handlePlayTypeChange} />
        <i className="iconfont icon-playlist text-ct text-base cursor-pointer"></i>
        <VolumeControler />
      </div>
    </div>
  );
});

interface PlayTypeProps {
  type?: PlayType;
  onChange?: (type: PlayType) => void;
}
const playTypeList: PlayType[] = [
  PlayType.loop,
  PlayType.single,
  PlayType.random,
  PlayType.sequential,
];

const PlayTypeIcon: React.FC<PlayTypeProps> = memo(
  ({ type = PlayType.loop, onChange = () => {} }) => {
    const [playType, setPlayType] = useState(type);
    function handleClick() {
      const index = playTypeList.findIndex((item) => item === playType);
      const newType = playTypeList[index + 1] || playTypeList[0];
      setPlayType(newType);
      onChange(newType);
    }

    return (
      <div className="flex items-center justify-center">
        <i
          className={`iconfont icon-${playType} text-ct text-base cursor-pointer`}
          onClick={handleClick}
        ></i>
      </div>
    );
  }
);


interface SongInfoProps {
  info: SongData;
  percent: number;
  duration: number;
}
const SongInfo: React.FC<SongInfoProps> = memo(({ info, percent, duration }) => {
  const artists = info?.artists || [];
  const picUrl = info?.album?.picUrl;
  return (
    <div className="flex items-center space-x-4">
      <div className="w-11 h-11 rounded-md bg-ctd/10 bg-[length:100%_100%] shadow-inner"
        style={{ backgroundImage: `url("${formatImgUrl(picUrl, 128)}")` }}
      ></div>
      <div className="">
        <div className="flex items-center">
          <div className="max-w-[160px] truncate text-base text-ct">{info?.name}</div>
          <span className="px-1">-</span>
          <div className="max-w-[100px] truncate text-xs text-ctd">
            <ArtistsLink list={artists} />
          </div>
        </div>
        <div className="flex items-center pt-[2px] text-xs text-ctd">
          <span>{formatTime(duration * percent / 100)}</span>
          <span className="px-1">/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
})

export default PlayBar;
