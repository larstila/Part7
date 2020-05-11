import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './components.css'
import PropTypes from 'prop-types'
import {getUser, login, logout} from './../reducers/userReducer'
import { setNotification } from './../reducers/notificationReducer'


const Login = ( ) => {
  const [username, setUsername] = useState('new')
  const [password, setPassword] = useState('new')
  const dispatch = useDispatch()
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
