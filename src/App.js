import React, { } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/Account/Login'
import Home from './components/Home/Home'
import { DataProvider } from './context/DataProvider'
import Users from './components/Users/Users'
import PostDetails from './components/Home/Post/PostDetails'
import Posts from './components/Home/Post/Posts'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/details/:id' element={<PostDetails />} />
        <Route exact path='/posts' element={<Posts />} />
      </Routes>
    </>
  )
}

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      <DataProvider >
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </DataProvider>
    </>
  )
}

export default App
