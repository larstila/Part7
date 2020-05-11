import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import { getUser, login, logout } from './reducers/userReducer'
import LoginPage from './components/Login/LoginPage'
import Notification from './components/Notification'
import Users from './components/Users'

import {
  Switch, Route, useRouteMatch, useHistory, Redirect
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <div>
      <h1> Blogs</h1>

      {user ?
        <><Menu />
          <Notification />
          <Switch>
            <Route path='/users'>
              <Users />
            </Route>
          </Switch>
          <Route path='/blogs'>
              <Header />
              <BlogList user={user} />
            </Route></>
        : <LoginPage />
      }</div>
  )
}


export default App
