import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { UserContext } from '../../context/DataProvider'
import secureLocalStorage from 'react-secure-storage'
import { axiosInstance } from '../../services/api'

const Header = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const onLogout = () => {
    secureLocalStorage.clear()
    navigate('/login')
  }

  const showMyPosts = () => {
    navigate(`/posts?userId=${user.id}`)
  }

  const showAllUsers = () => {
    navigate('/users')
  }

  const showTeamMembers = () => {
    navigate(`/users?managerId=${user.id}`)
  }

  const onClickAbout = () => {

  }

  const onClickContact = () => {

  }

  const admin = parseInt(process.env.REACT_APP_ADMIN)
  const manager = parseInt(process.env.REACT_APP_MANAGER)
  // const User = parseInt(process.env.REACT_APP_USER)

  let pages = [{ key: 'About us', event: onClickAbout }, { key: 'Contact us', event: onClickContact }]
  let settings = [{ key: 'Logout', event: onLogout }]

  // console.log(user.roleId)
  if (user.roleId === admin) {
    settings = [...settings]
    pages = [{ key: 'Users', event: showAllUsers }, ...pages]
  } else if (user.roleId === manager) {
    // settings = [ {key: 'Assign Manager', event: assignManager }, ...settings]
    pages = [{ key: 'Team Members', event: showTeamMembers }, ...pages]
  } else if (user.roleId !== undefined) {
    settings = [{ key: 'Logout', event: onLogout }]
    pages = [{ key: 'My Posts', event: showMyPosts }, ...pages]
  }

  useEffect(() => {
    const token = secureLocalStorage.getItem('accessToken')
    // console.log(user)

    const fetchUser = () => {
      if (token !== null && user.email === '') {
        axiosInstance.get('/user').then(
          (response) => {
            setUser(response.data)
            setIsLoggedIn(true)
          },
          (error) => {
            if (error.status === 403 || error.status === 401) {
              navigate('/login')
            }
            console.log(error)
          }
        )
      } else if (user.email === '') {
        setIsLoggedIn(false)
      }
    }
    fetchUser()
  }, [isLoggedIn])
  // const fetchedUser = useMemo(() => fetchUser(), user)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (index) => {
    setAnchorElNav(null)
    if (typeof index === 'number') { pages[index].event() }
  }

  const handleCloseUserMenu = (index) => {
    setAnchorElUser(null)
    if (typeof index === 'number') { settings[index].event() }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              TS~Post
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page.key} onClick={() => handleCloseNavMenu(index)}>
                  <Typography textAlign="center">{page.key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: '30vw',
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              TS~Post
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page.key}
                onClick={() => handleCloseNavMenu(index)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.key}
              </Button>
            ))}
          </Box>
          {isLoggedIn
            ? <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={setting.key} onClick={() => handleCloseUserMenu(index)}>
                    <Typography textAlign="center">{setting.key}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            : <Box sx={{ flexGrow: 0 }}>
              <Button sx={{ color: 'white' }} onClick={() => navigate('/login')}>Login</Button>
            </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
