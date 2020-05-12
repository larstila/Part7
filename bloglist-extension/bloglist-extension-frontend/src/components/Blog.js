import React from 'react'
import { likeBlog, deleteBlog, addComment } from './../reducers/blogReducer'
import { setNotification } from './../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from './../utils/useField'

const Blog = ({ blog }) => {

  const comment = useField('comment')

  const history = useHistory()
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
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
  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(comment.value, blog.id))
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
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
        <div>
          Add comment: 
          <input {...comment} />
          <button id="comment-button">comment</button>
        </div>
      </form>
        {blog.comments.map((comment, i) =>
          <li key={i}>{comment}</li>
        )}
      </div>
    </div>
  )
}

export default Blog