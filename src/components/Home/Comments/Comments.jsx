/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../services/api'
import { Typography, TextField, Box, Button, Paper, Grid } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Comment from './Comment'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { addCommentRules } from '../../../utils/common-util'

const Comments = ({ post }) => {
  const [comments, setComments] = useState([])
  const [isUpdated, setIsUpdated] = useState(false)
  const [comment, setComment] = useState('')
  const [postAuthor, setPostAuthor] = useState()

  const fetchComments = () => {
    axiosInstance.get(`/comments/${post.id}`).then(
      (res) => {
        setComments(res.data)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const fetchPostAuthor = () => {
    axiosInstance.get(`/users/${post.authorId}`).then(
      (res) => {
        // console.log(res.data)
        setPostAuthor(res.data)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  useEffect(() => {
    addCommentRules(ValidatorForm, comment)
    fetchPostAuthor()
  }, [])

  useEffect(() => {
    fetchComments()
  }, [isUpdated])

  const addComment = () => {
    // console.log(comment)
    axiosInstance.post(`/comments/${post.id}`, { comment }).then(
      (res) => {
        setComment('')
        fetchComments()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  return (
    <>
      <Typography variant="button" color="initial" sx={{ ml: 5, fontSize: '110%' }}>Comments</Typography>
      <br />
      <Box sx={{ mt: '5vh', ml: '5vw', display: 'flex' }}>
        <AddCircleIcon sx={{ pt: '0.5%', fontSize: '200%' }} />
        <ValidatorForm style={{ display: 'flex', marginLeft: '2vw' }} sx={{ ml: '20%' }}>
          <TextValidator
            style={{ ml: '1%', width: '70vw' }}
            id="comment"
            label="Add a Comment"
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            validators={['required', 'commentFormat']}
            errorMessages={['this field is required', 'Min length of comment must be 2']}
            fullWidth
            required
          />
          <Button sx={{ ml: '1%', mt: '0.5%', height: '6vh', width: '8vw' }} onClick={addComment} type='submit' variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </ValidatorForm>
      </Box>
        {comments && comments.length > 0
          ? <>
            {
              <Paper sx={{ m: '3%', p: '0% 3%' }} elevation={7}>
                {
                  comments.map((comment, index) => (
                    <Comment key={comment.id} comment={comment} post={post} postAuthor={postAuthor} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
                  ))
                }
              </Paper>
            }
          </>
          : <Typography sx={{ textAlign: 'left', ml: '9%', mt: '2%', height: '10vh' }} color="text.secondary" variant="h6">
            There are no comments available for this post
          </Typography>}
    </>
  )
}

export default Comments
