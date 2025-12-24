import React, { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import Navbar from './component/Navbar'


const App = () => {

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", "light")
  },[])

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/room/:roomId" element={<ChatPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App