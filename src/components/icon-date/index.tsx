import React, { memo } from 'react'

interface IconDateProps {
  type?: "primary" | "white"
  value?: number | string
}


const IconDate: React.FC<IconDateProps> = memo(({ type = "primary", value }) => {
  return (
    <div className={`inline-block relative text-${type}`}>
      <i className="iconfont icon-date text-8xl"></i>
      <div className={`absolute w-5/6 h-[13%] bg-${type} top-[15%] left-1/2 -translate-x-1/2 opacity-25`}></div>
      <div className="absolute w-full top-[40%] left-0 text-center text-5xl font-[600]">{value}</div>
    </div>
  )
})


export default IconDate