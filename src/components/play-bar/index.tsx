import React, { memo, useState } from 'react'
import ProgressBar from '../progress-bar'

const PlayBar = memo(() => {
  const [percent, setPercent] = useState(60)
  const [volume, setVolume] = useState(60)

  return (
    <div className='w-full h-full relative'>
      <div className='absolute w-full top-0 left-0'>
        <ProgressBar percent={percent} onChange={setPercent}  />
      </div>
      {percent}
      <div className='absolute right-10 top-10'>
        <div className='relative'>
          <i className="iconfont icon-volume_high"></i>
          <div className='absolute bottom-10 left-0 flex justify-center w-[30px] h-[100px] p-4 box-border bg-while shadow-md rounded'>
            <div className='h-full'>
            <ProgressBar percent={volume} onChange={setVolume} vertical barWidth='4px' round />

            </div>
          </div>

        </div>
        {volume}
      </div>
    </div>
  )
})

export default PlayBar