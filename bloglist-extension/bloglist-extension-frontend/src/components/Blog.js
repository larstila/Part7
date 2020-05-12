import React from 'react'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'
import { setNotification } from './../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const user = useSelector(state => state.user)


  if (!blog) {
    return (
      <></>
    )
  }

  const own = blog.user.username === user.username
  console.log('own', own)
  console.log('blog', blog);
  
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
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author}
      </div>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>Added by <b>{blog.user.name}</b></div>
        {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog