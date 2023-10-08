import React, { memo } from 'react'

import Content from "./content"
import Footer from "./footer"
import Header from "./header"
import Sider from "./sider"

import "./layout.less"

const Layout = memo(() => {
  return (
    <div className='layout'>
      <Header />
      <Sider />
      <Content />
      <Footer />
    </div>
  )
})

export default Layout