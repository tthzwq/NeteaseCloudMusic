import React, { memo } from 'react'

const Recommend = memo(() => {
  return (
    <h1>个性推荐</h1>
  )
})

Recommend.displayName = 'Recommend'

export const Component = Recommend

export default Recommend