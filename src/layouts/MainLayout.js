import React from 'react'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'

const MainLayout = ({children}) => {
   return (
      <>
      <Header/>
      <Sidebar/>
      {children}
      </>
   )
}

export default MainLayout
