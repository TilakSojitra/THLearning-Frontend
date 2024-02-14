/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Box, Divider, Tooltip, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import Comments from '../Comments/Comments'
import { axiosInstance } from '../../../services/api'
import { hasAccessForPost, addPostRules } from '../../../utils/common-util'
import { UserContext } from '../../../context/DataProvider'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const PostDetails = () => {
  const location = useLocation()

  const [postAuthor, setPostAuthor] = useState({})
  const [post, setPost] = useState(location.state)
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [todo, setTodo] = useState('')

  const [loading, setLoading] = useState(true)

  const [updatedPost, setUpdatedPost] = useState({
    title: post.title,
    desc: post.desc
  })

  const { user } = useContext(UserContext)

  const fetchPostAuthor = () => {
    axiosInstance.get(`/users/${post.authorId}`).then(
      (res) => {
        setPostAuthor(res.data)
        setLoading(false)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  useEffect(() => {
    addPostRules(ValidatorForm, updatedPost)
    fetchPostAuthor()
  }, [])

  const handleClickOpen = (event) => {
    setTodo(event)
    setOpen(true)
  }

  const handleFormClose = () => {
    setUpdatedPost(post)
    setOpen(false)
  }

  const handleChange = (e) => {
    setUpdatedPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const deletePost = () => {
    axiosInstance.delete(`/posts/${post.id}`).then(
      (res) => {
        // console.log(res)
        navigate('/')
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const editPost = () => {
    if (updatedPost.title === post.title && updatedPost.desc === post.desc) {
      setOpen(false)
      return
    }
    axiosInstance.patch(`/posts/${post.id}`, { title: updatedPost.title, desc: updatedPost.desc }).then(
      (res) => {
        // console.log(res)
        setOpen(false)
        setPost(res.data)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  return (
    <>
      {!loading
        ? <>
          <Header />
          <Dialog
            open={open}
            onClose={handleFormClose}
          >
            <DialogTitle>{todo} Post</DialogTitle>
            <DialogContent>
              {todo === 'Delete' && <DialogContentText>
                Are you sure you want to delete this post
              </DialogContentText>}
              {todo === 'Edit' &&
                <>
                  <ValidatorForm id="editForm" style={{ width: '30vw' }}>
                    <TextValidator
                      autoFocus
                      required
                      margin="dense"
                      id="mid"
                      name="title"
                      label="Title"
                      value={updatedPost.title}
                      onChange={handleChange}
                      validators={['required', 'titleFormat']}
                      errorMessages={['this field is required', 'Title length must be between 3 to 20']}
                      fullWidth
                      variant="standard"
                    />
                    <TextValidator
                      autoFocus
                      required
                      margin="dense"
                      name="desc"
                      label="Description"
                      value={updatedPost.desc}
                      onChange={handleChange}
                      validators={['required', 'descFormat']}
                      errorMessages={['this field is required', 'Min length of description must be 10']}
                      fullWidth
                      variant="standard"
                    />
                  </ValidatorForm>
                </>
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFormClose}>Cancel</Button>
              {todo === 'Edit'
                ? <Button type='submit' form="editForm" onClick={editPost}>Edit</Button>
                : <Button type='submit' form="editForm" onClick={deletePost}>Delete</Button>}
            </DialogActions>
          </Dialog>
          <Box sx={{ mt: 2, textAlign: 'center' }} >
            <Typography sx={{ mt: 2, mb: 2, lineHeight: 1.82, backgroundColor: '#e7f3ff', height: '10vh' }} style={{ wordWrap: 'break-word' }} variant="h4" color="initial">
              {post.title}
            </Typography>

            <Typography variant='caption' sx={{ ml: 3, fontSize: '110%' }} gutterBottom>
              Description:-
            </Typography>
            <Typography style={{ wordWrap: 'break-word' }} variant='overline' sx={{ ml: 1, fontSize: '110%' }}>
              {post.desc}
            </Typography>
            <br />
            <Typography variant='overline' color='text.secondary' sx={{ ml: 3, fontSize: '70%' }} gutterBottom>
              Created At:- {new Date(post.createdAt).toLocaleString()}
            </Typography>
            <br />
            {post.updatedAt !== null && <Typography variant='overline' color='text.secondary' sx={{ ml: 3, fontSize: '70%' }} gutterBottom>
              Updated At:- {new Date(post.updatedAt).toLocaleString()}
            </Typography>}
            <br />
            {hasAccessForPost(post, postAuthor, user) && <><Grid container flexDirection='row' alignItems='center' justifyContent='center' sx={{ mt: 0.5, mb: 1, ml: 3 }} columnGap={8}>
              <Grid item>
                <Tooltip title="click to edit the post">
                  <Button size="medium" onClick={() => handleClickOpen('Edit')} variant='outlined'>Edit Post</Button>

                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="click to delete the post">
                  <Button size="medium" onClick={() => handleClickOpen('Delete')} variant='outlined'>Delete Post</Button>

                </Tooltip>
              </Grid>
            </Grid>
            </>}

          </Box>
          <Divider sx={{ mb: 5 }} />
          <Comments post={post} /></>
        : <h1>Loading</h1>}
    </>
  )
}

export default PostDetails
