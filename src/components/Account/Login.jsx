/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
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
  InputAdornment,
  Stack,
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { blue } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../services/api'
import secureLocalStorage from 'react-secure-storage'
import { UserContext } from '../../context/DataProvider'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { addSignupRules } from '../../utils/common-util'

const LoginButton = styled(Button)`
  text-transform: none;
  height: 20px;
  border-radius: 2px;
`

const Login = () => {
  const [showLogin, setShowLogin] = useState(true)

  const [msg, setMsg] = useState('')

  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState('error')

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

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

  useEffect(() => {
    addSignupRules(ValidatorForm, signupData)
  }, [signupData.password])

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

    delete loginData.passwordConfirm
    delete loginData.showPassword
    // console.log(loginData)
    axiosInstance.post('/login', loginData).then(
      (response) => {
        // console.log(response)
        setUser({
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          roleId: response.data.roleId
        })
        secureLocalStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`)
        secureLocalStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`)
        navigate('/')
      },
      (error) => {
        setMsg(error.errors)
        handleClick()
        console.log(error.errors)
      }
    )
  }

  const handleSignup = (e) => {
    e.preventDefault()

    delete signupData.passwordConfirm
    delete signupData.showPassword
    console.log(signupData)
    axiosInstance.post('/signup', signupData).then(
      (response) => {
        console.log(response.data)
        toggleSignup()
      },
      (error) => {
        setMsg(error.errors)
        handleClick()
        console.log(error.errors)
      }
    )
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

  const Alert = React.forwardRef(function Alert (props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  const paperStyle = {
    padding: 20,
    margin: '15vh auto',
    width: 300
  }

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </Stack>
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
                  type='email'
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
                    type={loginData.showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={handleLoginDataChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword('login')}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {loginData.showPassword ? <Visibility /> : <VisibilityOff />}
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
            : <ValidatorForm onSubmit={handleSignup}>
              <TextValidator
                name="name"
                type='text'
                varient="outlined"
                label="Name"
                value={signupData.name}
                validators={['required', 'nameFormat']}
                errorMessages={['this field is required', 'Min Length of name must be 3']}
                style={{ marginTop: '20px' }}
                onChange={handleSignupDataChange}
                required
                fullWidth
              />

              <TextValidator
                name="email"
                type='email'
                varient="outlined"
                label="Email"
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                value={signupData.email}
                style={{ marginTop: '10px' }}
                onChange={handleSignupDataChange}
                fullWidth
                required
              />

              <TextValidator
                name="password"
                style={{ marginTop: '10px' }}
                varient="outlined"
                type={signupData.showPassword ? 'text' : 'password'}
                label="Password"
                validators={['required', 'passwordStrength']}
                errorMessages={['this field is required', 'password must contain atleast one lowercase letter,uppercase letter,special character,digit[0-9] and min length should be 8']}
                value={signupData.password}
                onChange={handleSignupDataChange}
                fullWidth
                required
              />
              <TextValidator
                name="passwordConfirm"
                style={{ marginTop: '10px' }}
                varient="outlined"
                type={signupData.showPassword ? 'text' : 'password'}
                label="Confirm Password"
                value={signupData.passwordConfirm || ''}
                validators={['passwordMatch', 'required']}
                errorMessages={['password Mismatch', 'this field is required']}
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

            </ValidatorForm>}
        </Paper>
      </Grid>
    </>
  )
}

export default Login
