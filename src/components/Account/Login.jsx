/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
  styled,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { blue } from '@mui/material/colors'

const LoginButton = styled(Button)`
  text-transform: none;
  height: 20px;
  border-radius: 2px;
`

const Login = () => {
  const [showLogin, setShowLogin] = useState(true)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    showPassword: false
  })

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    name: '',
    passwordConfirm: '',
    showPassword: false
  })

  const handleSignupDataChange = (e, prev) => {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleLoginDataChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
  }

  const handleSignup = (e) => {
    e.preventDefault()
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickShowPassword = (page) => {
    if (page === 'login') {
      setLoginData({
        ...loginData,
        showPassword: !loginData.showPassword
      })
    } else {
      setSignupData({
        ...signupData,
        showPassword: !signupData.showPassword
      })
    }
  }

  const toggleSignup = () => {
    setShowLogin(!showLogin)
  }

  const paperStyle = {
    padding: 20,
    margin: '15vh auto',
    width: 300
  }

  return (
    <>

      <Grid align="center">
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <Avatar>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 40, backgroundColor: blue[500] }}
              />
            </Avatar>
            <Typography variant="h6" style={{ marginTop: '5px' }}>
              {showLogin ? 'Login' : 'Sign Up'}
            </Typography>
          </Grid>
          {showLogin
            ? <>
              <form onSubmit={handleLogin}>

                <TextField
                  name="email"
                  varient="outlined"
                  label="Email"
                  value={loginData.email}
                  style={{ marginTop: '20px' }}
                  onChange={handleLoginDataChange}
                  fullWidth
                  required
                />

                <FormControl sx={{ width: '100%', marginTop: 2 }} required variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={signupData.showPassword ? 'text' : 'password'}
                    value={signupData.password}
                    onChange={handleSignupDataChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {signupData.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    fullWidth
                    required
                  />
                </FormControl>

                <Grid
                  container
                  style={{ marginTop: '10px' }}
                  justifyContent="space-around"
                // alignItems="center"
                >
                  <Button sx={{ fontSize: '0.8rem', mb: 2, mt: 1 }} onClick={() => toggleSignup()}>
                    New User? Click here
                  </Button>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
              </form> </>
            : <form onSubmit={handleSignup}>
              <TextField
                name="name"
                varient="outlined"
                label="Name"
                value={signupData.name}
                style={{ marginTop: '20px' }}
                onChange={handleSignupDataChange}
                fullWidth
                required
              />

              <TextField
                name="email"
                varient="outlined"
                label="Email"
                value={signupData.email}
                style={{ marginTop: '10px' }}
                onChange={handleSignupDataChange}
                fullWidth
                required
              />

              <TextField
                name="password"
                style={{ marginTop: '10px' }}
                varient="outlined"
                type={signupData.showPassword ? 'text' : 'password'}
                label="Password"
                value={signupData.password}
                onChange={handleSignupDataChange}
                fullWidth
                required
              />
              <TextField
                name="passwordConfirm"
                style={{ marginTop: '10px' }}
                varient="outlined"
                type={signupData.showPassword ? 'text' : 'password'}
                label="Confirm Password"
                value={signupData.passwordConfirm}
                helperText="Password must contain minimum of 8 characters"
                onChange={handleSignupDataChange}
                fullWidth
                required
              />

              <FormControl sx={{ ml: 0.5, mt: 1 }} fullWidth>
                <FormControlLabel control={<Checkbox onChange={() => handleClickShowPassword('signup')} defaultunChecked />} label="Show Password" />
              </FormControl>
              <Grid
                container
                style={{ marginTop: '7px' }}
                justifyContent="center"
                alignItems="center"
              >
                <Button sx={{ fontSize: '0.8rem', mt: 0.2 }} onClick={() => toggleSignup()}>
                    Already have an account
                  </Button>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>

            </form>}
        </Paper>
      </Grid>
    </>
  )
}

export default Login
