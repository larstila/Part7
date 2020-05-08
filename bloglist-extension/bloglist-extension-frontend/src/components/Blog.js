import React, { useState } from 'react'
import './components.css'

// const Info = (blog, handleLike, handleRemove) => {

// }

const Blog = ({ user, blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [infoVisible, setInfoVisible] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p onClick={() => setInfoVisible(true)}>
          {blog.title} - {blog.author}
          <button id="show-info-button" onClick={() => setInfoVisible(true)}>
            show info
          </button>
        </p>
      </div>
      <div id='info-visible' style={showWhenVisible} className="visibleInfo">
        <ul key={blog.title}>
          <li id="title" onClick={() => setInfoVisible(false)}>
            {blog.title}
            <button onClick={() => setInfoVisible(false)}>hide info</button>
          </li>
          <li id="author">{blog.author}</li>
          <li id="url">{blog.url}</li>
          <li id="likes">
            Likes: {blog.likes}{' '}
            <button id="like-button" onClick={() => handleLike(blog)}>
              like
            </button>
          </li>
        </ul>
        {blog.user.username === user.username ? (
          <button id='remove-button' onClick={() => handleRemove(blog)}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
