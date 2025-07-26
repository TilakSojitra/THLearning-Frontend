/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { axiosInstance } from '../../services/api'

const User = ({ user, isUpdated, setIsUpdated, isManagerSpecific }) => {
  const Admin = parseInt(process.env.REACT_APP_ADMIN)
  const Manager = parseInt(process.env.REACT_APP_MANAGER)
  const normalUser = parseInt(process.env.REACT_APP_USER)

  const [role, setRole] = useState(user.roleId)
  const [userId, setUserId] = useState()
  const [open, setOpen] = React.useState(false)

  const [todo, setTodo] = useState('Assign Manager')

  const events = new Map()
  // console.log(events.get('Assign Manager')[1])
  const handleFormClickOpen = (whatTodo, userId) => {
    setTodo(whatTodo)
    setUserId(userId)
    setOpen(true)
  }

  const handleFormClose = () => {
    setOpen(false)
  }

  const assignAdmin = () => {
    handleFormClose()
    // console.log('assignAdmin', userId)
    axiosInstance.patch(`/admin/create/${userId}`, { roleId: Admin }).then(
      (res) => {
        console.log(res)
        setIsUpdated(!isUpdated)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const removeAdmin = () => {
    handleFormClose()
    // console.log('removeAdmin', userId)
    axiosInstance.patch(`/admin/remove/${userId}`, { roleId: Admin }).then(
      (res) => {
        console.log(res)
        setIsUpdated(!isUpdated)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const assignManager = (managerId) => {
    handleFormClose()
    console.log('assignManager', managerId)
    axiosInstance.patch(`/admin/create/${userId}`, { roleId: Manager, managerId: parseInt(managerId) }).then(
      (res) => {
        console.log(res)
        setIsUpdated(!isUpdated)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const removeManager = () => {
    handleFormClose()
    console.log('removeManager', userId)
    axiosInstance.patch(`/admin/remove/${userId}`, { roleId: Manager }).then(
      (res) => {
        console.log(res)
        setIsUpdated(!isUpdated)
      },
      (error) => {
        console.log(error)
      }
    )
    // console.log('removeManager', userId)
  }

  const removeMember = () => {
    handleFormClose()
    axiosInstance.patch(`/members/${userId}`).then(
      (res) => {
        // console.log(res.data)
        setIsUpdated(!isUpdated)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  events.set('Assign Manager', ['Enter the manager id of this user', true])
  events.set('Remove Manager', ['Are you sure you want to remove the manager if this user', false, removeManager])
  events.set('Assign Admin', ['Are you sure you want to assign this user as admin', false, assignAdmin])
  events.set('Remove Admin', ['Are you sure you want to remove this user from admin', false, removeAdmin])
  events.set('Remove Member', ['Are you sure you want to remove this user from member', false, removeMember])

  const adminButtonName = (role === normalUser || role === Manager) ? 'Assign Admin' : 'Remove Admin'
  const managerButtonName = (role === Manager) ? 'Remove Manager' : 'Assign Manager'

  // const adminMethodName = (role === normalUser || role === Manager) ? assignAdmin : removeAdmin
  const managerMethodName = (role === Manager) ? removeManager : assignManager

  return (
    <>
      <Dialog
        open={open}
        onClose={handleFormClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries(formData.entries())
            managerMethodName(formJson.managerId)
          }
        }}
      >
        <DialogTitle>{todo}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {events.get(todo)[0]}
          </DialogContentText>
          {events.get(todo)[1] &&
            <TextField
              autoFocus
              required
              margin="dense"
              id="mid"
              name="managerId"
              label="Manager Id"
              type="number"
              fullWidth
              variant="standard"
            />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          {todo === 'Assign Manager'
            ? <Button type="submit">Assign</Button>
            : <Button onClick={events.get(todo)[2]}>{todo.split(' ')[0]}</Button>}
        </DialogActions>
      </Dialog>
      <Card sx={{
        mt: 2,
        pb: 1,
        boxShadow: '1px 1px 3px black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {user.email}
          </Typography>
          <Typography color="text.secondary">
            Name: {user.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Id: {user.id}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Manager Id: {user.managerId !== null ? user.managerId : 'Not assigned'}
          </Typography>
        </CardContent>
       { !isManagerSpecific
         ? <CardActions>
          <Grid container spacing={2}>
            <Grid item >

              <Button size="small" variant='outlined' onClick={() => handleFormClickOpen(adminButtonName, user.id)} >{adminButtonName}</Button>
            </Grid>
            {user.roleId !== Admin &&
              <Grid item >

                <Button size="small" variant='outlined' onClick={() => handleFormClickOpen(managerButtonName, user.id)}>{managerButtonName}</Button>
              </Grid>}
          </Grid>
        </CardActions>
         : <CardActions>
          <Grid container spacing={2}>
            <Grid item >
              <Button size="small" variant='outlined' onClick={() => handleFormClickOpen('Remove Member', user.id)} >Remove Member</Button>
            </Grid>

          </Grid>
        </CardActions> }
      </Card>
    </>
  )
}

export default User
