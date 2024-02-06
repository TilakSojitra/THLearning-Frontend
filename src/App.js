import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Account/Login'

const Routing = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
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
