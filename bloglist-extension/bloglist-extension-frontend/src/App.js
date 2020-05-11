import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import { getUser } from './reducers/userReducer'
import LoginPage from './components/Login/LoginPage'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  Switch, Route, useHistory, useRouteMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const matchedUser = match 
  ? users.find(user => user.id === match.params.id)
  : null

  const user = useSelector(state => state.user)

  return (
    <div>
      <h1> Blogs </h1>
      {user ?
        <>
          <Menu />
          <Notification />
          <Header />
          <Switch>
            <Route path='/users/:id'>
              <User user={user}/>
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/blogs'>
              <BlogList />
            </Route>
          </Switch></>
        : <LoginPage />
        
        }</div>
  )
}

export default App
