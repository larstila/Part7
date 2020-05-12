import React from 'react'
import Comment from './Comment'
import { likeBlog, deleteBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const Blog = ({ blog }) => {


  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  if (!blog) {
    return (
      <></>
    )
  }

  const own = blog.user.username === user.username

  const handleLike = async () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked '${blog.title}'!`, 'success', 5))
  }

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(setNotification(`a blog '${blog.title}' by ${blog.author} was removed!`, 'success', 5))
      dispatch(deleteBlog(blog))
      history.push('/')
    }
  }


  return (
    <div className='blog'>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{blog.title} by {blog.author}</Card.Title>
          <Card.Text>
          Link:  <a href={blog.url}> {blog.url} </a> <br></br>
          Added by <b>{blog.user.name}</b> <br></br>
          This blog has <b>{blog.likes}</b> likes 
          </Card.Text>
          <Button onClick={() => handleLike(blog.id)} variant="primary">Like</Button>
          {own && <Button onClick={() => handleRemove(blog.id)} variant="secondary">Remove</Button>}
        </Card.Body>
      </Card>
      <Comment blog={blog} />
    </div>
  )
}

export default Blog