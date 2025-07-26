/* eslint-disable react/prop-types */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Typography, Grid, Button, Tooltip } from '@mui/material'

const Post = ({ post, isUpdated, setIsUpdated }) => {
  // const [open, setOpen] = React.useState(false)

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  return (
    <>
      <Link to={`/details/${post.id}`} state={post} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* <button onClick={openDetailedView}> */}
        <Tooltip title="click for more details">

          <Card sx={{
            mt: 2,
            pb: 1,
            boxShadow: '1px 1px 3px black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            wordBreak: 'break-word',
            maxHeight: '30vh',
            minHeight: '30vh',
            overflowY: 'auto'
          }}>
            <CardContent sx={{ pt: 5 }}>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography color="text.primary" >
                Description: {post.desc}
              </Typography>
              <Typography color="text.secondary">
                AuthorId: {post.authorId}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                postId: {post.id}
              </Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Link>
      {/* </button> */}
    </>
  )
}

export default Post
