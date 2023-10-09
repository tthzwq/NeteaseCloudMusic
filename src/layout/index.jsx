import React, { memo } from 'react'

import Content from "./content"
import Footer from "./footer"
import Header from "./header"
import Sider from "./sider"

const Layout = memo(() => {
  return (
    <div className='relative grid grid-cols-[200px_1fr] grid-rows-[1fr_60px] w-full h-full m-0 p-0 overflow-hidden'>
      <Header />
      <Sider />
      <Content />
      <Footer />
    </div>
  )
})

export default Layout