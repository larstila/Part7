import React, { useState } from 'react'
import './../components.css'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useField } from './../../utils/useField'

const Login = () => {

  const dispatch = useDispatch()
  const username = useField('username')
  const password = useField('password')

  const handleLogin =  (event) => {
    event.preventDefault()
    try {
      dispatch(login(username.value, password.value))
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
          <input className="flex" {...username}/>
        </div>
        <div className="password">
          Password:{' '}
          <input {...password} />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
