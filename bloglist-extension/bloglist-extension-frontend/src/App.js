import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import {getUser, login, logout} from './reducers/userReducer'
import LoginPage from './components/LoginPage'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser)
  }, [dispatch])

  const user = useSelector(state => state.user)


  const handleLogout = () => {
    dispatch(logout())
  }

  if ( !user ) {
    return (
        <LoginPage />
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
