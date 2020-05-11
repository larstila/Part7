import React, { useState } from 'react'
import { connect } from 'react-redux'
import './components.css'
import { login, logout } from './../reducers/userReducer'
import { setNotification } from './../reducers/notificationReducer'


const Login = (props) => {
  const [username, setUsername] = useState('new')
  const [password, setPassword] = useState('new')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login(username, password)
      setUsername('')
      setPassword('')
      props.setNotification(`{user.name} welcome back!`, 'success', 5)
    } catch (exception) {
      console.log(exception)
      props.setNotification('wrong username/password', 'error', 5)
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

const mapStateToProps = (state) => {
  return (
      {
          user: state.user,
          notification: state.notification
      }
  )
}

const mapDispatchToProps = {
  setNotification,
  login,
  logout,
}

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)



export default ConnectedLogin
