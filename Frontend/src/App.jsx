import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
