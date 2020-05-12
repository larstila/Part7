import React, { useState } from 'react'
import './../components.css'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'


const Login = () => {
  const [username, setUsername] = useState('new')
  const [password, setPassword] = useState('new')

  const dispatch = useDispatch()

  const handleLogin =  (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('wrong username/password', 'error', 5))
    }
  }
  return (
    <div>
      <form name="column" onSubmit={handleLogin}>
        <div className="username">
          Username:{' '}
          <input
            className="flex"
            type="text"
            id='username'
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="password">
          Password:{' '}
          <input
            className="flex"
            type="password"
            id='password'
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
