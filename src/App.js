import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Account/Login'
import Home from './components/Home/Home'

const Routing = () => {
  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/' element={<Home />} />
    </Routes>
  )
}

const App = () => {
  return (
    <>
      <Routing />
    </>
  )
}

export default App
