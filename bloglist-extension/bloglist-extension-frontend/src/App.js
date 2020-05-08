import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Create from './components/Create'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import storage from './utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import {initializeBlogs, adding, liking} from './reducers/blogReducer'

const App = () => {

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('new')
  const [password, setPassword] = useState('new')
  const [notification, setNotification] = useState(null)
  const blogFormRef = React.createRef()

  const blogs = useSelector(state => state.blogs)
  
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(initializeBlogs())
    }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({
      message, type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    console.log('blog', blog)
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(adding(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const likedBlog = blogs.find(b => b.id === id)
    dispatch(liking(likedBlog))
    notifyWith(`Liked '${likedBlog.title}'!`)
  }

  const handleRemove = async (id) => {
    console.log('handleremove')
    // const blogToRemove = blogs.find(b => b.id === id)
    // const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    // if (ok) {
    //   await blogService.remove(id)
    //   notifyWith(`a blog '${blogToRemove.title}' by ${blogToRemove.author} was removed!`)
    //   setBlogs(blogs.filter(b => b.id !== id))
    // }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <Create createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      )}
    </div>
  )
}


export default App
