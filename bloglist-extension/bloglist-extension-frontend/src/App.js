import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {getUser, login, logout} from './reducers/userReducer'

const App = () => {

  const [username, setUsername] = useState('new')
  const [password, setPassword] = useState('new')
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser)
  }, [dispatch])

  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.name} welcome back!`, 'success', 5))
      
    } catch(exception) {
     dispatch(setNotification('wrong username/password', 'error', 5))
    }
  }


  const handleLogout = () => {
    
    dispatch(logout())
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

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


  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

     <BlogList user={user} />
    </div>
  )
}


export default App
