//libraries
import React from 'react'

//components
import Chat from '../components/home/chat/Chat'
import Sidebar from '../components/home/sidebar/Sidebar'

const Home = () => {
  return (
    <div className='home'>
        <Sidebar/>
        <Chat/>
    </div>
  )
}

export default Home