import React, { useContext } from 'react'
// import Header from '../Header/Header'
import { UserContext } from '../../context/DataProvider'
import Header from '../Header/Header'
import Typography from '@mui/material/Typography'
import Posts from './Post/Posts'

const Home = () => {
  const { user } = useContext(UserContext)
  // const header = useMemo(<Header />, user)
  return (
    <>
      <Header/>
      <Typography sx={{ textAlign: 'center', mt: 2, lineHeight: 1.82, backgroundColor: '#e7f3ff', height: '10vh' }} variant="h4" color="initial">
        Hello {user.name}
      </Typography>
      <Posts />
    </>
  )
}

export default Home
