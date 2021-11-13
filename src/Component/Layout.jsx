import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({children}) {
  return (
    <>
      <Header value={children.value}/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout
