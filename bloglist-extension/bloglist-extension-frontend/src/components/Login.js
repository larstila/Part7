import React, { useState } from 'react'
import './components.css'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Login = ({ setUser,  notification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')

      notification('Login was succesfull', false)
      setUser(user)
    } catch (expection) {
      notification('wrong username or password', true)
    }
  }


  return (
    <div>
      <form name="column" onSubmit={handleLogin}>
        <div>
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
        <div>
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

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired,
}

export default Login
