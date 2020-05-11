import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import { getUser } from './reducers/userReducer'
import LoginPage from './components/Login/LoginPage'
import Notification from './components/Notification'
import Users from './components/Users'

import {
  Switch, Route, useHistory, 
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  //const history = useHistory()

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
          <Header />
          <Switch>
            <Route path='/users'>
              <Users />
            </Route>
          </Switch>
          <Route path='/blogs '>
              <BlogList />
            </Route></>
        : <LoginPage />
      }</div>
  )
}

export default App
