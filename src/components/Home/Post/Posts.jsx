/* eslint-disable react/prop-types */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../services/api'
import Header from '../../Header/Header'
import Post from './Post'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { addPostRules } from '../../../utils/common-util'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [isUpdated, setIsUpdated] = useState(false)

  const [postData, setPostData] = useState({
    title: '',
    desc: ''
  })
  const navigate = useNavigate()
  const location = useLocation()
  const userId = location.search?.split('=')[1] || null
  const [isExpanded, setIsExpanded] = useState(false)
  const isUserSpecific = (userId !== null)

  const fetchPosts = () => {
    axiosInstance.get(`/posts?userId=${userId}`).then(
      (res) => {
        // console.log(res)
        setPosts(res.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    addPostRules(ValidatorForm, postData)
  }, [])

  useEffect(() => {
    if (location.pathname === '/posts' && userId === null) {
      navigate('/login')
    }
    fetchPosts()
  }, [isUpdated])

  const handleLogin = (e) => {
    e.preventDefault()
    axiosInstance.post('/posts', postData).then(
      (res) => {
        setIsExpanded(false)
        setPostData({
          title: '',
          desc: ''
        })
        setIsUpdated(!isUpdated)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const handlePostDataChange = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      {
        isUserSpecific && <>
          <Header />
          <Grid alignItems='center' justifyContent='center' container>
            <Grid sx={{ mt: 2 }} item>
              <Accordion expanded={isExpanded}>
                <AccordionSummary
                  onClick={() => setIsExpanded(!isExpanded)}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ fontWeight: 'bold' }}
                >
                  Add a Post
                </AccordionSummary>
                <AccordionDetails>
                  <ValidatorForm style={{ width: '30vw' }} onSubmit={handleLogin}>

                    <TextValidator
                      name="title"
                      varient="outlined"
                      label="Title"
                      value={postData.title}
                      onChange={handlePostDataChange}
                      validators={['required', 'titleFormat']}
                      errorMessages={['this field is required', 'Title length must be between 3 to 20']}
                      fullWidth
                      required
                    />

                    <TextValidator
                      name="desc"
                      varient="outlined"
                      label="Description"
                      value={postData.desc}
                      style={{ marginTop: '20px' }}
                      onChange={handlePostDataChange}
                      validators={['required', 'descFormat']}
                      errorMessages={['this field is required', 'Min length of description must be 10']}
                      fullWidth
                      required
                    />

                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx= {{ mt: '3%' }}
                      >
                        Submit
                      </Button>
                  </ValidatorForm>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </>
      }
      {posts && posts.length > 0
        ? <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center">
          {posts.map((post, index) => (

            <Grid item key={post.id} sm={6} md={4} xs={12} xl={3}>
              <Post post={post} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
              {/* <User user={admin} isUpdated={isUpdated} setIsUpdated={setIsUpdated} /> */}
            </Grid>

          ))}
        </Grid>
        : <Typography sx={{ textAlign: 'left', ml: '4%', mt: '1%', height: '10vh' }} color="text.secondary" variant="h6">
          There are no posts.
        </Typography>}
    </>

  )
}

export default Posts
