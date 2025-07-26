import React, { useContext, useEffect, useState } from 'react'
import '@fontsource/roboto/400.css'
import Header from '../Header/Header'
import { Grid, Typography } from '@mui/material'

import { UserContext } from '../../context/DataProvider'
import { axiosInstance } from '../../services/api'
import User from './User'
import { useLocation, useNavigate } from 'react-router-dom'

const Users = () => {
  const { user } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [admins, setAdmins] = useState([])
  const [managers, setManagers] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const managerId = location.search.split('=')[1] || null
  const [isUpdated, setIsUpdated] = useState(false)
  const isManagerSpecific = (managerId !== null)

  const Admin = parseInt(process.env.REACT_APP_ADMIN)
  const Manager = parseInt(process.env.REACT_APP_MANAGER)
  const normalUser = parseInt(process.env.REACT_APP_USER)

  const fetchAllUsers = () => {
    axiosInstance.get('/users').then(
      (res) => {
        const ADMINS = res.data.filter((user) => user.roleId === Admin)
        const MANAGERS = res.data.filter((user) => user.roleId === Manager)
        const USERS = res.data.filter((user) => user.roleId === normalUser)

        setAdmins(ADMINS)
        setManagers(MANAGERS)
        setUsers(USERS)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const fetchAllMembers = () => {
    axiosInstance.get(`/members/${managerId}`).then(
      (res) => {
        setUsers(res.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    if (managerId !== null) {
      fetchAllMembers()
    } else { fetchAllUsers() }
  }, [isUpdated])

  return (
    <>
      <Header />
      {
        isManagerSpecific
          ? <>
            <Typography sx={{ textAlign: 'center', mt: 2, lineHeight: 1.82, backgroundColor: '#e7f3ff', height: '10vh' }} variant="h4" color="initial">
              Team Members
            </Typography>
            {users && users.length > 0
              ? <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
                {users.map((user, index) => (
                  <>
                    <Grid item key={user.id} sx={{ alignContent: 'center' }} sm={6} md={4} xs={12} xl={3}>
                      <User isManagerSpecific={isManagerSpecific} user={user} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                    </Grid>
                  </>
                ))}
              </Grid>
              : <Typography sx={{ textAlign: 'left', ml: '4%', mt: '1%', height: '10vh' }} color="text.secondary" variant="h6">
                There are no users available
              </Typography>
            }
          </>
          : <>
            <Typography sx={{ textAlign: 'center', mt: 2, lineHeight: 1.82, backgroundColor: '#e7f3ff', height: '10vh' }} variant="h4" color="initial">
              Admins
            </Typography>
            {admins && admins.length > 1
              ? <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
                {admins.map((admin, index) => (

                  user.email !== admin.email && <Grid item key={admin.id} sm={6} md={4} xs={12} xl={3}>
                    <User isManagerSpecific={isManagerSpecific} user={admin} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                  </Grid>

                ))}
              </Grid>
              : <Typography sx={{ textAlign: 'left', ml: '4%', mt: '1%', height: '10vh' }} color="text.secondary" variant="h6">
                There are no admins other than you.
              </Typography>}

            <Typography sx={{ textAlign: 'center', mt: 2, lineHeight: 1.82, backgroundColor: '#e7f3ff', height: '10vh' }} variant="h4" color="initial">
              Managers
            </Typography>
            {managers && managers.length > 0
              ? <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
                {managers.map((manager, index) => (
                  <Grid item key={manager.id} sm={6} md={4} xs={12} xl={3}>
                    <User isManagerSpecific={isManagerSpecific} user={manager} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                  </Grid>

                ))}
              </Grid>
              : <Typography sx={{ textAlign: 'left', ml: '4%', mt: '1%', height: '10vh' }} color="text.secondary" variant="h6">
                There are no managers available
              </Typography>}
            <Typography sx={{ textAlign: 'center', mt: 2, lineHeight: 1.82, backgroundColor: '#e7f3ff', height: '10vh' }} variant="h4" color="initial">
              Users
            </Typography>
            {users && users.length > 0
              ? <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
                {users.map((user, index) => (
                  <>
                    <Grid item key={user.id} sx={{ alignContent: 'center' }} sm={6} md={4} xs={12} xl={3}>
                      <User isManagerSpecific={isManagerSpecific} user={user} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                    </Grid>
                  </>
                ))}
              </Grid>
              : <Typography sx={{ textAlign: 'left', ml: '4%', mt: '1%', height: '10vh' }} color="text.secondary" variant="h6">
                There are no users available
              </Typography>}
          </>
      }
    </>
  )
}

export default Users
