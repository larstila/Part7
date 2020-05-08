import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const makeNotification = (message, isError) => {
    setError(isError)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    makeNotification('logged out', false)
  }

  const handleLike = async (blog) => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)))
      makeNotification(`${user.username} liked "${blog.title}"`, false)
    } catch (error) {
      makeNotification('error', true)
    }
  }

  const handleRemove = async (blog) => {
    if (
      window.confirm(
        `Do you really want to delete a blog called ${blog.title} by ${blog.author}`
      )
    ) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        makeNotification(`${user.username} removed "${blog.title}"`, false)
      } catch (error) {
        makeNotification('error', true)
      }
    }
  }

  const handleCreate = async (props) => {
    console.log(props)
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create(props)
      console.log('blog: ', blog)
      makeNotification(
        `a new blog "${blog.title}" was added by ${user.username}`,
        false
      )
      setBlogs(blogs.concat(blog))
    } catch (error) {
      makeNotification('error, check that you have title and url given', true)
    }
  }

  const createFormRef = React.createRef()

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Log in to application</h2>
        <Notification message={message} error={error} />
        <Login setUser={setUser} notification={makeNotification} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} error={error} />

      <div>
        {user.name} logged in
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="Create" ref={createFormRef}>
        <Create handleCreate={handleCreate} />
      </Togglable>

      <div id="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.title} id={blog.title}>
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
