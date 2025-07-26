/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../../../services/api'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Typography, Box, Grid, Tooltip, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material'
import { hasAccessForComment } from '../../../utils/common-util'
import { UserContext } from '../../../context/DataProvider'

const Comment = ({ comment, postAuthor, isUpdated, setIsUpdated }) => {
  const { user } = useContext(UserContext)
  const [commentAuthor, setCommentAuthor] = useState()
  const [updatedComment, setUpdatedComment] = useState(comment.comment)

  const [loading, setLoading] = useState(true)
  const [open, setOpen] = React.useState(false)
  const [todo, setTodo] = useState('')

  const handleClickOpen = (event) => {
    setTodo(event)
    setOpen(true)
  }

  const handleFormClose = () => {
    setUpdatedComment(comment)
    setOpen(false)
  }

  useEffect(() => {
    const fetchAuthor = () => {
      axiosInstance.get(`/users/${comment.authorId}`).then(
        (res) => {
          // console.log(res)
          setCommentAuthor(res.data)
          setLoading(false)
        },
        (err) => {
          console.log(err)
        }
      )
    }
    fetchAuthor()
  }, [])

  const deleteComment = () => {
    handleFormClose()
    axiosInstance.delete(`/comments/${comment.id}`).then(
      (res) => {
        console.log(res)
        setIsUpdated(!isUpdated)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const editComment = () => {
    handleFormClose()
    axiosInstance.patch(`/comments/${comment.id}`, { comment: updatedComment }).then(
      (res) => {
        // console.log(res)
        setUpdatedComment(res.data.comment)
        setIsUpdated(!isUpdated)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleFormClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault()
            editComment()
          }
        }}
      >
        <DialogTitle>{todo} Comment</DialogTitle>
        <DialogContent>
          {todo === 'Delete' && <DialogContentText>
            Are you sure you want to delete this comment
          </DialogContentText>}
          {todo === 'Edit' &&
            <>
              <TextField
                autoFocus
                required
                margin="dense"
                id="mid"
                name="updatedComment"
                label="Comment"
                value={updatedComment}
                onChange={(e) => { setUpdatedComment(e.target.value) }}
                fullWidth
                variant="standard"
              />
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          {todo === 'Edit'
            ? <Button type="submit">Edit</Button>
            : <Button onClick={deleteComment}>Delete</Button>}
        </DialogActions>
      </Dialog>
      <Grid container wrap="nowrap" spacing={2} sx={{ mt: 2 }}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left', fontSize: '140%' }}>{commentAuthor && commentAuthor.name}</h4>
          <p style={{ textAlign: 'left', fontSize: '100%', wordWrap: 'break-word' }}>
            {comment.comment}
          </p>
          {comment.updatedAt === null && <p style={{ textAlign: 'left', color: 'gray' }}>
            posted at {new Date(comment.createdAt).toLocaleString()}.
          </p>}
          {comment.updatedAt !== null && <p style={{ textAlign: 'left', color: 'gray' }}>
            edited at {new Date(comment.updatedAt).toLocaleString()}
          </p>}
        </Grid>
        {!loading && hasAccessForComment(commentAuthor, postAuthor, user) && <Grid item justifyContent='right'>
          <Tooltip title="Edit Comment">
            <EditIcon onClick={() => handleClickOpen('Edit')} style={{ cursor: 'pointer' }} />
          </Tooltip>
          {'       '}
          <Tooltip title="Delete Comment">
            <DeleteIcon onClick={() => handleClickOpen('Delete')} style={{ cursor: 'pointer' }} />
          </Tooltip>
        </Grid>}
      </Grid>
      <Divider />
      {/* <Box sx={{ mt: '5%', ml: '5%' }}>

        EditIcon
        <Typography variant="body1" color="initial">{comment.comment}</Typography>
      </Box> */}
    </>
  )
}

export default Comment
